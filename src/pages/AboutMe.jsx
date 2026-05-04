import { useEffect, useRef } from 'react'
import '../styles/global.css'
import '../styles/aboutme.css'

const SKILLS = [
  { cat: 'Language',  name: 'HTML5' },
  { cat: 'Language',  name: 'CSS3' },
  { cat: 'Language',  name: 'JavaScript' },
  { cat: 'Framework', name: 'React' },
  { cat: 'Tooling',   name: 'Vite' },
  { cat: 'API',       name: 'iTunes API' },
  { cat: 'Canvas',    name: 'Canvas API' },
  { cat: 'Creative',  name: 'p5.js' },
  { cat: 'Version',   name: 'Git / GitHub' },
]

const TRACKS = ['01 — Bio', '02 — Skills & Tools', '03 — Credits']

// Bar heights for the visualizer
const BAR_COUNT = 28

export default function AboutMe() {
  const barsRef = useRef([])

  // GSAP music visualizer animation
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
    script.onload = () => {
      const gsap = window.gsap
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        const minH = 4
        const maxH = 28
        gsap.to(bar, {
          height: `${Math.random() * (maxH - minH) + minH}px`,
          duration: 0.3 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.04,
        })
      })
    }
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  return (
    <div className="booklet">

      {/* ── LEFT: cassette cover ── */}
      <aside className="cassette-cover">
        <div className="cassette-cover-top">
          <span className="am-eyebrow">Side A — About</span>
          <div className="am-avatar">V</div>
          <div className="am-name">Victoria</div>
          <div className="am-role">Web Dev · Music Nerd</div>

          <ul className="am-tracklist">
            {TRACKS.map(t => (
              <li className="am-track" key={t}>
                <span className="am-track-num">{t.slice(0,2)}</span>
                <span>{t.slice(5)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="am-cover-bottom">
          {/* Music visualizer bars */}
          <div className="am-visualizer">
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <div
                key={i}
                className="am-vis-bar"
                ref={el => barsRef.current[i] = el}
                style={{ height: `${4 + (i % 7) * 3}px` }}
              />
            ))}
          </div>

          {/* Footer credits */}
          <div className="am-footer-credits">
            <span className="am-credit-made">Made by <a className="am-credit-made-link" href="https://vic50595.github.io" target="_blank" rel="noreferrer">Victoria</a></span>
            <a
              className="am-credit-github"
              href="https://github.com/Vic50595"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="am-git-icon" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
              </svg>
              <span className="am-credit-handle">@Vic50595</span>
            </a>
            <span className="am-credit-copy">© 2026</span>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: liner notes ── */}
      <main className="liner-notes">

        <div className="liner-content">

          <section className="liner-section">
            <span className="am-eyebrow am-eyebrow--dark">01 — Bio</span>
            <p className="liner-bio">
              Hi, I'm <strong>Victoria</strong> — a web developer based in Belgium
              with a passion for music and creative tools. I built this Album Grid
              Maker because I wanted an easy way to make visual grids of my favourite
              records for social media. It started as a personal project and turned
              into something I'm genuinely proud of.
            </p>
            <p className="liner-bio">
              I love the intersection of <strong>design and code</strong> — making
              things that look good and work well. When I'm not building, I'm
              probably deep in a music rabbit hole or discovering a new artist.
            </p>
          </section>

          <section className="liner-section">
            <span className="am-eyebrow am-eyebrow--dark">02 — Skills &amp; Tools</span>
            <div className="skills-grid">
              {SKILLS.map(s => (
                <div className="skill-pill" key={s.name}>
                  <span className="skill-cat">{s.cat}</span>
                  <span className="skill-name">{s.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="liner-credits">
            Special thanks to <strong>Aude</strong> &amp; <strong>Sonia</strong> for
            guidance and advice throughout this project.<br />
            Inspired by <strong>Winona</strong> &amp; OpenProcessing.<br />
            Built with iTunes API · Canvas API · React · Vite.
          </section>

        </div>

      </main>
    </div>
  )
}