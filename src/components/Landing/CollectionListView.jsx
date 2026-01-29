import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowRight01Icon, ArrowRight02Icon, PlusMinus01SolidRounded, RightAngleIcon } from "@hugeicons-pro/core-solid-rounded";

import { useCollection } from "../../context/CollectionProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useModal } from "../../context/ModalProvider";
import { useFont } from "../../context/FontProvider";

export default function CollectionListView({ 
  onCollectionPress=null,
  mode = 'default',
  selected = [],
}) {
  const navigate = useNavigate();

  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { collections } = useCollection()
  const { handleModalClose } = useModal()

  const createNewCollection = () => {
    handleModalClose();
    if (mode === 'select') {
      setTimeout(() => {
        navigate('CreateCollectionPage');
      }, 400);
    } else {
      navigate('CreateCollectionPage');
    }
  }

  const handleCollectionPress = (collectionId) => {
    if (onCollectionPress) {
      onCollectionPress(collectionId);
    } else {
      navigate(`/collection/${collectionId}`);
    }
  }

  return (
    <div style={styles.container}>
      <div
        className="hover-background"
        style={styles.collectionItem} 
        onClick={createNewCollection}
      >
        <div style={styles.collectionContent}>
          <div style={styles.emojiContainer}>
            <HugeiconsIcon
              icon={Add01Icon}
              size={20}
              color={theme.actionText}
            />
          </div>
          <div style={styles.collectionInformation}>
            <span style={styles.collectionTitle}>New collection</span>
          </div>
        </div>

      </div>
      {collections.map((collection, index) => (
        <div
          className="hover-background"
          key={`collection-${collection.collection_id}`}
          style={styles.collectionItem} 
          onClick={() => handleCollectionPress(collection.collection_id)}
        >
          <div style={styles.collectionContent}>
            <div style={styles.emojiContainer}>
              <span style={styles.emoji}>{collection.emoji}</span>
            </div>
            <div style={styles.collectionInformation}>
              <span style={styles.collectionTitle}>{collection.name}</span>
              <span style={styles.collectionItemCount}>{collection.item_count} item{collection.item_count !== 1 && 's'}</span>
            </div>
          </div>
          {
            mode === 'default' 
              ? <></>
              : selected.includes(collection.collection_id) 
                ? <div style={{...styles.icon, color: theme.blue}}>✓</div>
                : <div style={{...styles.icon, color: theme.tertiaryText}}>○</div>
          }
        </div>
      ))}
    </div>
  );
}

function style(theme, font) {
  return {
    container: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },

    collectionItem: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',

      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 15px',
      cursor: 'pointer',
      textAlign: 'left',
    },
    collectionContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '15px',
    },
    emojiContainer: {
      width: '38px',
      height: '43px',
      borderRadius: '7px',
      backgroundColor: theme.secondaryBackground,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emoji: { 
      fontSize: 16
    },
    collectionInformation: {
      display: 'flex',
      flexDirection: 'column',
    },
    collectionTitle: {
      fontSize: 16,
      color: theme.secondaryText,
      ...font.regular
    },
    collectionItemCount: {
      fontSize: 14,
      color: theme.tertiaryText,
      ...font.bold,

      marginTop: -3,
    },
    icon: {
      fontSize: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }
}