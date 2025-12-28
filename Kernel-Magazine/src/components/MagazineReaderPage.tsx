import React from 'React';
import MagazineFlipbook from '../components/MagazineFlipbook';
import './MagazineReaderPage.css';

const MagazineReaderPage: React.FC = () => {
  return (
    <div className="readerPage">
      <div className="readerContainer">
        <MagazineFlipbook pdfUrl="/magazine.pdf" />
      </div>
    </div>
  );
};

export default MagazineReaderPage;
