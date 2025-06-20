import { HugeiconsIcon } from "@hugeicons/react";
import { AppStoreIcon, PlayStoreIcon } from "@hugeicons-pro/core-solid-rounded";

import RainbowButton from "./RainbowButton";

export default function StoreRow({ color1, color2, style }) {
  return (
    <div className="store-row" style={style}>
      <RainbowButton
        onClick={() => {
          window.location.href =
            "https://apps.apple.com/us/app/flock-group-study/id6744551484";
        }}
        color1={color1}
        color2={color2}
      >
        <HugeiconsIcon icon={AppStoreIcon} size={24} color="#0a0a0a" />
        <p style={styles.storeItem}>try on iOS</p>
      </RainbowButton>
      <RainbowButton onClick={() => {}} color1={color2} color2={color1}>
        <HugeiconsIcon icon={PlayStoreIcon} size={24} color="#0a0a0a" />
        <p style={styles.storeItem}>try on android</p>
      </RainbowButton>
    </div>
  );
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