import React from 'react';
import MagazineFlipbook from '../components/MagazineFlipbook';
import samplePdf from '../assets/sample-magazine.pdf';

const BookViewPage: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '40px 0', color: '#263238' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif'}}> The Latest Issue</h1>
      </div>

      <MagazineFlipbook pdfUrl={samplePdf} />
    </div>
  );
};

export default BookViewPage;
