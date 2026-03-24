import { useMemo } from "react";

import { useFont } from "../context/FontProvider";
import { useTheme } from "../context/ThemeProvider";

export default function CheckBoxedText({ text, checked, setChecked }) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  }  

  return (
    <div style={styles.container}>
      <input 
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        style={{
          ...styles.checkbox,
          backgroundColor: checked ? '#0ba3ff' : theme.contrast,
        }}
      />
      <p style={styles.checkboxText}>{text}</p>
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
  checkbox: {
    width: 18,
    height: 18,

    flexShrink: 0,

    border: 'none',
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none',

    backgroundColor: theme.secondaryBackground,
    borderRadius: 5,

  },
  checkboxText: {
    fontSize: 18,
    fontWeight: 700,
  },
})