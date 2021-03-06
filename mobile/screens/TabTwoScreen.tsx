import { useState } from "react";
import { Image, StyleSheet, TouchableHighlight, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { captureImage } from "../utils/esp32";
import { saveFaceAPI } from "../utils/api";

export default function AddFace({ navigation }: RootTabScreenProps<"TabOne">) {
  const [face, setFace] = useState<string | ArrayBuffer | null>();
  const [name, setName] = useState<string>();

  const sendFace = async () => {
    if (!face) {
      console.warn("Click the box to capture a face");
      return;
    }
    if (!name) {
      console.warn("Enter the name of the person in the text field");
      return;
    }
    console.log("Saving the new face...");
    const { response, errors } = await saveFaceAPI({ face, name });
    if (errors) {
      console.warn(errors);
      return;
    }
    console.warn(response);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.image}
        onPress={() => captureImage(setFace)}
      >
        <Image source={{ uri: String(face) }} style={styles.image} />
      </TouchableHighlight>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter the name here"
      />
      <TouchableHighlight style={styles.button} onPress={sendFace}>
        <Text style={styles.text}>Save as a known Face!</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 100,
    backgroundColor: "#371B58",
  },
  image: {
    width: 320,
    height: 240,
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "#7858A6",
    borderRadius: 5,
  },
  input: {
    width: 320,
    height: 100,
    backgroundColor: "#4C3575",
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    marginVertical: 30,
    padding: 10,
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
