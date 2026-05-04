import { useState } from 'react'

const SITE_URL = 'https://vic50595.github.io/album-grid-creator'
const SHARE_TEXT = `I just picked albums and this happened, try Album Cover Grid Maker: ${SITE_URL}`

const SOCIALS = [
  {
    name: 'X / Twitter',
    href: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`,
    icon: (
      <svg viewBox="0 0 300 300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m60.94 19.81-3.04 0 0-6.1-3.06 0 0-3.04-3.04 0 0-3.06-6.1 0 0-3.04-6.08 0 0-3.04-15.24 0 0 3.04-6.1 0 0 3.04-6.1 0 0 3.06-3.04 0 0 3.04-3.06 0 0 6.1-3.04 0 0 6.1-3.04 0 0 15.22 3.04 0 0 6.1 3.04 0 0 6.1 3.06 0 0 3.04 3.04 0 0 3.06 6.1 0 0 3.04 9.14 0 0-21.34-9.14 0 0-9.14 9.14 0 0-12.18 3.04 0 0-3.06 15.24 0 0 9.16-9.14 0 0 6.08 12.2 0 0 3.06-3.06 0 0 3.04-3.04 0 0 3.04-6.1 0 0 21.34 9.14 0 0-3.04 6.1 0 0-3.06 3.04 0 0-3.04 3.06 0 0-6.1 3.04 0 0-6.1 3.06 0 0-15.22-3.06 0 0-6.1z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: () => `https://www.instagram.com/`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: () => `https://www.tiktok.com/`,
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.94 18.28h-3.04V12.18h-3.06V9.14H51.8V6.1h-6.1V3.04h-6.08V0h-15.24v3.04H18.28v3.06H12.18v3.04H9.14v3.04H6.08v6.1H3.04v6.1H0v15.24h3.04v6.1h3.04v6.08h3.06v3.06h3.04v3.04h6.1v3.06h6.1V64h15.24v-3.04h6.08v-3.06h6.1v-3.04h3.04V51.8h3.06v-6.08h3.04v-6.1H64v-15.24h-3.06Zm-3.04 12.2h-3.06v3.04h-9.14v15.24h-3.04v3.04h-3.04v3.06h-3.06v3.04h-15.24v-3.04H18.28V51.8H15.22v-3.04H12.18v-6.1H9.14v-12.18h3.04v-3.06h3.04v-3.04h12.2v9.14h-3.04v9.14h6.08V9.14h3.06V6.1h6.1v3.04h3.04v3.04h3.04v3.06h3.06v3.04h6.08v3.06h3.06Z"/>
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: () => `https://discord.com/`,
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.94 18.28h-3.04V12.18h-3.06V9.14H51.8V6.1h-6.1V3.04h-6.08V0h-15.24v3.04H18.28v3.06H12.18v3.04H9.14v3.04H6.08v6.1H3.04v6.1H0v15.24h3.04v6.1h3.04v6.08h3.06v3.06h3.04v3.04h6.1v3.06h6.1V64h15.24v-3.04h6.08v-3.06h6.1v-3.04h3.04V51.8h3.06v-6.08h3.04v-6.1H64v-15.24h-3.06Zm-3.04 24.38h-3.06v3.06H51.8v3.04h-3.04v3.04h-12.2v-3.04h9.14v-6.1H18.28v6.1h9.14v3.04h-12.2v-3.04H12.18v-3.04H9.14v-3.06H6.08v-15.24h3.06v-6.08h3.04V18.28h3.04V15.24h12.2v3.04h9.14V15.24h12.2v3.04h3.04v3.06h3.04v6.08h3.06Z"/>
        <path d="M36.56 27.42h6.1v6.1h-6.1Z"/>
        <path d="M21.32 27.42h6.1v6.1h-6.1Z"/>
      </svg>
    ),
  },
]

export default function VinylSection({ lastGridUrl }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!lastGridUrl) return
    try {
      const res = await fetch(lastGridUrl)
      const blob = await res.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback — open image in new tab
      window.open(lastGridUrl, '_blank')
    }
  }

  return (
    <section id="section4">
      <div className="s4-layout">

        {/* Left — share buttons + footer */}
        <div className="s4-left">
          <div className="s4-left-content">
            <span className="s4-eyebrow">Share your grid</span>
            <h2 className="s4-title">Share<br />It</h2>

            <div className="s4-socials">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  className="s4-share-btn"
                  href={s.href()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="s4-share-icon">{s.icon}</div>
                  <span className="s4-share-name">{s.name}</span>
                  <span className="s4-share-arrow">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Same footer as section 1 */}
          <div className="hero-credits s4-footer">
            <span className="hero-credit-made">Made by <a className="hero-credit-made-link" href="https://vic50595.github.io" target="_blank" rel="noreferrer">Victoria</a></span>
            <a
              className="hero-credit-github"
              href="https://github.com/Vic50595"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="hero-git-icon" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
              </svg>
              <span className="hero-credit-handle">@Vic50595</span>
            </a>
            <span className="hero-credit-copy">© 2026</span>
          </div>
        </div>

        {/* Right — grid preview + copy */}
        <div className="s4-right">
          <div className="s4-preview-wrap">
            {lastGridUrl ? (
              <img src={lastGridUrl} alt="Your album grid" className="s4-preview-img" />
            ) : (
              <div className="s4-preview-empty">
                <span className="s4-preview-empty-icon">▦</span>
                <span className="s4-preview-empty-text">Your grid appears here<br />after downloading</span>
              </div>
            )}
          </div>

          <button
            className={`s4-copy-btn${lastGridUrl ? ' s4-copy-btn--active' : ''}`}
            onClick={handleCopy}
            disabled={!lastGridUrl}
          >
            {copied ? '✓ Copied!' : '⎘ Copy image'}
          </button>

          <span className="s4-preview-label">
            {lastGridUrl ? 'Right-click to save · Copy to clipboard' : 'Complete your grid to share'}
          </span>
        </div>

      </div>
    </section>
  )
}