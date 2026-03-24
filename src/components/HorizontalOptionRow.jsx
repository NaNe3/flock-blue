import { useMemo } from 'react';

import { useTheme } from '../context/ThemeProvider';
import { useHolos } from '../context/HolosProvider';
import { useFont } from '../context/FontProvider';

export default function HorizontalOptionRow({
  options,
  optionSelected,
  onOptionChange=()=>{},
}) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { color } = useHolos()

  const handleOptionPress = (option) => {
    if (onOptionChange) {
      onOptionChange(option.value);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.scrollView}>
        {options.map((option) => (
          <div 
            key={option.value}
            style={{
              ...styles.optionButton,
              ...(optionSelected === option.value ? { backgroundColor: color, borderColor: color } : styles.unselected),
            }}
            onClick={() => handleOptionPress(option)}
          >
            <span style={styles.optionText}>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function style(theme, font) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    },
    scrollView: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    optionButton: {
      padding: '8px 10px',
      borderRadius: 40,
      borderWidth: 2,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      outline: 'none',
    },
    unselected: {
      borderColor: theme.primaryBorder,
    },
    optionText: {
      fontSize: 16,
      color: theme.actionText,
      ...font.regular,
    },
  };
}