import { HugeiconsIcon } from "@hugeicons/react";
import { AppStoreIcon, PlayStoreIcon } from "@hugeicons-pro/core-solid-rounded";

import RainbowButton from "./RainbowButton";

import { useHolos } from "../context/HolosProvider";

export default function StoreActionRow() {
  const { color } = useHolos();

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
        color1={'#bbb'}
        color2={color}
      >
        <HugeiconsIcon
          icon={AppStoreIcon}
          size={24}
          color="#0a0a0a"
        />
        <p style={styles.storeItem}>try on iOS</p>
      </RainbowButton>
      <RainbowButton
        onClick={handleOpenPlayStore}
        color1={color}
        color2={'#bbb'}
      >
        <HugeiconsIcon
          icon={PlayStoreIcon}
          size={24}
          color="#0a0a0a"
        />
        <p style={styles.storeItem}>try on android</p>
      </RainbowButton>
    </div>
  )
}

const styles = {
  storeItem: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
    color: '#0a0a0a',
    textAlign: 'center',
    marginLeft: 5,
  }
}
