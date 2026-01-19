import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { URLtoLocation } from "../utility/read"

import Chapter from "./Chapter"
import ChapterSidebar from "../components/Library/ChapterSidebar"

import { useTheme } from "../context/ThemeProvider"

export default function ChapterDashboard() {
  const parameters = useParams()
  const location = useMemo(() => URLtoLocation(parameters), [parameters])

  const { theme } = useTheme();
  const styles = useMemo(() => style(theme), [theme]);

  const [sidebar, setSidebar] = useState({
    open: false,
    route: null,
  })

  return (
    <div style={styles.container}>
      <div style={styles.left} />
      <Chapter 
        location={location}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <ChapterSidebar 
        location={location} 
        sidebar={sidebar} 
        setSidebar={setSidebar}
      />
    </div>
  )
}

const style = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,

    minHeight: '101vh',
    width: '100%',

    borderLeft: `1px solid ${theme.primaryBorder}`,
  },

  left: {
  },

  sidebarRight: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
