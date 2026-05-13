import { useState, useEffect, useRef } from 'react'

const COUNTRIES = [
  { value: 'be', label: 'Belgium' },
  { value: 'us', label: 'United States' },
  { value: 'fr', label: 'France' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
]

export default function TrendingBanner() {
  const [expanded, setExpanded] = useState(false)
  const [country, setCountry] = useState('be')
  const [albums, setAlbums] = useState([])
  const contentRef = useRef(null)

  useEffect(() => {
    loadTopAlbums(country)
  }, [country])

  // Update max-height when expanded changes
  useEffect(() => {
    if (!contentRef.current) return
    if (expanded) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px'
    } else {
      contentRef.current.style.maxHeight = '0'
    }
  }, [expanded, albums])

  async function loadTopAlbums(countryCode) {
    try {
      const res = await fetch(
        `https://itunes.apple.com/${countryCode}/rss/topalbums/limit=50/json`
      )
      const data = await res.json()
      let entries = data.feed?.entry || []

      // Filter out EPs and soundtracks
      entries = entries.filter(album => {
        const title = album['im:name'].label.toLowerCase()
        const category = album.category.attributes.label.toLowerCase()
        return !(
          title.includes(' ep') ||
          title.endsWith('ep') ||
          category.includes('soundtrack') ||
          title.includes('soundtrack')
        )
      })

      // Duplicate for infinite scroll
      setAlbums([...entries, ...entries])
    } catch (err) {
      console.error('Failed to load top albums:', err)
    }
  }

  return (
    <div className="trend">
      <div
        className="banner"
        onClick={() => setExpanded(prev => !prev)}
      >
        Top Trending Albums {expanded ? '▲' : '▼'}
      </div>

      <div className="content" ref={contentRef}>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          {COUNTRIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <div className="carousel-wrapper">
          <div className="carousel" id="albumCarousel">
            {albums.map((album, i) => {
              const name = album['im:name'].label
              const artist = album['im:artist'].label
              const image = album['im:image'][2].label
              const link = album.link.attributes.href

              return (
                <div
                  className="album"
                  key={`${name}-${i}`}
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.effectAllowed = 'copy'
                    e.dataTransfer.setData(
                      'application/x-album-json',
                      JSON.stringify({
                        id: `trend-${name}-${artist}`,
                        image: image.replace(/\/\d+x\d+bb/, '/300x300bb'),
                        title: name,
                        artist,
                      })
                    )
                  }}
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                  >
                    <img src={image} alt={name} draggable={false} />
                    <div className="info">
                      <p>{name}</p>
                      <small>{artist}</small>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
