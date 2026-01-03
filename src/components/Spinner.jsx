export default function Spinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 40 
  },
  spinner: {
    width: 36, 
    height: 36, 
    border: '4px solid #444', 
    borderTop: '4px solid #fff', 
    borderRadius: '50%',
    animation: 'spin 1s linear infinite' 
  }
}