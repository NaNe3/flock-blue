import { useTheme } from "../context/ThemeProvider"

export default function AuxiliaryColumn({ 
  children,
  border=true,
}) {
  const { theme } = useTheme()

  return (
    <div
      className='left-column'
      style={styles.container}
    >
      <div style={{ ...styles.contentContainer, border: border ? `1px solid ${theme.primaryBorder}` : 'none' }}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    width: 300,
    padding: '25px 0px',
    
    // borderLeft: '1px solid #333',
    // borderRight: '1px solid #333',

    position: 'sticky',
    top: 0,
  },

  contentContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#1c1c1c',
    borderRadius: 27,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    padding: '15px 0',

    overflowY: 'auto',
    overflowX: 'hidden',

    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // Internet Explorer and Edge
    // '&::-webkit-scrollbar': { // Webkit browsers (Chrome, Safari)
    //   display: 'none'
    // }
  },
}