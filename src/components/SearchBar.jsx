import { useEffect, useMemo, useRef, useState } from "react";

import { Search02SolidRounded } from "@hugeicons-pro/core-solid-rounded";
import { HugeiconsIcon } from "@hugeicons/react";

import { useTheme } from "../context/ThemeProvider"
import { useFont } from "../context/FontProvider"

export default function SearchBar({
  placeholder,
  query,
  setQuery,
}) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const [local, setLocal] = useState(query || '');
  const typingInterval = useRef(null);

  useEffect(() => {
    if (typingInterval.current) clearTimeout(typingInterval.current)
    typingInterval.current = setTimeout(() => {
      setQuery(local)
    }, 300);
    return () => clearTimeout(typingInterval.current);
  }, [local]);

  const handleChangeText = (e) => {
    const text = e.target.value;
    setLocal(text);
  }

  return (
    <div style={styles.actionRow}>
      <HugeiconsIcon
        icon={Search02SolidRounded}
        size={24}
        color={theme.tertiaryText}
      />
      <input
        type="text"
        placeholder={placeholder}
        style={styles.input}
        value={local}
        onChange={handleChangeText}
      />
    </div>
  )
}

const style = (theme, font) => ({
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    gap: 10,
    cursor: 'pointer',

    backgroundColor: theme.secondaryBackground,
    padding: 10,
    borderRadius: 12,
  },
  actionText: {
    color: theme.tertiaryText,
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: theme.primaryText,
    fontSize: 16,
    fontWeight: 700,
  },
})
