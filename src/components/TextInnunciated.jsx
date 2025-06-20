import { useMemo } from "react"
import { lightenColor } from "../utility/colors"

export default function TextInnunciated({ text, color }) {
  const colors = useMemo(() => {
    return {
      primary: color,
      secondary: lightenColor(color, 90),
    }
  }, [color])

  return (
    <div style={{...styles.innunciated, backgroundColor: colors.secondary }}>
      <p style={{...styles.text, color: colors.primary }}>{text}</p>
    </div>
  )
}

const styles = {
  innunciated: {
    borderRadius: 15,
    padding: '7px 10px',

    display: "inline-block",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
  }
}