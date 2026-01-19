import { createContext, useContext, useState } from "react";
import { themes } from "../utility/themes";

const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('onyx')
  const [theme, setTheme] = useState(themes[currentTheme])

  const available = ["light", "dark", "cobalt", "onyx", "sepia"]

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