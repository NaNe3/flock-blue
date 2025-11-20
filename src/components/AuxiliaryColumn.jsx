export default function AuxiliaryColumn({ 
  children
}) {
  return (
    <div
      className='left-column'
      style={styles.container}
    >
      <div style={styles.contentContainer}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    width: 300,
    padding: '30px 0px',
    
    // borderLeft: '1px solid #333',
    // borderRight: '1px solid #333',

    position: 'sticky',
    top: 0,
  },

  contentContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#1c1c1c',
    border: '1px solid #333',
    borderRadius: 27,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    padding: '15px 0'
  },
}