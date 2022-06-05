import { ESP32_CAM_URI } from "../config";

const imageUrl = ESP32_CAM_URI + "/capture";

export const captureImage = async (
  setBase64image: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null | undefined>
  >
) => {
  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();
  const reader = new FileReader();
  reader.readAsDataURL(imageBlob);
  reader.onloadend = async () => {
    const base64image = reader.result;
    setBase64image(base64image);
  };
  return { response: "The image was fetched" };
};
