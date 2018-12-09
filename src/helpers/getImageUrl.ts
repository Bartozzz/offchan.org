export const getImageUrl = (uuid: string) => 
  `https://firebasestorage.googleapis.com/v0/b/${process.env.VUE_APP_FIREBASE_STORAGE_BUCKET}/o/images%2F${uuid}?alt=media`