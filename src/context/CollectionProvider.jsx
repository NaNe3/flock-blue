import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CollectionContext = createContext();

export default function CollectionProvider({ 
  children 
}) {
  const [collections, setCollections] = useState(null);
  const [collectionItems, setCollectionItems] = useState({})

  useEffect(() => {
    if (!collections) return;
    const newCollectionItems = {};
    collections?.forEach(collection => {
      if (!collectionItems[collection.collection_id]) {
        newCollectionItems[collection.collection_id] = []
      }
    });
    setCollectionItems(prevItems => ({ ...prevItems, ...newCollectionItems }));
  }, [collections])

  const contextValue = useMemo(() => ({
    collections,
    setCollections,
    collectionItems,
    setCollectionItems,
  }), [collections, collectionItems]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => {
  return useContext(CollectionContext)
}