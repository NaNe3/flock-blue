import { createContext, useContext, useMemo, useState } from "react";
import { themes } from "../utility/themes";

const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [theme, setTheme] = useState(themes[currentTheme])

  const available = ["light", "dark", "cobalt", "onyx", "sepia"]

  useMemo(() => {
    document.documentElement.style.setProperty('--hover-bg-color', theme.contrast || '#f0f0f0');
    document.documentElement.style.setProperty('background-color', theme.primaryBackground || '#f0f0f0');
  }, [currentTheme])

  const changeTheme = async (theme) => {
    setCurrentTheme(theme)
    setTheme(themes[theme])
  }

  // useEffect(() => {
  //   const init = async () => {
  //     setCurrentTheme(theme ?? 'light')
  //     setTheme(themes[theme ?? 'light'])

  //     // const fakeTheme = 'onyx'
  //     // setCurrentTheme(fakeTheme)
  //     // setTheme(themes[fakeTheme])
  //   }

  //   init()
  // }, [])

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, available }}>
      <div style={{
        backgroundColor: theme.primaryBackground,
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}