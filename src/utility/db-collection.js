import { supabase } from "./supabase";

import { supabaseCollection, supabaseCollectionItemFull } from "./format";

export const getCollectionsByUserId = async ({ userId }) => {
  const { data, error } = await supabase
    .from('user_collection')
    .select(supabaseCollection)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  return { data: data.map(item => item.collection), error }
}

export const getCollectionItemsByCollectionId = async (collection_id) => {
  const { data, error } = await supabase
    .from('collection_item')
    .select(supabaseCollectionItemFull)
    .eq('collection_id', collection_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching collection items:', error);
    return { data: [], error };
  }

  return { data, error: null };
}
