import { useEffect, useState } from "react";
import { UserWarning01Icon } from "@hugeicons-pro/core-solid-rounded";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocation } from "react-router-dom";

import { useHolos } from "../context/HolosProvider";

import FlockBlock from "../components/FlockBlock";

import "./Invite.css";
import { getGroupFromInviteCode } from "../utility/db-groups";
import Avatar from "../components/Avatar";
import BasicButton from "../components/BasicButton";
import FadeInView from "../components/FadeInView";

export default function Invite() {
  const { color } = useHolos();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);

  const [group, setGroup] = useState(null);
  // const linked = useRef(false);

  useEffect(() => {
    const init = async () => {
      const [junk, path, groupInviteCode] = location.pathname.split('/');
      const { data } = await getGroupFromInviteCode({ inviteCode: groupInviteCode });

      setGroup(data);
      setLoading(false);
    }

    getDevice();
    init();
  }, []);

  const getDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setType("android");
      // if (!params.group && !params.user && !linked.current) {
      //   window.location.href = `https://play.google.com/store/apps/details?id=com.flock.groupstudy`;
      //   linked.current = true;
      // }
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setType("ios");
      // if (!params.group && !params.user && !linked.current) {
      //   window.location.href = `https://apps.apple.com/us/app/flock-group-study/id6744551484`;
      //   linked.current = true;
      // }
    } else {
      setType("other");
    }
  }

  return (
    <div className="full-screen invite-container">
      {loading && (
        <FlockBlock 
          color={color} 
          girth={100}
        />
      )}
      <div>
        {group && (
          <FadeInView style={styles.content}>
            <Avatar
              imagePath={group.group_image}
              style={styles.avatar}
            />
            <p style={styles.subtitle}>you've been invited</p>
            <h1 style={styles.title}>{group.group_name}</h1>
            
            <BasicButton
              text="join group"
              style={styles.button}

              onClick={() => {}}
            />
          </FadeInView>
        )}
      </div>

      {!loading && !group && (
        <div>
          <HugeiconsIcon 
            icon={UserWarning01Icon}
            width={80} 
            height={80} 
            color={color}
          />
          <p style={{ marginTop: 20, fontSize: 22, fontWeight: 600, color: "#0a0a0a" }}>
            This invite link is invalid or has expired.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    border: '1px solid #333',
    borderRadius: 20,
    padding: '40px 10px',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#aaa",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",

    maxWidth: 350,
    marginBottom: 140,
    textAlign: "center",
  },

  button: {
    fontSize: 18,
    padding: '15px 20px',
  }
};
