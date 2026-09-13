import { icons } from './icons.js'
import AboutApp from './apps/AboutApp.jsx'
import ProjectsApp from './apps/ProjectsApp.jsx'
import ResumeApp from './apps/ResumeApp.jsx'
import SkillsApp from './apps/SkillsApp.jsx'
import ContactApp from './apps/ContactApp.jsx'
import TerminalApp from './apps/TerminalApp.jsx'
import RecycleBinApp from './apps/RecycleBinApp.jsx'

/* Application registry — the single source of truth for the desktop.
   Add an entry here and it appears on the desktop / Start menu / taskbar. */

export const APPS = [
  {
    id: 'about',
    title: 'My Computer',
    icon: icons.myComputer,
    component: AboutApp,
    onDesktop: true,
    inStartMenu: true,
    singleInstance: true,
    defaultWidth: 640,
    defaultHeight: 460,
    defaultX: 90,
    defaultY: 40,
  },
  {
    id: 'projects',
    title: 'My Projects',
    icon: icons.folder,
    component: ProjectsApp,
    onDesktop: true,
    inStartMenu: true,
    singleInstance: true,
    defaultWidth: 660,
    defaultHeight: 470,
    defaultX: 140,
    defaultY: 70,
  },
  {
    id: 'resume',
    title: 'Resume.txt',
    icon: icons.resume,
    component: ResumeApp,
    onDesktop: true,
    inStartMenu: true,
    singleInstance: true,
    defaultWidth: 560,
    defaultHeight: 520,
    defaultX: 190,
    defaultY: 100,
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: icons.exe,
    component: SkillsApp,
    onDesktop: true,
    inStartMenu: true,
    singleInstance: true,
    defaultWidth: 560,
    defaultHeight: 480,
    defaultX: 240,
    defaultY: 130,
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: icons.network,
    component: ContactApp,
    onDesktop: true,
    inStartMenu: true,
    singleInstance: true,
    defaultWidth: 480,
    defaultHeight: 420,
    defaultX: 290,
    defaultY: 160,
  },
  {
    id: 'terminal',
    title: 'Command Prompt',
    icon: icons.cmd,
    component: TerminalApp,
    onDesktop: true,
    inStartMenu: true,
    singleInstance: false,
    defaultWidth: 600,
    defaultHeight: 400,
    defaultX: 340,
    defaultY: 190,
  },
  {
    id: 'recycle-bin',
    title: 'Recycle Bin',
    icon: icons.recycleBin,
    component: RecycleBinApp,
    onDesktop: true,
    inStartMenu: false,
    singleInstance: true,
    defaultWidth: 520,
    defaultHeight: 400,
    defaultX: 260,
    defaultY: 120,
  },
]

export function openAppByName(wm, name) {
  const app = APPS.find(
    (a) => a.id === name || a.title.toLowerCase() === name.toLowerCase()
  )
  if (app) wm.openWindow(app)
  return app
}
