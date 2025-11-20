import { Search02SolidRounded } from "@hugeicons-pro/core-solid-rounded";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  placeholder,
  query,
  setQuery,
}) {
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
        color="#888"
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

const styles = {
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    gap: 10,
    cursor: 'pointer',

    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 12,
  },
  actionText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
  },
}