import { constants } from "../../utility/colors";

import AuxiliaryColumn from "../AuxiliaryColumn";

export default function OverviewLeftColumn() {

  return (
    <AuxiliaryColumn>
      {/* <div style={styles.statisticsContainer}>
        <p style={styles.statContainer}>
          <HugeiconsIcon
            icon={ZapIcon}
            color={constants.orange}
            size={20}
          />
          <p style={styles.statText}>14 days studied</p>
        </p>
      </div> */}
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

  searchContainer: {
    borderBottom: '1px solid #333',
    // borderRadius: 50,
    padding: 12,

    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ccc',
    fontSize: 16,
    fontWeight: 700,
  },

  statisticsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-start',
    paddingLeft: 15,
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