import { useMemo } from "react"

export default function Spinner() {
  const { theme } = useTheme()
  const styles = useMemo(() => style(theme), [theme])

  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
    </div>
  )
}

const style = (theme) => ({
  container: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 40 
  },
  spinner: {
    width: 36, 
    height: 36, 
    border: `4px solid ${theme.secondaryBackground}`,
    borderTop: `4px solid ${theme.primaryText}`, 
    borderRadius: '50%',
    animation: 'spin 1s linear infinite' 
  }
})