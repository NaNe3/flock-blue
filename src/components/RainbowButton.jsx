export default function RainbowButton({ children, onClick, color1, color2 }) {
  return (
    <button
      onClick={onClick}
      style={{...styles.button, background: `linear-gradient(45deg, ${color1}, ${color2})`}}
      className='rainbow-button'
    >
      {children}
    </button>
  );
}

const styles = {
  button: {
    border: 'none',
    borderRadius: '30px',
    padding: '15px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.2s',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}