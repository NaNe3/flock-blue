import { memo, useEffect, useMemo, useRef } from "react";
import { books } from "../../utility/read";
import { useFont } from "../../context/FontProvider";
import { useTheme } from "../../context/ThemeProvider";

const ChapterItem = memo(({ chapter, onPress, styles }) => {
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

const ChapterRow = memo(({ rowIndex, columns, chapters, handleChapterPress, work, book, styles }) => {
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

            styles={styles}
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
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

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

          styles={styles}
        />
      ))}
    </div>
  );
});

export default BookChaptersView;

const style = (theme, font) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',

    padding: '20px',
    borderRadius: '20px',
    backgroundColor: theme.secondaryBackground,
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
    fontSize: '18px',
    color: theme.secondaryText,
    ...font.regular,

    width: '40px',
    textAlign: 'center',
  },
})
