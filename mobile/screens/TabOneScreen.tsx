import { useState } from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { recognizeFaceAPI } from "../utils/api";
import { captureImage } from "../utils/esp32";

export default function RecognizeFaces({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [img, setImg] = useState<string | ArrayBuffer | null>();
  const [name, setName] = useState("");

  const recognizeFace = async () => {
    const { response } = await captureImage(setImg);
    if (!response) {
      console.warn("Error Fetching the image from ESP32-CAM");
      return;
    }

    const { faces } = await recognizeFaceAPI({ face: img });
    console.log(faces);
    setName(faces[0]);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: String(img) }} />
      <TouchableHighlight style={styles.button} onPress={recognizeFace}>
        <Text style={styles.text}>Work Please!</Text>
      </TouchableHighlight>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
    backgroundColor: "#371B58",
  },
  image: {
    width: 320,
    height: 240,
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "#7858A6",
    marginBottom: 30,
    borderRadius: 5,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C3575",
    width: 320,
    height: 100,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
  camera: {
    flex: 10,
    width: "100%",
  },
});
