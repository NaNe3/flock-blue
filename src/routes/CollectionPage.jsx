import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import LinkedReferenceComplex from "../components/Collection/LinkedReferenceComplex";
import CollectionActionBar from "../components/Collection/CollectionActionBar";
import SocialLeftColumn from "../components/Social/SocialLeftColumn"
import SimpleHeader from "../components/SimpleHeader";

import { getCollectionItemsByCollectionId } from "../utility/db-collection";

import { useCollection } from "../context/CollectionProvider";
import { useDashboard } from "../context/DashboardProvider";
import { useMedic } from "../context/MedicProvider";
import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function CollectionPage() {
  const { collectionId } = useParams();

  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);
  
  const { collections, collectionItems } = useCollection();
  const { dashboard, setDashboard } = useDashboard();
  const { publishError } = useMedic();

  const [items, setItems] = useState([]);
  const [filterOption, setFilterOption] = useState("Oldest");

  const collection = useMemo(() => {
    return collections?.find(item => item.collection_id === parseInt(collectionId));
  }, [collections, collectionId]);
  
  useEffect(() => {
    if (dashboard.width !== 1100) {
      setDashboard((prev) => ({
        ...prev,
        width: 1100
      }))
    }

    init();
  }, []);

  const init = async () => {
    if (!collectionItems[collectionId] || collectionItems[collectionId]?.length === 0) {
      const { data, error } = await getCollectionItemsByCollectionId(collectionId);

      if (error) {
        publishError({
          message: 'Failed to fetch items',
          reason: error
        });
      } else {
        setItems(data);
      }
    } else {
      setItems(collectionItems[collectionId]);
    }
  }

  return (
    <div style={styles.container}>
      <SocialLeftColumn />
      <div style={styles.contentContainer}>
        <SimpleHeader top={30} />
        <div style={styles.header}>
          <div className="hover-expand">
            <p style={styles.collectionEmoji}>{collection?.emoji}</p>
          </div>
          <p style={styles.collectionTitle}>{collection?.name}</p>
          <p style={styles.collectionItemCount}>{collection?.item_count} item{collection?.item_count !== 1 && 's'}</p>
        </div>

        <CollectionActionBar 
          collection_id={collectionId}
          filterOption={filterOption} 
          setFilterOption={setFilterOption} 

          // handleEmojiPress={handleEmojiPress}
          // handleNamePress={handleNamePress}
        />

        <div style={styles.itemsContent}>
          {items.map((item) => (
            <LinkedReferenceComplex
              key={`collection-item-${item.collection_item_id}`}
              location={item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    display: 'flex',
    minHeight: '101vh',
    width: '100%',

    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    maxWidth: 800,
    padding: '30px 20px',

    flexDirection: 'column',
    display: 'flex',
    gap: 20,
  },
  content: {
    padding: '20px 0',
  },
  itemsContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 30,
    padding: 10,
  },

  header: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 100,
  },
  collectionEmoji: {
    fontSize: 80,
    color: theme.primaryText,
  },
  collectionTitle: {
    fontSize: 24,
    paddingHorizontal: 30,
    color: theme.primaryText,
    marginBottom: 10,
    ...font.bold
  },
  collectionItemCount: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.regular,

    marginBottom: 60,
  },
})
