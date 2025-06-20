export default function CircleInnunciated({
  text,
  color1,
  color2,
}) {
  return (
    <div style={styles.container}>
      <p style={{ ...styles.text, backgroundImage: `linear-gradient(to right, ${color1}, ${color2})` }}>
        {text}
      </p>
    </div>
  )
}

const styles = {
  container: {
    borderWidth: 3,
    borderRadius: 40,
    padding: '10px 15px',
    borderStyle: 'solid',
  },
  text: {
    fontSize: 20,
    fontWeight: 800,
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, red, blue)', // Default gradient
    backgroundClip: 'text', // For non-WebKit browsers
    WebkitBackgroundClip: 'text', // For WebKit browsers
    color: 'transparent', // Makes the gradient visible
    display: 'inline-block', // Ensures proper clipping
  },
}