import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './MagazineFlipbook.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

// Flipbook requires ref-forwarding
const PDFPageWrapper = React.forwardRef<HTMLDivElement, { pageNumber: number }>(
  ({ pageNumber }, ref) => (
    <div ref={ref} className={styles.page}>
      <Page 
        pageNumber={pageNumber}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={500}
      />
    </div>
  )
);

interface FlipbookProps {
  pdfUrl: string;
}

const MagazineFlipbook: React.FC<FlipbookProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className={styles.flipbookContainer}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>

        {numPages > 0 && (
          <HTMLFlipBook
            width={500}
            height={700}
            className={styles.flipbook}
            showCover={true}
            flippingTime={600}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <PDFPageWrapper key={index} pageNumber={index + 1} />
            ))}
          </HTMLFlipBook>
        )}

      </Document>
    </div>
  );
};

export default MagazineFlipbook;

