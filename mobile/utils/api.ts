import axios from "axios";
import { SERVER_URI } from "../config";

interface saveFaceAPIRequest {
  face: string | ArrayBuffer;
  name: string;
}

interface recognizeFaceAPIRequest {
  face: string | ArrayBuffer | null | undefined;
}

export const recognizeFaceAPI = async ({ face }: recognizeFaceAPIRequest) => {
  const { data } = await axios.post(SERVER_URI + "/api/face-recognition", {
    face,
  });
  return data;
};

export const saveFaceAPI = async ({ face, name }: saveFaceAPIRequest) => {
  const { data } = await axios.post(SERVER_URI + "/api/save-face", {
    face,
    name,
  });
  return data;
};
