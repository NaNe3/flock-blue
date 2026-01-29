import { useMemo } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { Link03Icon } from "@hugeicons-pro/core-solid-rounded";

import FadeInView from "../FadeInView";

import { formatLocation } from "../../utility/format";

import { useFont } from "../../context/FontProvider";
import { useTheme } from "../../context/ThemeProvider";

export default function LinkedReferenceComplex({ navigation, location }) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const reference = useMemo(() => formatLocation(location), [location]);

  const handleReferencePress = () => {
    // link to chapter
    // write functionality to scoll to a specific verse

    navigation.navigate('Chapter', { location, initialVerse: location.verse });
  }

  return (
    <FadeInView 
      className="hover-background"
      onClick={handleReferencePress}
      style={styles.container}
    >
      <div style={styles.linkContentContainer}>
        <HugeiconsIcon
          icon={Link03Icon}
          size={22}
          color={theme.secondaryText}
        />
        <div style={styles.linkContent}>
          <span style={styles.linkText}>{reference}</span>
          <span style={styles.linkDescription}>{location?.work}</span>
        </div>
      </div>
    </FadeInView>
  )
}

function style(theme, font) {
  return {
    container: {
      display: 'flex',
      padding: '15px',
      borderRadius: 12,
    },
    linkContentContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 15,
    },
    linkContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    linkText: {
      fontSize: 16,
      color: theme.primaryText,
      ...font.bold,
    },
    linkDescription: {
      fontSize: 14,
      color: theme.secondaryText,
      ...font.regular,
      marginTop: -2
    },
  }
}