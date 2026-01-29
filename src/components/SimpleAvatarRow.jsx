import { useMemo } from "react";

import FadeInView from "./FadeInView";
import Avatar from "./Avatar";

import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function SimpleAvatarRow({ people, text }) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])

  return (
    <div style={styles.avatarRow}>
      {people && people?.length > 0 && (
        <FadeInView style={styles.content}>
          {people.map((person, index) => (
            <div
              key={`avatar-${person.avatar_path}-${index}`}
              style={{...styles.avatarContainer, ...(index !== 0 && { marginLeft: -8 })}} 
            >
              <Avatar
                imagePath={person.avatar_path}
                type="profile"
                style={styles.avatar}
              />
            </div>
          ))}
        </FadeInView>
      )}
      {text && (
        <p style={styles.simpleText}>{text}</p>
      )}
    </div>
  )
}

const style = (theme, font) => ({
  avatarRow: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    
  },
  simpleText: {
    fontSize: 16,
    color: theme.tertiaryText,
    ...font.regular
  },
  avatarContainer: {
    borderRadius: 20,
    overflow: 'hidden',

    // border: `4px solid ${theme.primaryBackground}`,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 15,
  }
})