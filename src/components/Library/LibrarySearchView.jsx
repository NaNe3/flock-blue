import { useEffect } from "react"
import { useDashboard } from "../../context/DashboardProvider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons-pro/core-solid-rounded";

export default function LibrarySearchView() {
  const { setDashboard } = useDashboard();
  
  useEffect(() => {
    setDashboard((prev) => ({
      ...prev,
      width: 800
    }))
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <h2 style={styles.title}>Hello Eli, what are we studying today?</h2>
        <div style={styles.searchContainer}>
          <HugeiconsIcon
            icon={Search01Icon}
            size={24}
            color="#777"
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

const styles = {
  container: {
    width: '100%',
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
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
  },

  searchContainer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,

    backgroundColor: '#222',
    borderRadius: 15,
    padding: '20px 15px',
  },
  searchInput: {
    flex: 1,

    borderWidth: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    backgroundColor: '#222',

    outline: 'none',
    boxSizing: 'border-box',
  }
}