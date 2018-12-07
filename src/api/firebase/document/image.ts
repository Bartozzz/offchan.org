import { v4 as uuidv4 } from "uuid";
import { storage } from "@/api/firebase";
import { getImageUrl } from "@/helpers/getImageUrl";

export function uploadFile(image: File) {
  const fileName = uuidv4();
  const filePath = getImageUrl(fileName);
  const task = storage.ref(`images/${fileName}`).put(image);

  return {
    fileName,
    filePath,
    task
  };
}
