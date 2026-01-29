import { useMemo } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { AppStoreIcon, PlayStoreIcon } from "@hugeicons-pro/core-solid-rounded";

import RainbowButton from "./RainbowButton";

import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function StoreActionRow({ color='#0ba3ff' }) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const handleOpenAppleStore = () => {
    window.open('https://apps.apple.com/us/app/flock-study-together/id6744551484', '_blank');
  }

  const handleOpenPlayStore = () => {
    window.open('https://play.google.com/store/apps/details?id=io.lingerlonger.flock&hl=en_US', '_blank');
  }

  return (
    <div className='landing-action-row'>
      <RainbowButton
        onClick={handleOpenAppleStore}
        color1={color}
        color2={color}
      >
        <HugeiconsIcon
          icon={AppStoreIcon}
          size={24}
          color={theme.primaryBackground}
        />
        <p style={styles.storeItem}>try on iOS</p>
      </RainbowButton>
      <RainbowButton
        onClick={handleOpenPlayStore}
        color1={color}
        color2={color}
      >
        <HugeiconsIcon
          icon={PlayStoreIcon}
          size={24}
          color={theme.primaryBackground}
        />
        <p style={styles.storeItem}>try on android</p>
      </RainbowButton>
    </div>
  )
}

const style = (theme, font) => ({
  storeItem: {
    fontSize: 22,
    color: theme.primaryBackground,
    ...font.bold,    

    textAlign: 'center',
    lineHeight: 1,
    marginLeft: 5,
  }
})