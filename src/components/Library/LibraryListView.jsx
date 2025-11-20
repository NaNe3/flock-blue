import BookCard from "../BookCard"
import { workColors } from "../../utility/colors"
import { useNavigate } from "react-router-dom"

export default function LibraryListView() {
  const navigate = useNavigate();

  const handleWorkPress = (work) => {
    navigate(`/library/${work.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.bookRow}
        onClick={() => handleWorkPress('Old Testament')}
      >
        <BookCard
          text={'Old Testament'}
          colors={workColors['Old Testament']}
          width={60}
        />
        <div style={styles.bookInformation}>
          <span style={styles.title}>Old Testament</span>
          <span style={styles.subtitle}>King James Version</span>
        </div>
      </div>

      <div 
        style={styles.bookRow}
        onClick={() => handleWorkPress('New Testament')}
      >
        <BookCard
          text={'New Testament'}
          colors={workColors['New Testament']}
          width={60}
        />
        <div style={styles.bookInformation}>
          <span style={styles.title}>New Testament</span>
          <span style={styles.subtitle}>King James Version</span>
        </div>
      </div>

      <div 
        style={styles.bookRow}
        onClick={() => handleWorkPress('Book Of Mormon')}
      >
        <BookCard
          text={'Book Of Mormon'}
          colors={workColors['Book Of Mormon']}
          width={60}
        />
        <div style={styles.bookInformation}>
          <span style={styles.title}>Book of Mormon</span>
          {/* <span style={styles.subtitle}>KJV</span> */}
        </div>
      </div>

      <div 
        style={styles.bookRow}
        onClick={() => handleWorkPress('Doctrine And Covenants')}
      >
        <BookCard
          text={'Doctrine & Covenants'}
          colors={workColors['Doctrine And Covenants']}
          width={60}
        />
        <div style={styles.bookInformation}>
          <span style={styles.title}>Doctrine & Covenants</span>
          <span style={styles.subtitle}>Latter Day Saints</span>
        </div>
      </div>
      
      <div 
        style={styles.bookRow}
        onClick={() => handleWorkPress('Pearl Of Great Price')}
      >
        <BookCard
          text={'Pearl Of Great Price'}
          colors={workColors['Pearl Of Great Price']}
          width={60}
        />
        <div style={styles.bookInformation}>
          <span style={styles.title}>Pearl of Great Price</span>
          <span style={styles.subtitle}>Latter Day Saints</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    position: 'sticky',
    top: 0,
  },

  bookRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '15px',
    cursor: 'pointer',
    width: '100%',
  },
  bookInformation: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 800,  
    color: '#fff',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 700,  
    color: '#aaa',
  },
}