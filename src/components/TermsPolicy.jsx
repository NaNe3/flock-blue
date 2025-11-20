import { useNavigate } from "react-router-dom";

export default function TermsPolicy() {
  const navigate = useNavigate();
  
  return (
    <div style={styles.container}>
      <p style={styles.text} className="hover-underline" onClick={() => navigate('/terms-of-service')}>Terms of Service</p>
      <p style={styles.text} className="hover-underline" onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
      <p style={styles.text} className="hover-underline" onClick={() => navigate('/community-guidelines')}>Community Guidlines</p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,

    flexWrap: 'wrap',
    gap: 12,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  text: {
    fontSize: 14,
    fontWeight: 800,
    lineHeight: '14px',
    color: '#888',
    cursor: 'pointer',
  }
}