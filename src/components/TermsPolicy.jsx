import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";
import { useMemo } from "react";

export default function TermsPolicy() {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);
  
  return (
    <div style={styles.container}>
      <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" style={styles.text} className="hover-opacity">Terms of Service</a>
      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={styles.text} className="hover-opacity">Privacy Policy</a>
      <a href="/community-guidelines" target="_blank" rel="noopener noreferrer" style={styles.text} className="hover-opacity">Community Guidelines</a>
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
    textDecoration: 'none',
    lineHeight: '14px',
  }
})
