import { useMemo } from "react";
import { useFont } from "../../context/FontProvider";
import { useHolos } from "../../context/HolosProvider";
import { useTheme } from "../../context/ThemeProvider";
import LogOverview from "./LogOverview";

export default function OverviewPassport() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { user } = useHolos()

  return (
    <div style={{ ...styles.container, backgroundColor: user?.color_id?.color_hex || theme.secondaryBackground }}>
      <h2 style={styles.name}>{user?.full_name}</h2>
      <p style={styles.nameSubtext}>flock study passport</p>
      <div style={styles.streakContainer}>
        <div style={styles.streakText}>{user?.current_streak}</div>
        <p style={styles.streakSubtext}>day{user?.current_streak !== 1 ? 's' : ''} studied</p>
      </div>
      <LogOverview />
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    padding: '20px',
    borderRadius: '20px',
  },
  name: {
    fontSize: '23px',
    color: theme.primaryBackground,
    ...font.bold,

    margin: 0,
  },
  nameSubtext: {
    fontSize: '18px',
    color: theme.primaryBackground,
    ...font.bold,

    opacity: 0.7,
    margin: 0,
  },
  streakContainer: {
    paddingTop: '25px',
    paddingBottom: '35px',
  },
  streakText: {
    fontSize: '64px',
    color: theme.primaryBackground,
    ...font.bold,

    marginTop: '-10px',
  },
  streakSubtext: {
    fontSize: '18px',
    color: theme.primaryBackground,
    ...font.bold,

    marginTop: '-10px',
    opacity: 0.7,
    margin: 0,
  },
})
