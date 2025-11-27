import { supabase } from "./supabase";

const prepImageForUpload = async (image, height, width) => {
  let arrayBuffer;
  if (image instanceof File || image instanceof Blob) {
    arrayBuffer = await image.arrayBuffer();
  } else {
    const response = await fetch(image);
    arrayBuffer = await response.arrayBuffer();
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${crypto.randomUUID()}.jpg`;
  return { fileName, arrayBuffer }
}

const uploadImage = async (path, fileName, arrayBuffer) => {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .upload(`${path}${fileName}`, new Uint8Array(arrayBuffer), {
      contentType: 'image/jpeg',
    })

  return { data, error }
}

export const deleteImage = async (path) => {
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .remove([path])

  return { data, error }
}

export const uploadAvatar = async (image, user_id) => {
  if (!image) {
    console.error('No image provided')
    return
  }

  try {
    const { fileName, arrayBuffer } = await prepImageForUpload(image, 200, 200);
    const { data, error } = await uploadImage('public/profile/', fileName, arrayBuffer);

    if (error) {
      console.error('Error uploading image:', error)
      return { error: error }
    } else {
      console.log('Image uploaded successfully:', data)

      const { error: updateTableError } = await updateAvatarForUser(data.path, user_id)
      if (updateTableError) {
        console.error('Error updating avatar for user:', updateTableError)
        return { error: updateTableError }
      }

      return { data: data }
    }
  } catch (error) {
    console.error('Error processing image:', error)
    return { error: error }
  }
}

export const updateAvatarForUser = async (avatar_path, user_id) => {
  console.log('UPDATING!!!!!!!!!!!!!!!!!', avatar_path, user_id)
  const { error } = await supabase
    .from("user")
    .update({ avatar_path: avatar_path })
    .eq("id", user_id);

    if (error) {
      console.error('Error updating avatar for user:', error)
      return { error: error }
    }

    return { error: false }
}