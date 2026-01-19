import { useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-solid-rounded";

import { useHolos } from "../../context/HolosProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useFont } from "../../context/FontProvider";

export default function LibrarySearchView() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { user } = useHolos()

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <h2 style={styles.title}>Hello{user?.full_name && ` ${user.fname}`}, what are we studying today?</h2>
        <div style={styles.searchContainer}>
          <HugeiconsIcon
            icon={Search02Icon}
            size={24}
            color={theme.tertiaryText}
          />
          <input
            type="text"
            placeholder="Search library..."
            style={styles.searchInput}
          />
        </div>
      </div>

    </div>
  )
}

const style = (theme, font) => ({
  container: {
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 580,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 28,
    color: theme.actionText,
    ...font.regular,

    textAlign: 'center',
  },

  searchContainer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,

    backgroundColor: theme.secondaryBackground,
    borderRadius: 15,
    padding: '20px 15px',
  },
  searchInput: {
    flex: 1,

    borderWidth: 0,
    color: theme.actionText,
    fontSize: 18,
    fontWeight: 700,
    backgroundColor: theme.secondaryBackground,

    outline: 'none',
    boxSizing: 'border-box',
  }
})
