import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LibrarySearchView from "../components/Library/LibrarySearchView";
import StandardWorksShelf from "../components/Library/StandardWorksShelf";
import BookColumn from "../components/Library/BookColumn";

import { useDashboard } from "../context/DashboardProvider";
import { useTheme } from "../context/ThemeProvider";

export default function LibraryPage() {
  const { theme } = useTheme()
  const styles = useMemo(() => style(theme), [theme]);

  const navigate = useNavigate();
  const location = useLocation();
  const { dashboard, setDashboard } = useDashboard();

  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);


  useEffect(() => {
    if (dashboard.width !== 800) {
      setDashboard((prev) => ({
        ...prev,
        width: 800
      }))
    }
  }, []);

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

const style = (theme) => ({
  container: {
    borderLeft: `1px solid ${theme.primaryBorder}`,

    width: '100%',
    minHeight: '101vh',
    padding: 60,

    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 60,

    position: 'relative',
  }
})
