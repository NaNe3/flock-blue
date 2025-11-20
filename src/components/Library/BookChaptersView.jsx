import { memo, useEffect, useMemo, useRef } from "react";
import { books } from "../../utility/read";

const ChapterItem = memo(({ chapter, onPress }) => {
  return chapter ? (
    <button
      onClick={onPress}
      style={styles.chapterTextContainer}
    >
      <span style={styles.chapterText}>{chapter}</span>
    </button>
  ) : (
    <div style={styles.chapterTextContainer} />
  );
});

const ChapterRow = memo(({ rowIndex, columns, chapters, handleChapterPress, work, book }) => {
  return (
    <div style={styles.rowOfChapters}>
      {Array.from({ length: columns }, (_, colIndex) => {
        const chapterIndex = rowIndex * columns + colIndex;
        const chapter = chapterIndex < chapters.length ? chapters[chapterIndex] : null;
        
        return (
          <ChapterItem
            key={`chapter-${rowIndex}-${colIndex}`}
            chapter={chapter}
            onPress={() => chapter && handleChapterPress({ work, book, chapter })}
          />
        );
      })}
    </div>
  );
});

const BookChaptersView = memo(({ 
  work,
  book,
  handleChapterPress, 
  columns=4, 
  dismiss=false,
  handleDismiss=()=>{}
}) => {
  const { chapters, rows } = useMemo(() => {
    const chaptersArray = Array.from({ length: book !== '' ? books[work]?.[book] : books[work] }, (_, i) => (i+1));
    return {
      chapters: chaptersArray,
      rows: Math.ceil(chaptersArray.length / columns)
    };
  }, [work, book, columns]);

  const predictedHeight = useMemo(() => {
    return 40 + (rows * 24) + ((rows - 1) * 15);
  }, [rows]);

  const animatedHeight = useRef(0);
  
  useEffect(() => {
    const calculatedTime = 50 + rows * 30;
    const duration = calculatedTime < 400 ? calculatedTime : 400;
    
    if (!dismiss) {
      animatedHeight.current = predictedHeight;
    } else {
      animatedHeight.current = 0;
      setTimeout(() => handleDismiss(book), duration);
    }
  }, [dismiss, predictedHeight, rows, book, handleDismiss]);

  const rowArray = useMemo(() => {
    return Array.from({ length: rows }, (_, index) => index);
  }, [rows]);

  return (
    <div style={styles.container}>
      {rowArray.map(rowIndex => (
        <ChapterRow
          key={`row-${rowIndex}`}
          rowIndex={rowIndex}
          columns={columns}
          chapters={chapters}
          handleChapterPress={handleChapterPress}
          work={work}
          book={book}
        />
      ))}
    </div>
  );
});

export default BookChaptersView;

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',

    padding: '20px',
    borderRadius: '20px',
    backgroundColor: '#222',
  },
  rowOfChapters: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    height: '24px'
  },
  chapterTextContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
  },
  chapterText: {
    width: '40px',
    fontSize: '18px',
    fontWeight: 700,
    textAlign: 'center',
    color: '#aaa',
  },
}