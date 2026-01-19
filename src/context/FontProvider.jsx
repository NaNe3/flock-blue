import { createContext, useContext, useState } from "react";

const FontContext = createContext()

export default function FontProvider({ children }) {
  const [font, setFont] = useState({
    regular: { fontFamily: 'nunito', fontWeight: 700 },
    bold: { fontFamily: 'nunito', fontWeight: 800 },
    boldItalic: { fontFamily: 'nunito', fontWeight: 800, fontStyle: 'italic' },
  })
  const [currentFont, setCurrentFont] = useState('nunito')

  const available = ["nunito", "opendyslexic"]

  const changeFont = async (newFont) => {
    // await setLocallyStoredVariable('user_font', newFont)
    setCurrentFont(newFont)
    setFont({
      regular: { fontFamily: newFont, fontWeight: 500 },
      bold: { fontFamily: newFont, fontWeight: 'bold' },
      boldItalic: { fontFamily: newFont, fontWeight: 'bold', fontStyle: 'italic' },
    });
  }

  // useEffect(() => {
  //   const init = async () => {
  //     // await setLocallyStoredVariable('user_font', 'nunito') // Ensure default font is set
  //     const font = await getLocallyStoredVariable('user_font')
  //     changeFont(font ?? 'nunito')
  //   }

  //   init()
  // }, [])

  return <FontContext.Provider value={{ font, currentFont, changeFont, available }}>{children}</FontContext.Provider>
}

export const useFont = () => {
  return useContext(FontContext)
}