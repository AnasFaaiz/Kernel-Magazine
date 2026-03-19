import MagazineFlipbook from '../components/MagazineFlipbook';
import './MagazineReaderPage.css';

const MagazineReaderPage = () => {
  return (
    <div className="readerPage">
      <div className="readerContainer">
        <MagazineFlipbook pdfUrl="/magazine.pdf" />
      </div>
    </div>
  );
};

export default MagazineReaderPage;
