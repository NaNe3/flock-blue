import BookCard from "../BookCard"

export default function BookShelf({ title=null, books }) {
  return (
    <div style={styles.container}>
      {title && (
        <p style={styles.shelfTitle}>{title}</p>
      )}
      <div style={styles.shelf}>
        {books.map((book, index) => (
          <div 
            key={index} 
            className="hover-expand"
            onClick={book?.onClick}
          >
            <BookCard 
              text={book.text}
              width={100}
              colors={book.colors}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  shelfTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#aaa',
    padding: '0px 0px 20px 20px',
  },
  shelf: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  }
}