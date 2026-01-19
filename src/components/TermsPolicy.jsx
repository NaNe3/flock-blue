import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";
import { useMemo } from "react";

export default function TermsPolicy() {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const navigate = useNavigate();
  
  return (
    <div style={styles.container}>
      <p style={styles.text} className="hover-underline" onClick={() => navigate('/terms-of-service')}>Terms of Service</p>
      <p style={styles.text} className="hover-underline" onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
      <p style={styles.text} className="hover-underline" onClick={() => navigate('/community-guidelines')}>Community Guidlines</p>
    </div>
  )
}

const style = (theme, font) => ({
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
    color: theme.tertiaryText,
    ...font.bold,

    cursor: 'pointer',
    lineHeight: '14px',
  }
})
