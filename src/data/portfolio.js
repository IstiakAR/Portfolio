/*
  ============================================================
   PORTFOLIO CONTENT — edit everything in this file only.
  ============================================================
*/

export const profile = {
  name: 'Istiak Ahammed Rhyme',
  handle: 'IstiakAR',
  title: 'CSE Student · Developer',
  location: 'Dhaka, Bangladesh',
  email: 'istiakrhyme840@gmail.com',
  github: 'https://github.com/IstiakAR',
  githubLabel: 'github.com/IstiakAR',
  linkedin: 'https://www.linkedin.com/in/istiak-ahammed-rhyme-411885225/',
  linkedinLabel: 'LinkedIn Profile',
  facebook: 'https://www.facebook.com/istiak.ahammed.3572',
  facebookLabel: 'Facebook',
  discord: 'https://discord.com/users/719816521265971220',
  discordLabel: 'Discord',
  twitter: 'https://x.com/Rhytiak',
  twitterLabel: '@Rhytiak',
  reddit: 'https://reddit.com/user/Silent_Istiak',
  redditLabel: 'u/Silent_Istiak',
  steam: 'https://steamcommunity.com/profiles/76561199093612213',
  steamLabel: 'Steam',
  availability: 'CSE undergrad at University of Dhaka — open to collaborations & internships',
}

export const about = {
  intro:
    "Hi, I'm Istiak Ahammed Rhyme, currently taking CSE at University of Dhaka. I enjoy tinkering with Linux, building desktop tools, and shipping web apps — from React frontends to Rust/Tauri utilities and ESP32 hardware projects.",
  facts: [
    { label: 'Name', value: 'Istiak Ahammed Rhyme' },
    { label: 'Studying', value: 'B.Sc. in Computer Science & Engineering' },
    { label: 'University', value: 'University of Dhaka' },
    { label: 'Location', value: 'Dhaka, Bangladesh' },
    { label: 'Daily drivers', value: 'Arch Linux + Hyprland, Windows 11' },
  ],
  education: [
    {
      school: 'University of Dhaka',
      degree: 'B.Sc. (Hons) in Computer Science & Engineering',
      period: 'Ongoing',
    },
  ],
  interests: [
    'Linux ricing — Hyprland, KDE, custom dotfiles',
    'Open source & developer tooling',
    'Embedded / IoT projects (ESP32)',
    'Game development (Godot)',
    'CTFs & security tooling',
  ],
  currentFocus: [
    'Rust & Tauri desktop apps',
    'TypeScript / React ecosystem',
    'Flutter mobile development',
  ],
}

export const skills = {
  'Operating Systems': ['Arch Linux', 'Hyprland', 'KDE', 'Windows 11'],
  Programming: ['C', 'C++', 'Java', 'Python', 'Rust', 'JavaScript'],
  'Web Development': ['React', 'Next.js', 'TailwindCSS', 'HTML/CSS', 'Express.js'],
  Frameworks: ['Tauri', 'Flutter', 'FastAPI', 'Godot'],
  Databases: ['PostgreSQL', 'SQLite', 'Supabase'],
  Tools: ['Git', 'Figma', 'Netlify', 'Vercel', 'Neovim', 'Docker basics'],
}

export const projects = [
  {
    id: 'furniture-mart',
    name: 'Furniture Mart',
    subtitle: 'E-commerce web app',
    description:
      'Full-stack furniture store with client, server and shared packages. Deployed on Vercel.',
    technologies: ['TypeScript', 'React', 'Node.js', 'Vercel'],
    github: 'https://github.com/IstiakAR/Furniture-Mart',
    demo: 'https://hfm-iar.vercel.app/',
  },
  {
    id: 'eduai',
    name: 'EduAI',
    subtitle: 'AI-powered learning platform',
    description:
      'Learning platform with authentication and a Supabase backend. Includes landing page, auth modal and React hooks-based auth flow.',
    technologies: ['React', 'JavaScript', 'Supabase', 'Vercel'],
    github: 'https://github.com/IstiakAR/EduAI',
    demo: 'https://edu-ai-lilac.vercel.app/',
  },
  {
    id: 'wifi-manager',
    name: 'WiFi Manager',
    subtitle: 'Desktop WiFi manager for Linux',
    description:
      'Tauri-based desktop app wrapping nmcli. Ships as .deb, .rpm, Arch package and AppImage.',
    technologies: ['Rust', 'Tauri', 'JavaScript', 'GTK'],
    github: 'https://github.com/IstiakAR/wifi',
    demo: '',
  },
  {
    id: 'victus-control',
    name: 'Victus Control',
    subtitle: 'Fan control & RGB for HP Victus on Linux',
    description:
      'Fork of victus-control adapted for HP Victus 15-fb1xxx: Better Auto fan curves, manual RPM control, GTK4 app and GNOME Shell extension.',
    technologies: ['C++', 'Linux', 'GTK4', 'GNOME'],
    github: 'https://github.com/IstiakAR/victus-control-15-fb1xxx',
    demo: '',
  },
  {
    id: 'du-shop',
    name: 'DU Shop',
    subtitle: 'Campus marketplace',
    description:
      'Buy-and-sell web app built for campus use. Deployed on Netlify and Vercel.',
    technologies: ['React', 'JavaScript', 'Netlify', 'Vercel'],
    github: 'https://github.com/IstiakAR/DU-Shop',
    demo: '',
  },
  {
    id: 'social-media',
    name: 'Social Media App',
    subtitle: 'JavaFX desktop social network',
    description:
      'Desktop social-media client in Java/JavaFX backed by a local SQLite database.',
    technologies: ['Java', 'JavaFX', 'SQLite'],
    github: 'https://github.com/IstiakAR/Social-Media',
    demo: '',
  },
  {
    id: 'spirometer',
    name: 'Spirometer',
    subtitle: 'ESP32 + Kotlin health device',
    description:
      'DIY spirometer: ESP32 firmware (C++) paired with an Android app written in Kotlin.',
    technologies: ['C++', 'ESP32', 'Kotlin', 'Android'],
    github: 'https://github.com/IstiakAR/Spirometer-ESP32',
    demo: '',
  },
  {
    id: 'among-us',
    name: 'Among Us (Godot)',
    subtitle: 'Multiplayer game clone',
    description:
      'Among Us-style multiplayer game made in Godot with GDScript, including networking.',
    technologies: ['GDScript', 'Godot', 'Multiplayer'],
    github: 'https://github.com/IstiakAR/Among-Us',
    demo: '',
  },
  {
    id: 'dotfiles',
    name: 'Dotfiles',
    subtitle: 'Linux desktop configuration',
    description:
      'Public Linux dotfiles and desktop tooling — Hyprland, KDE and custom shell setup.',
    technologies: ['Lua', 'Linux', 'Hyprland', 'Shell'],
    github: 'https://github.com/IstiakAR/dotfiles',
    demo: '',
  },
  {
    id: 'hellpaper',
    name: 'Hellpaper',
    subtitle: 'Wallpaper picker for Linux',
    description:
      'TUI wallpaper picker for Linux — browse, set and switch wallpapers from the terminal.',
    technologies: ['C++', 'Linux', 'TUI'],
    github: 'https://github.com/IstiakAR/hellpaper',
    demo: '',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    subtitle: 'Restaurant landing page',
    description:
      'Responsive restaurant website with menu, gallery and reservation sections.',
    technologies: ['JavaScript', 'HTML/CSS'],
    github: 'https://github.com/IstiakAR/Restaurant',
    demo: 'https://istiakar.github.io/Restaurant/',
  },
  {
    id: 'pacman',
    name: 'Pacman',
    subtitle: 'Pac-Man clone in C++',
    description:
      'Classic Pac-Man game implemented from scratch in C++.',
    technologies: ['C++', 'Game Dev'],
    github: 'https://github.com/IstiakAR/Pacman',
    demo: '',
  },
  {
    id: 'automation',
    name: 'Automation',
    subtitle: 'Desktop automation scripts',
    description:
      'Collection of Node.js scripts for automating repetitive desktop tasks.',
    technologies: ['JavaScript', 'Node.js'],
    github: 'https://github.com/IstiakAR/Automation',
    demo: '',
  },
  {
    id: 'drugscript',
    name: 'DrugScript',
    subtitle: 'Drug interaction checker',
    description:
      'Dart/Flutter app for looking up drug information and checking interactions.',
    technologies: ['Dart', 'Flutter'],
    github: 'https://github.com/IstiakAR/DrugScript',
    demo: '',
  },
  {
    id: 'weather',
    name: 'Weather',
    subtitle: 'Weather forecast app',
    description:
      'Weather app fetching live forecasts from a public API with city search.',
    technologies: ['JavaScript', 'API'],
    github: 'https://github.com/IstiakAR/Weather',
    demo: 'https://istiakar.github.io/Weather/',
  },
  {
    id: 'memory-card',
    name: 'Memory Card',
    subtitle: 'Memory matching game',
    description:
      'Card-matching game built with React — score tracking and shuffled decks.',
    technologies: ['JavaScript', 'React'],
    github: 'https://github.com/IstiakAR/Memory-Card',
    demo: 'https://memory-card-istiakar.netlify.app/',
  },
  {
    id: 'cv-application',
    name: 'CV Application',
    subtitle: 'Résumé builder',
    description:
      'Interactive CV/resume builder with live preview and editable sections.',
    technologies: ['JavaScript', 'React'],
    github: 'https://github.com/IstiakAR/CV-Application',
    demo: '',
  },
  {
    id: 'todo',
    name: 'ToDo',
    subtitle: 'Todo list app',
    description:
      'Todo list with projects, due dates and local storage persistence.',
    technologies: ['JavaScript'],
    github: 'https://github.com/IstiakAR/ToDo',
    demo: 'https://istiakar.github.io/ToDo/',
  },
  {
    id: 'library',
    name: 'Library',
    subtitle: 'Book library tracker',
    description:
      'Track books read, reading status and ratings in a simple library shelf UI.',
    technologies: ['JavaScript'],
    github: 'https://github.com/IstiakAR/Library',
    demo: 'https://istiakar.github.io/Library/',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    subtitle: 'Tic-tac-toe game',
    description:
      'Classic tic-tac-toe with unbeatable minimax AI and score tracking.',
    technologies: ['JavaScript'],
    github: 'https://github.com/IstiakAR/Tic-Tac-Toe',
    demo: 'https://istiakar.github.io/Tic-Tac-Toe/',
  },
  {
    id: 'etch-a-sketch',
    name: 'Etch-a-Sketch',
    subtitle: 'Drawing pad',
    description:
      'Pixel drawing pad with hover-draw, grid resize and rainbow mode.',
    technologies: ['JavaScript'],
    github: 'https://github.com/IstiakAR/Etch-a-sketch',
    demo: 'https://istiakar.github.io/Etch-a-sketch/',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    subtitle: 'Calculator app',
    description:
      'Functional calculator with keyboard support and chained operations.',
    technologies: ['JavaScript'],
    github: 'https://github.com/IstiakAR/Calculator',
    demo: 'https://istiakar.github.io/Calculator/',
  },
  {
    id: 'rock-paper-scissor',
    name: 'Rock Paper Scissors',
    subtitle: 'Rock-paper-scissors game',
    description:
      'Rock-paper-scissors against the computer with round scoring.',
    technologies: ['JavaScript'],
    github: 'https://github.com/IstiakAR/Rock-Paper-Scissor',
    demo: 'https://istiakar.github.io/Rock-Paper-Scissor/',
  },
]

export const experience = [] // [PLACEHOLDER] add internships/jobs here when available

export const achievements = [
  'CSE at University of Dhaka', // [PLACEHOLDER]
  'Maintains public Linux dotfiles & desktop tooling',
  'Builds hardware + software projects end-to-end',
]

/* drop real resume at /public/resume.pdf */
export const resumeFile = {
  path: '/resume.pdf',
  label: 'resume.pdf',
}
