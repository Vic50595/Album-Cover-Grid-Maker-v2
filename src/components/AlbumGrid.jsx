import { useRef, useEffect, useState } from 'react'

export default function AlbumGrid({ gridCols, gridRows, selectedAlbums, onRemove, onDownload }) {
  const maxAlbums = gridCols * gridRows
  const isFull = selectedAlbums.length === maxAlbums
  const progressPct = Math.round((selectedAlbums.length / maxAlbums) * 100)

  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const [cellSize, setCellSize] = useState(80)

  // Recalculate cell size whenever grid dimensions or panel size changes
  useEffect(() => {
    function calculate() {
      if (!panelRef.current || !headerRef.current) return
      // Read actual computed padding from the DOM — no hardcoded values
      const style = window.getComputedStyle(panelRef.current)
      const paddingTop    = parseFloat(style.paddingTop)
      const paddingBottom = parseFloat(style.paddingBottom)
      const paddingLeft   = parseFloat(style.paddingLeft)
      const paddingRight  = parseFloat(style.paddingRight)

      const panelH = panelRef.current.clientHeight
      const panelW = panelRef.current.clientWidth
      const headerH = headerRef.current.clientHeight
      const gap = 4
      const rowGaps = gap * (gridRows - 1)
      const colGaps = gap * (gridCols - 1)

      // Subtract real padding + header + gaps between flex children (1.5rem * 2)
      const flexGap = parseFloat(style.gap) || 24
      const availableH = panelH - paddingTop - paddingBottom - headerH - flexGap
      const availableW = panelW - paddingLeft - paddingRight

      const maxByHeight = Math.floor((availableH - rowGaps) / gridRows)
      const maxByWidth  = Math.floor((availableW - colGaps) / gridCols)

      setCellSize(Math.max(20, Math.min(maxByHeight, maxByWidth)))
    }

    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [gridCols, gridRows])

  async function downloadGrid() {
    const canvas = document.createElement('canvas')
    const cellSizePx = 300
    canvas.width = cellSizePx * gridCols
    canvas.height = cellSizePx * gridRows
    const ctx = canvas.getContext('2d')

    const images = []
    for (const album of selectedAlbums) {
      try {
        const res = await fetch(album.image)
        const blob = await res.blob()
        const img = await new Promise((resolve, reject) => {
          const image = new Image()
          image.onload = () => resolve(image)
          image.onerror = reject
          image.src = URL.createObjectURL(blob)
        })
        images.push(img)
      } catch {
        images.push(null)
      }
    }

    images.forEach((img, idx) => {
      const col = idx % gridCols
      const row = Math.floor(idx / gridCols)
      if (img) {
        ctx.drawImage(img, col * cellSizePx, row * cellSizePx, cellSizePx, cellSizePx)
      } else {
        ctx.fillStyle = '#333'
        ctx.fillRect(col * cellSizePx, row * cellSizePx, cellSizePx, cellSizePx)
      }
    })

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob)
      // Pass data URL to parent for share section preview
      if (onDownload) onDownload(canvas.toDataURL('image/png'))
      const link = document.createElement('a')
      link.href = url
      link.download = `album-grid-${gridCols}x${gridRows}---Git@Vic50595.png`
      link.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="s3-panel s3-panel--right" ref={panelRef}>

      {/* Header */}
      <div ref={headerRef}>
        <div className="s3-grid-header">
          <div>
            <span className="s3-eyebrow">Your Grid</span>
            <div className="s3-grid-count">
              {selectedAlbums.length}<span className="s3-grid-count-max">/{maxAlbums}</span>
            </div>
          </div>
          <button
            className={`s3-download-btn${isFull ? ' s3-download-btn--visible' : ''}`}
            onClick={downloadGrid}
            disabled={!isFull}
          >
            ↓ DOWNLOAD
          </button>
        </div>
        <div className="s3-progress-track">
          <div className="s3-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Grid — cell size calculated in JS so rows never overflow */}
      <div
        className="s3-album-grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, ${cellSize}px)`,
          gridTemplateRows:    `repeat(${gridRows}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: maxAlbums }).map((_, i) => {
          const album = selectedAlbums[i]
          return (
            <div key={i} className={`s3-slot${album ? ' s3-slot--filled' : ''}`}>
              {album ? (
                <>
                  <img src={album.image} alt={album.title} />
                  <button className="s3-remove-btn" onClick={() => onRemove(i)}>×</button>
                </>
              ) : (
                <span className="s3-slot-plus">+</span>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}