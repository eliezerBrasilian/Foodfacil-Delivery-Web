import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

class UploadImageService {
  async uploadToFirebaseStorage(imageFile: any) {
    console.log(imageFile);
    try {
      const storageRef = ref(
        storage,
        "/app_resources/salgados/" + imageFile.name
      );

      await uploadBytes(storageRef, imageFile);
      console.log("Imagem enviada com sucesso!");

      const imageUrl = await getDownloadURL(storageRef);
      console.log("URL da imagem:", imageUrl);

      return imageUrl;
    } catch (error: any) {
      return null;
    }
  }
}

export { UploadImageService };
