import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './MagazineFlipbook.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

/* ===== Page Wrapper ===== */
const PDFPageWrapper = React.forwardRef<
  HTMLDivElement,
  { pageNumber: number }
>(({ pageNumber }, ref) => (
  <div ref={ref} className={styles.page}>
    <Page
      pageNumber={pageNumber}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      width={500}
    />
  </div>
));

interface FlipbookProps {
  pdfUrl: string;
}

const MagazineFlipbook: React.FC<FlipbookProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewerRef = useRef<HTMLDivElement | null>(null);

  const isSpread = currentPage > 0; // 🔥 key logic

  const zoomIn = () => setZoom(z => Math.min(z + 0.1, 1.6));
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.7));

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  /* ===== Fullscreen ===== */
  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className={styles.flipbookContainer}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages > 0 && (
          <div
            ref={viewerRef}
            className={`${styles.viewerFrame} ${
              isSpread ? styles.spread : styles.single
            }`}
          >

            {/* Controls */}
            <div className={styles.controls}>
              <button onClick={zoomOut} className={styles.controlBtn}>−</button>
              <button onClick={zoomIn} className={styles.controlBtn}>+</button>
              <button onClick={toggleFullscreen} className={styles.controlBtn}>
                {isFullscreen ? '⤫' : '⤢'}
              </button>
            </div>

            {/* Page indicator */}
            <div className={styles.pageIndicator}>
              Page {currentPage + 1} / {numPages}
            </div>

            {/* Zoom wrapper */}
            <div
              className={styles.zoomWrapper}
              style={{ transform: `scale(${zoom})` }}
            >
              <HTMLFlipBook
                width={500}
                height={700}
                showCover
                usePortrait={false}
                size="stretch"
                flippingTime={600}
                className={styles.flipbook}
                onFlip={(e: any) => setCurrentPage(e.data)}
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <PDFPageWrapper key={i} pageNumber={i + 1} />
                ))}
              </HTMLFlipBook>
            </div>

          </div>
        )}
      </Document>
    </div>
  );
};

export default MagazineFlipbook;

