import { useState } from 'react'

export default function SearchPanel({ onAddAlbum }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState(null) // null | 'loading' | 'error' | 'empty'

  async function searchAlbums() {
    const term = query.trim()
    if (!term) return

    setStatus('loading')
    setResults([])

    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=15`
      )
      const data = await res.json()
      const found = data.results || []
      setResults(found)
      setStatus(found.length === 0 ? 'empty' : null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="s3-panel s3-panel--left">
      <div className="s3-panel-header">
        <span className="s3-eyebrow">Search</span>
        <h2 className="s3-panel-title">Find<br />Albums</h2>
      </div>

      <div className="s3-search-bar">
        <input
          className="s3-search-input"
          type="text"
          placeholder="Artist, album, song..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchAlbums()}
        />
        <button className="s3-search-btn" onClick={searchAlbums}>GO</button>
      </div>

      <div className="s3-results-area">
        <span className="s3-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>
          {status === 'loading' ? 'Searching...' :
           status === 'error'   ? 'Search failed — try again' :
           status === 'empty'   ? 'No results found' :
           results.length > 0  ? `${results.length} results` : 'Results'}
        </span>

        <div className="s3-results-grid">
          {results.map(album => {
            const highRes = album.artworkUrl100.replace('100x100', '300x300')
            return (
              <div
                key={album.collectionId}
                className="s3-thumb"
                onClick={() => onAddAlbum(album)}
                title={`${album.collectionName} — ${album.artistName}`}
              >
                <img src={highRes} alt={album.collectionName} />
                <div className="s3-thumb-overlay">
                  <span>{album.collectionName}</span>
                </div>
              </div>
            )
          })}

          {/* Ghost placeholders to keep grid shape when results are sparse */}
          {Array.from({ length: Math.max(0, 10 - results.length) }).map((_, i) => (
            <div key={`ghost-${i}`} className="s3-thumb s3-thumb--ghost" />
          ))}
        </div>
      </div>

      {/* Grid info footer — shows current grid size */}
      <div className="s3-grid-footer s3-grid-footer--left" id="s3-grid-info">
        iTunes Search API · Click to add
      </div>
    </div>
  )
}