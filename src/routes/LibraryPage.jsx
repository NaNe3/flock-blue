import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LibrarySearchView from "../components/Library/LibrarySearchView";
import StandardWorksShelf from "../components/Library/StandardWorksShelf";
import BookColumn from "../components/Library/BookColumn";

export default function LibraryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const [junk, path, work, book] = location.pathname.split('/');
    
    const formattedWork = work ? work.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : null;
    const formattedBook = book ? book.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : null;

    setSelectedWork(formattedWork);
    setSelectedBook(formattedBook);
  }, [location.pathname]);

  useEffect(() => {
    if (!selectedBook && selectedWork) {
      setSelectedBook(null);

      const work = selectedWork.toLowerCase().replace(/ /g, '-');
      navigate(`/library/${work}`);
    } else if (selectedBook && selectedWork) {
      const work = selectedWork.toLowerCase().replace(/ /g, '-');
      const book = selectedBook.toLowerCase().replace(/ /g, '-');

      navigate(`/library/${work}/${book}`);
    }
  }, [selectedBook]);

  return (
    <div style={styles.container}>
      <LibrarySearchView />
      <StandardWorksShelf />

      {selectedWork && (
        <BookColumn 
          work={selectedWork} 
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}

      {/* <ExploreWorkShelf /> */}
    </div>
  )
}

const styles = {
  container: {
    borderLeft: '1px solid #333',

    width: '100%',
    maxWidth: 800,
    minHeight: '101vh',
    padding: 60,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 60,

    position: 'relative',
  }
}