import { useCallback, useEffect, useState } from 'react'
import { useWindowManager } from '../useWindowManager.js'
import { TASKBAR_HEIGHT } from '../constants.js'

/* Minesweeper — faithful XP-style clone, fully playable.
   Classic rules: first click is always safe, left-click reveals,
   right-click (or long-press) flags. */

const DIFFICULTIES = {
  beginner: { label: 'Beginner', rows: 9, cols: 9, mines: 10 },
  intermediate: { label: 'Intermediate', rows: 16, cols: 16, mines: 40 },
  expert: { label: 'Expert', rows: 16, cols: 30, mines: 99 },
}

const STATUS = {
  READY: 'ready',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
}

// Classic XP number colors
const NUM_COLORS = {
  1: '#0000ff',
  2: '#008000',
  3: '#ff0000',
  4: '#000080',
  5: '#800000',
  6: '#008080',
  7: '#000000',
  8: '#808080',
}

const NEIGHBORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

function buildBoard({ rows, cols, mines }, safeR, safeC) {
  const total = rows * cols
  const forbidden = new Set([safeR * cols + safeC])
  for (const [dr, dc] of NEIGHBORS) {
    const r = safeR + dr
    const c = safeC + dc
    if (r >= 0 && r < rows && c >= 0 && c < cols) forbidden.add(r * cols + c)
  }
  const mined = new Set()
  const pool = Array.from({ length: total }, (_, i) => i).filter((i) => !forbidden.has(i))
  while (mined.size < mines && pool.length) {
    const pick = Math.floor(Math.random() * pool.length)
    mined.add(pool[pick])
    pool.splice(pick, 1)
  }
  return Array.from({ length: total }, (_, i) => ({
    mine: mined.has(i),
    count: 0,
    revealed: false,
    flagged: false,
  })).map((cell, i) => {
    if (cell.mine) return cell
    const r = Math.floor(i / cols)
    const c = i % cols
    cell.count = NEIGHBORS.reduce((acc, [dr, dc]) => {
      const nr = r + dr
      const nc = c + dc
      return acc + (nr >= 0 && nr < rows && nc >= 0 && nc < cols && mined.has(nr * cols + nc) ? 1 : 0)
    }, 0)
    return cell
  })
}

function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running) return undefined
    const t = setInterval(() => setSeconds((s) => Math.min(s + 1, 999)), 1000)
    return () => clearInterval(t)
  }, [running])
  const start = useCallback(() => {
    setSeconds(0)
    setRunning(true)
  }, [])
  const stop = useCallback(() => setRunning(false), [])
  const reset = useCallback(() => {
    setRunning(false)
    setSeconds(0)
  }, [])
  return { seconds, start, stop, reset }
}

function Led({ value }) {
  // Three-digit LED readout; negatives shown as -NN like real XP
  const text =
    value < 0
      ? `-${String(Math.min(Math.abs(value), 99)).padStart(2, '0')}`
      : String(Math.min(value, 999)).padStart(3, '0')
  return <span className="xp-ms-led">{text}</span>
}

export default function MinesweeperApp() {
  const [difficulty, setDifficulty] = useState('beginner')
  const config = DIFFICULTIES[difficulty]
  const [board, setBoard] = useState(null) // null until first click
  const [status, setStatus] = useState(STATUS.READY)
  const [flags, setFlags] = useState(0)
  const timer = useTimer()
  const wm = useWindowManager()

  // Resize the (single-instance) window so the board always fits nicely.
  useEffect(() => {
    if (!wm) return
    const win = wm.windows.find((w) => w.appId === 'minesweeper')
    if (!win) return
    const cell = window.matchMedia('(pointer: coarse)').matches ? 28 : 20
    const width = Math.min(config.cols * cell + 64, window.innerWidth - 16)
    const height = Math.min(config.rows * cell + 185, window.innerHeight - TASKBAR_HEIGHT - 16)
    wm.resizeWindow(win.id, width, height)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty])

  const reset = (d) => {
    setDifficulty(d)
    setBoard(null)
    setStatus(STATUS.READY)
    setFlags(0)
    timer.reset()
  }

  const minesLeft = config.mines - flags
  const safeCount = config.rows * config.cols - config.mines

  const revealFlood = (cells, start, rows, cols) => {
    const stack = [start]
    while (stack.length) {
      const i = stack.pop()
      const cell = cells[i]
      if (!cell || cell.revealed || cell.flagged) continue
      cell.revealed = true
      if (cell.count === 0 && !cell.mine) {
        const r = Math.floor(i / cols)
        const c = i % cols
        for (const [dr, dc] of NEIGHBORS) {
          const nr = r + dr
          const nc = c + dc
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            const j = nr * cols + nc
            if (!cells[j].revealed && !cells[j].flagged) stack.push(j)
          }
        }
      }
    }
  }

  const clickCell = (r, c) => {
    if (status === STATUS.WON || status === STATUS.LOST) return
    let cells = board
    if (!cells) {
      // First click: build a guaranteed-safe opening around (r, c)
      cells = buildBoard(config, r, c)
      setStatus(STATUS.PLAYING)
      timer.start()
    }
    const i = r * config.cols + c
    const cell = cells[i]
    if (cell.flagged || cell.revealed) return

    const next = cells.map((x) => ({ ...x }))
    if (next[i].mine) {
      // Boom: reveal every mine, mark the struck one red
      next.forEach((x) => {
        if (x.mine) x.revealed = true
      })
      next[i].struck = true
      setBoard(next)
      setStatus(STATUS.LOST)
      timer.stop()
      return
    }
    revealFlood(next, i, config.rows, config.cols)
    setBoard(next)
    if (next.filter((x) => x.revealed).length === safeCount) {
      setStatus(STATUS.WON)
      timer.stop()
    }
  }

  const toggleFlag = (r, c) => {
    if (status === STATUS.WON || status === STATUS.LOST) return
    if (!board) return
    const i = r * config.cols + c
    const cell = board[i]
    if (cell.revealed) return
    const next = board.map((x, j) => (j === i ? { ...x, flagged: !x.flagged } : x))
    setBoard(next)
    setFlags((f) => f + (next[i].flagged ? 1 : -1))
  }

  const face = status === STATUS.LOST ? '😵' : status === STATUS.WON ? '😎' : '🙂'

  const faceClick = () => reset(difficulty)

  const changeDifficulty = (e) => {
    reset(e.target.value)
  }

  // Long-press on touch devices fires contextmenu, which flags — no extra
  // pointer bookkeeping needed.

  return (
    <div className="xp-app xp-ms">
      <div className="xp-ms-menubar">
        <select
          className="xp-ms-select"
          value={difficulty}
          onChange={changeDifficulty}
          aria-label="Difficulty"
        >
          {Object.entries(DIFFICULTIES).map(([id, d]) => (
            <option key={id} value={id}>
              {d.label}
            </option>
          ))}
        </select>
        <button type="button" className="xp-ms-new" onClick={faceClick}>
          New Game
        </button>
      </div>
      <div className="xp-ms-board-wrap">
        <div className="xp-ms-panel">
          <div className="xp-ms-hud">
            <Led value={minesLeft} />
            <button type="button" className="xp-ms-face" onClick={faceClick} aria-label="New game">
              {face}
            </button>
            <Led value={timer.seconds} />
          </div>
          <div
            className={`xp-ms-grid cols-${config.cols}`}
            onContextMenu={(e) => e.preventDefault()}
            role="grid"
            aria-label="Minesweeper board"
          >
            {Array.from({ length: config.rows * config.cols }, (_, i) => {
              const r = Math.floor(i / config.cols)
              const c = i % config.cols
              const cell = board ? board[i] : null
              return (
                <Cell
                  key={i}
                  r={r}
                  c={c}
                  cell={cell}
                  gameLive={status !== STATUS.WON && status !== STATUS.LOST}
                  onClick={clickCell}
                  onFlag={toggleFlag}
                />
              )
            })}
          </div>
        </div>
        {status === STATUS.WON && (
          <div className="xp-ms-message">🎉 Cleared! All {config.mines} mines found.</div>
        )}
        {status === STATUS.LOST && <div className="xp-ms-message">💥 Boom! Click the face to retry.</div>}
      </div>
      <div className="xp-statusbar">
        {config.label} — {config.rows}×{config.cols}, {config.mines} mines · Right-click to flag
      </div>
    </div>
  )
}

function Cell({ r, c, cell, gameLive, onClick, onFlag }) {
  const revealed = cell?.revealed
  const flagged = cell?.flagged
  const isMine = cell?.mine
  const struck = cell?.struck
  const count = cell?.count ?? 0

  const handleClick = () => onClick(r, c)
  const handleContext = (e) => {
    e.preventDefault()
    if (gameLive) onFlag(r, c)
  }

  const classes = ['xp-ms-cell']
  if (!revealed) classes.push('covered')
  if (revealed && isMine && struck) classes.push('struck')
  if (revealed && count > 0) classes.push(`n${count}`)

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={handleClick}
      onContextMenu={handleContext}
      aria-label={
        revealed
          ? isMine
            ? 'Mine'
            : count > 0
              ? `${count} mines nearby`
              : 'Empty'
          : flagged
            ? 'Flagged'
            : 'Hidden cell'
      }
    >
      {revealed ? (
        isMine ? (
          '💣'
        ) : count > 0 ? (
          <span style={{ color: NUM_COLORS[count] }}>{count}</span>
        ) : (
          ''
        )
      ) : flagged ? (
        '🚩'
      ) : (
        ''
      )}
    </button>
  )
}

