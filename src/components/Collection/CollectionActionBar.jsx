import { useMemo } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { FilterAddIcon, RepairIcon } from "@hugeicons-pro/core-solid-rounded";

import { useModal } from "../../context/ModalProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useFont } from "../../context/FontProvider";

export default function CollectionActionBar({ 
  filterOption, 
  setFilterOption, 
  collection_id,

  handleEmojiPress,
  handleNamePress
}) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { handleModalOpen } = useModal();

  const handleFilterOption = () => {
    // handleModalOpen({ content: 
    //   <CollectionFilterOptionsModal 
    //     filterOption={filterOption} 
    //     setFilterOption={setFilterOption} 
    //   /> 
    // });
  }

  const handleSettingsOpen = () => {
    // handleModalOpen({ content: 
    //   <CollectionPageSettings 
    //     navigation={navigation}
    //     collection_id={collection_id} 
    //     openEmojiModal={handleEmojiPress}
    //     openNameModal={handleNamePress}
    //   />
    // });
  }

  return (
    <div style={styles.horizontalActionBar}>
      <div
        style={styles.horizontalScrollView}
      >
        <div
          style={styles.actionButton}
          onClick={handleFilterOption}
          className="hover-background"
        >
          <HugeiconsIcon
            icon={FilterAddIcon}
            size={18}
            color={theme.primaryText}
          />
          <span style={styles.actionText}>{filterOption}</span>
        </div>
        <div
          style={styles.actionButton}
          onClick={handleSettingsOpen}
          className="hover-background"
        >
          <HugeiconsIcon
            icon={RepairIcon}
            size={18}
            color={theme.primaryText}
          />
          <span style={styles.actionText}>Settings</span>
        </div>
        <div style={{...styles.actionButton, ...styles.disabledAction}}>
          <span style={styles.actionText}>References</span>
        </div>
        <div style={{...styles.actionButton, ...styles.disabledAction}}>
          <span style={styles.actionText}>Media</span>
        </div>
        <div style={{...styles.actionButton, ...styles.disabledAction}}>
          <span style={styles.actionText}>Footnotes</span>
        </div>
      </div>
    </div>
  )
}

function style(theme, font) {
  return {
    horizontalActionBar: {
      height: 40,
    },
    horizontalScrollView: {
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      paddingLeft: 20,
      paddingRight: 20,
      overflowX: 'auto',
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none', // IE and Edge
      WebkitScrollbar: { display: 'none' }, // Chrome, Safari
    },
    horizon: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },

    actionButton: {
      height: 40,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 40,
      border: `2px solid ${theme.primaryBorder}`,
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
      ...font.regular
    },
    actionText: {
      fontSize: 14,
      color: theme.primaryText,
      ...font.regular
    },

    disabledAction: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  }
}