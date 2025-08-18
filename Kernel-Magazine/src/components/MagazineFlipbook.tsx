import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './MagazineFlipbook.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface FlipbookProps {
  pdfUrl: string;
}

const MagazineFlipbook: React.FC<FlipbookProps> = ({ pdfUrl }) => {
   const [numPages, setNumPages] = useState<number>(0);

   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
	setNumPages(numPages);
   }

  return (
    <div className={styles.flipbookContainer}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className={styles.pdfDocument}>
	{numPages > 0 && (
          <HTMLFlipBook 
            width={500} 
            height={700}
            className={styles.flipbook}
          >
	   {Array.from(new Array(numPages), (el, index) => {
	     return (
	       <div className={styles.page} key={`page_${index + 1}`}>
	         <Page pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
	       </div>
	     );
	   })}
	 </HTMLFlipBook>
	)}
	</Document>
    </div>
  );
};

export default MagazineFlipbook;
