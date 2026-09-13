import { icons } from '../icons.js'
import { profile } from '../../data/portfolio.js'

/* Contact — Outlook-Express-style XP app with real link rows. */

export default function ContactApp() {
  const rows = [
    {
      label: 'E-Mail',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: icons.document,
    },
    {
      label: 'GitHub',
      value: profile.githubLabel,
      href: profile.github,
      icon: icons.exe,
    },
    {
      label: 'LinkedIn',
      value: profile.linkedinLabel,
      href: profile.linkedin,
      icon: icons.network,
    },
    {
      label: 'Facebook',
      value: profile.facebookLabel,
      href: profile.facebook,
      icon: icons.html,
    },
    {
      label: 'Discord',
      value: 'Copy: 719816521265971220',
      href: profile.discord,
      icon: icons.network,
    },
    {
      label: 'Twitter / X',
      value: profile.twitterLabel,
      href: profile.twitter,
      icon: icons.html,
    },
  ]

  return (
    <div className="xp-app">
      <div className="xp-app-scroll">
        <div className="xp-panel">
          <h3 className="xp-panel-title">
            <img src={icons.network} alt="" width="32" height="32" />
            Contact Information
          </h3>
          <p className="xp-subtle">{profile.availability}</p>
        </div>
        <div className="xp-contact-rows">
          {rows.map((r) => (
            <a
              key={r.label}
              className="xp-contact-row"
              href={r.href}
              target={r.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
            >
              <img src={r.icon} alt="" width="32" height="32" />
              <div>
                <div className="xp-contact-label">{r.label}</div>
                <div className="xp-contact-value">{r.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="xp-statusbar">Ready</div>
    </div>
  )
}
