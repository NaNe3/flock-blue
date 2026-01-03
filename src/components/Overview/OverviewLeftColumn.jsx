import { HugeiconsIcon } from "@hugeicons/react";
import { constants } from "../../utility/colors";

import AuxiliaryColumn from "../AuxiliaryColumn";
import { ZapIcon } from "@hugeicons-pro/core-solid-rounded";
import BookCard from "../BookCard";
import { useHolos } from "../../context/HolosProvider";
import Avatar from "../Avatar";

export default function OverviewLeftColumn() {
  const { groups } = useHolos()

  return (
    <AuxiliaryColumn>
      <div style={styles.statisticsContainer}>
        <p style={styles.statContainer}>
          <HugeiconsIcon
            icon={ZapIcon}
            color={constants.orange}
            size={20}
          />
          <p style={styles.statText}>14 <span style={styles.statSpecialText}>days studied</span></p>
        </p>
      </div>
      <div style={styles.contentSection}>
        <div style={styles.contentRow}>
          <BookCard
            text="Come Follow Me"
            width={40}
            colors={{
              background: constants.maroon,
              text: constants.orange,
            }}
          />
          <p style={styles.contentRowTitle}>Come Follow Me</p>
        </div>
      </div>
      {groups.map((group) => (
        <div 
          className="hover-background"
          key={`group-${group.group_id}`}
          style={styles.contentRow}
          onClick={() => handleGroupClick({ groupId: group.group_id })}
        >
          <Avatar
            imagePath={group.group_image}
            style={styles.avatar}
          />
          <p style={styles.contentName}>{group.group_name}</p>
        </div>
      ))}
    </AuxiliaryColumn>
  )
}

const styles = {
  containerHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 800,
    padding: '15px 25px',
  },

  statisticsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingBottom: 15,

    borderBottom: '1px solid #333',
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  statText: {
    color: constants.orange,
    fontSize: 16,
    fontWeight: 800,
  },
  statSpecialText: {
    opacity: 0.8,
  },

  contentSection: {
    padding: '0px 15px',
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contentRowTitle: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 700,
  },

  groupColumnContainer: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
  },
  groupContainer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    padding: '10px 15px',
  },
  avatar: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
  groupName: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
  }
}