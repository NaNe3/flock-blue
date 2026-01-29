import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCollectionsByUserId } from "../utility/db-collection";

import { useHolos } from "./HolosProvider";
import { useMedic } from "./MedicProvider";

const CollectionContext = createContext();

export default function CollectionProvider({ 
  children 
}) {
  const [collections, setCollections] = useState(null);
  const [collectionItems, setCollectionItems] = useState({})

  const { user } = useHolos()
  const { publishError } = useMedic()

  useEffect(() => {
    const init = async () => {
      // get collections
      const { data, error } = await getCollectionsByUserId({ userId: user?.id });
    
      if (!error) {
        setCollections(data);
      } else {
        publishError({
          message: "Error fetching collections",
          details: error
        })
      }
    }

    init()
  }, [])
  
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