import { useEffect, useMemo, useRef, useState } from "react";
import { useHolos } from "../context/HolosProvider";
import RainbowButton from "../components/RainbowButton";
import { AppStoreIcon, PlayStoreIcon } from "@hugeicons-pro/core-solid-rounded";
import { HugeiconsIcon } from "@hugeicons/react";

import "./Invite.css";
import StoreRow from "../components/StoreRow";
import FlockBlock from "../components/FlockBlock";

export default function Invite() {
  const [type, setType] = useState(null);
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, []);
  const linked = useRef(false);

  const { color } = useHolos();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setType("android");
      if (!params.group && !params.user && !linked.current) {
        window.location.href = `https://play.google.com/store/apps/details?id=com.flock.groupstudy`;
        linked.current = true;
      }
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setType("ios");
      if (!params.group && !params.user && !linked.current) {
        window.location.href = `https://apps.apple.com/us/app/flock-group-study/id6744551484`;
        linked.current = true;
      }
    } else {
      setType("other");
    }
  }, []);

  return (
    <div className="invite-container">
      <div className="full-screen invite-landing">
        <FlockBlock onClick={() => {}} color={color} girth={150} />
        <h1 className="invite-title">you've been invited to study!</h1>
        <p className="invite-subtitle">keep scrolling :D</p>
      </div>
      <div className="full-screen">
        <div className="stepRow">
          <h1>step 1.</h1>
          <h1>take a deeeeeeep breath</h1>

          <h1>step 2.</h1>
          <h1>
            download the flock app through the app store of your choice! Let's
            bolster the kingdom of GOD together!!!
          </h1>
        </div>
        {type === "other" && (
          <StoreRow color1={"#bbb"} color2={color} style={styles.storeRow} />
        )}
        {type === "ios" && (
          <RainbowButton
            onClick={() => {
              window.location.href =
                "https://apps.apple.com/us/app/flock-group-study/id6744551484";
            }}
            color1={"#bbb"}
            color2={color}
          >
            <HugeiconsIcon icon={AppStoreIcon} size={24} color="#0a0a0a" />
            <p style={styles.storeItem}>try on iOS</p>
          </RainbowButton>
        )}
        {type === "android" && (
          <RainbowButton onClick={() => {}} color1={color} color2={"#bbb"}>
            <HugeiconsIcon icon={PlayStoreIcon} size={24} color="#0a0a0a" />
            <p style={styles.storeItem}>try on android</p>
          </RainbowButton>
        )}
      </div>
    </div>
  );
}

const styles = {
  inviteContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  storeItem: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
    color: "#0a0a0a",
    textAlign: "center",
    marginLeft: 5,
  },
};
