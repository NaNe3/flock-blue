import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FadeInView from "../FadeInView";
import BookChaptersView from "./BookChaptersView";

import { books, detailedWorkSections, locationToURL } from "../../utility/read";

export default function BookColumn({ 
  work,
  selectedBook,
  setSelectedBook
}) {
  const navigate = useNavigate();
  
  const [state, setState] = useState([]);
  const sections = detailedWorkSections[work] || [];

  useEffect(() => {
    if (selectedBook) {
      if (!state.some(b => b.name === selectedBook)) {
        setState(prev => [...prev, { name: selectedBook }]);
      }
    }
  }, [selectedBook]);
  
  const handleBookPress = (book) => {
    if (books[work][book] === 1) {
      const path = locationToURL({ work, book, chapter: 1 });
      navigate(path);
    } else {
      if (state.some(b => b.name === book)) {
        setState(prev => prev.filter(b => b.name !== book))

        if (selectedBook === book || state.length === 0) {
          setSelectedBook(null);
        }
      } else {
        setState(prev => [...prev, { name: book }]);
        setSelectedBook(book);
      }
    }
  }

  const handleChapterDismiss = (book) => {
    setState(prev => prev.filter(b => b.name !== book))
  }

  const handleChapterPress = ({ work, book, chapter }) => {
    navigate(locationToURL({ 
      work, 
      book, 
      chapter 
    }));
  }
  
  return (
    <FadeInView style={styles.container}>
      {sections && sections.map((section, index) => (
        <div key={`section-${index}`} style={styles.section}>
          <div style={styles.sectionHightlight} />
          <div style={styles.books}>
            {section.books.map((item, itemIndex) => (
              <div
                key={`item-${itemIndex}`}
                style={styles.bookContainer}
              >
                <div onClick={() => handleBookPress(item)}>
                  <p key={`item-${itemIndex}`} style={styles.itemText}>{item}</p>
                </div>
                {state.some(b => b.name === item) && (
                  <BookChaptersView
                    work={work}
                    book={item}
                    handleChapterPress={handleChapterPress}
                    columns={10}
                    dismiss={state.find(b => b.name === item)?.status === 'dismiss'}
                    handleDismiss={handleChapterDismiss}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {work === 'Doctrine And Covenants' && (
        <BookChaptersView 
          work={work} 
          book=''
          handleChapterPress={handleChapterPress} 
          columns={10}
        />
      )}
    </FadeInView>
  )
}

const styles = {
  container: {
    padding: '0px 10px',
    width: 593,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  section: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '7px 1fr',
    gap: 20,
  },
  sectionHightlight: {
    width: 7,
    // Remove height: '100%'
    borderRadius: 4,
    backgroundColor: '#333',
  },
  books: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  bookContainer: {
    gap: 10
  },

  itemText: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 20,

    cursor: 'pointer',
  }
}