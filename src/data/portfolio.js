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
