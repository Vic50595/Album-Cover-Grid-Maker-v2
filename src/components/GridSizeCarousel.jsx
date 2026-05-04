import { useRef, useEffect } from 'react'

const GRID_SIZES = [
  { label: 'Twitter / Facebook', cols: 5, rows: 3 },
  { label: 'Twitter Banner',     cols: 6, rows: 2 },
  { label: 'Instagram Post',     cols: 4, rows: 4 },
  { label: 'TikTok Post',        cols: 3, rows: 5 },
  { label: 'Facebook Cover',     cols: 5, rows: 2 },
  { label: 'Square L',           cols: 5, rows: 5 },
  { label: 'Square XL',          cols: 7, rows: 7 },
  { label: 'Square XXL',         cols: 9, rows: 9 },
]

export default function GridSizeCarousel({ gridCols, gridRows, onSelect }) {
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onMouseDown = (e) => {
      if (window.innerWidth > 768) return // desktop: no drag needed
      isDragging.current = true
      track.classList.add('s2-track--dragging')
      startX.current = e.pageX - track.offsetLeft
      scrollLeft.current = track.scrollLeft
    }
    const onMouseLeave = () => { isDragging.current = false; track.classList.remove('s2-track--dragging') }
    const onMouseUp    = () => { isDragging.current = false; track.classList.remove('s2-track--dragging') }
    const onMouseMove  = (e) => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      track.scrollLeft = scrollLeft.current - (x - startX.current)
    }

    track.addEventListener('mousedown',  onMouseDown)
    track.addEventListener('mouseleave', onMouseLeave)
    track.addEventListener('mouseup',    onMouseUp)
    track.addEventListener('mousemove',  onMouseMove)
    return () => {
      track.removeEventListener('mousedown',  onMouseDown)
      track.removeEventListener('mouseleave', onMouseLeave)
      track.removeEventListener('mouseup',    onMouseUp)
      track.removeEventListener('mousemove',  onMouseMove)
    }
  }, [])

  const active = GRID_SIZES.find(s => s.cols === gridCols && s.rows === gridRows)

  return (
    <div className="s2-picker">
      <div className="s2-picker-header">
        <span className="s2-eyebrow" style={{ border: 'none', padding: 0, margin: 0 }}>
          Choose your grid size
        </span>
        <span className="s2-selected-badge">
          {active ? `${active.label} · ${active.cols}×${active.rows}` : `${gridCols}×${gridRows}`}
        </span>
      </div>

      <div className="s2-track" ref={trackRef}>
        {GRID_SIZES.map(size => {
          const isActive = gridCols === size.cols && gridRows === size.rows
          const totalCells = size.cols * size.rows
          return (
            <div
              key={size.label}
              className={`s2-size-card${isActive ? ' s2-size-card--active' : ''}`}
              onClick={() => onSelect(size.cols, size.rows)}
            >
              <div
                className="s2-mini-grid"
                style={{ gridTemplateColumns: `repeat(${size.cols}, 1fr)` }}
              >
                {Array.from({ length: totalCells }).map((_, i) => (
                  <div className="s2-mini-cell" key={i} />
                ))}
              </div>
              <span className="s2-size-label">{size.label}</span>
              <span className="s2-size-dim">{size.cols}×{size.rows}</span>
            </div>
          )
        })}
      </div>

      <hr className="s2-divider" />
      <div className="s2-hint">Drag to scroll · Click to select</div>
    </div>
  )
}