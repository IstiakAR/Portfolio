import { useState, useRef, useEffect } from 'react'
import { profile, skills, projects } from '../../data/portfolio.js'

/* Terminal — fake command prompt (cmd.exe style), fully interactive. */

const HELP = [
  'Available commands:',
  '  help      Show this list',
  '  about     Who am I',
  '  projects  List my projects',
  '  skills    Technical skills',
  '  contact   Contact info',
  '  github    Open my GitHub profile',
  '  whoami    Current user',
  '  date      Current date/time',
  '  echo      Print text',
  '  dir       List "files"',
  '  ver       OS version',
  '  clear     Clear the screen',
]

export default function TerminalApp() {
  const [lines, setLines] = useState(() => [
    'iarOS [Version 1.0.2700]',
    '',
    "Type 'help' to see available commands.",
    '',
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const print = (...out) => setLines((l) => [...l, ...out])

  const run = (raw) => {
    const cmdline = raw.trim()
    print(`C:\\Users\\Portfolio> ${raw}`)
    if (!cmdline) return
    setHistory((h) => [...h, cmdline])
    setHistIdx(-1)
    const [cmd, ...args] = cmdline.split(/\s+/)
    switch (cmd.toLowerCase()) {
      case 'help':
        print(...HELP, '')
        break
      case 'about':
        print(`${profile.name} — ${profile.title}`, profile.location, '')
        break
      case 'projects':
        print('My projects:', '')
        projects.forEach((p, i) => print(`  [${i + 1}] ${p.name} — ${p.subtitle}`))
        print('', "Type 'github' to browse them online.", '')
        break
      case 'skills':
        Object.entries(skills).forEach(([g, list]) => print(`${g}: ${list.join(', ')}`))
        print('')
        break
      case 'contact':
        print(`Email:    ${profile.email}`, `GitHub:   ${profile.githubLabel}`, `LinkedIn: ${profile.linkedinLabel}`, `X:        ${profile.twitterLabel}`, '')
        break
      case 'github':
        print(`Opening ${profile.githubLabel} ...`)
        window.open(profile.github, '_blank', 'noopener')
        print('')
        break
      case 'whoami':
        print('portfolio\\developer', '')
        break
      case 'date':
        print(new Date().toString(), '')
        break
      case 'echo':
        print(args.join(' '), '')
        break
      case 'dir':
        print(
          ' Volume in drive C has no label.',
          ' Directory of C:\\Users\\Portfolio',
          '',
          '10/25/2001  08:00 PM    <DIR>          projects',
          '10/25/2001  08:00 PM    <DIR>          skills',
          '10/25/2001  08:00 PM             1,024 about.txt',
          '10/25/2001  08:00 PM             2,048 contact.txt',
          '               2 File(s)          3,072 bytes',
          '               2 Dir(s)   6,286,496,768 bytes free',
          ''
        )
        break
      case 'ver':
        print('', 'iarOS [Version 1.0.2700]', '')
        break
      case 'clear':
      case 'cls':
        setLines([])
        break
      default:
        print(
          `'${cmd}' is not recognized as an internal or external command,`,
          'operable program or batch file.',
          ''
        )
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < 0) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(idx)
        setInput(history[idx])
      }
    }
  }

  return (
    <div className="xp-app xp-terminal" onClick={() => inputRef.current?.focus()}>
      <div className="xp-terminal-scroll" ref={scrollRef}>
        {lines.map((l, i) => (
          <div key={i} className="xp-terminal-line">
            {l || '\u00A0'}
          </div>
        ))}
        <div className="xp-terminal-line xp-terminal-inputline">
          <span>C:\Users\Portfolio&gt;&nbsp;</span>
          <input
            ref={inputRef}
            className="xp-terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  )
}
