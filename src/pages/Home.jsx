import { useState } from 'react'
import '../styles/index.css'
import TrendingBanner from '../components/TrendingBanner.jsx'
import GridSizeCarousel from '../components/GridSizeCarousel.jsx'
import SearchPanel from '../components/SearchPanel.jsx'
import AlbumGrid from '../components/AlbumGrid.jsx'
import VinylSection from '../components/VinylSection.jsx'

export default function Home() {
  const [gridCols, setGridCols] = useState(3)
  const [gridRows, setGridRows] = useState(3)
  const [selectedAlbums, setSelectedAlbums] = useState([])
  const [lastGridUrl, setLastGridUrl] = useState(null)

  function handleSelectGrid(cols, rows) {
    setGridCols(cols)
    setGridRows(rows)
    setSelectedAlbums(prev => prev.slice(0, cols * rows))
  }

  function handleAddAlbum(album) {
    const maxAlbums = gridCols * gridRows
    setSelectedAlbums(prev => {
      if (prev.length >= maxAlbums) return prev
      return [
        ...prev,
        {
          id: album.collectionId,
          image: album.artworkUrl100.replace('100x100', '300x300'),
          title: album.collectionName,
          artist: album.artistName,
        },
      ]
    })
  }

  function handleRemoveAlbum(index) {
    setSelectedAlbums(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <TrendingBanner />

      {/* Section 1 — Hero */}
      <section id="section1">
        <div className="hero-img-panel" />
        <div className="hero-left">
          <span className="hero-eyebrow">Create custom album cover grids</span>
          <h1 className="hero-title">
            <span className="hero-line1">ALBUM COVER</span>
            <span className="hero-line2">GRID MAKER</span>
          </h1>
          <div className="hero-bottom">
            <a className="hero-tag" href="#section2">Scroll to start ↓</a>
            <div className="hero-credits">
              <span className="hero-credit-made">Made by <a className="hero-credit-made-link" href="https://vic50595.github.io" target="_blank" rel="noreferrer">Victoria</a></span>
              <a className="hero-credit-github" href="https://github.com/Vic50595" target="_blank" rel="noreferrer">
                <svg className="hero-git-icon" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                </svg>
                <span className="hero-credit-handle">@Vic50595</span>
              </a>
              <span className="hero-credit-copy">© 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — How it works + Grid size picker */}
      <section id="section2">
        <div className="s2-layout">
          <div className="s2-left">
            <div className="s2-left-top">
              <span className="s2-eyebrow">How it works</span>
              <h2 className="s2-big-title">Build<br />Your<br />Grid</h2>
            </div>
            <div className="s2-steps">
              {[
                ['Pick a format', 'Choose the platform and grid size that fits your post.'],
                ['Search albums', 'Type any artist, album or song title.'],
                ['Click to add',  'Fill your grid, remove with the red cross.'],
                ['Download',      'Export your finished grid as a high-res PNG.'],
              ].map(([bold, rest], i) => (
                <div className="s2-step" key={i}>
                  <div className="s2-step-num">{i + 1}</div>
                  <div className="s2-step-text">
                    <strong>{bold}</strong> — {rest}
                  </div>
                </div>
              ))}
            </div>
            <div className="s2-footer-label">Album Cover Grid Maker</div>
          </div>
          <div className="s2-right">
            <GridSizeCarousel gridCols={gridCols} gridRows={gridRows} onSelect={handleSelectGrid} />
          </div>
        </div>
      </section>

      {/* Section 3 — Search + Grid */}
      <section id="section3">
        <div className="s3-layout">
          <SearchPanel onAddAlbum={handleAddAlbum} />
          <AlbumGrid
            gridCols={gridCols}
            gridRows={gridRows}
            selectedAlbums={selectedAlbums}
            onRemove={handleRemoveAlbum}
            onDownload={setLastGridUrl}
          />
        </div>
      </section>

      {/* Section 4 — Share */}
      <VinylSection lastGridUrl={lastGridUrl} />
    </>
  )
}