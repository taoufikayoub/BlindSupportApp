import React from "react";
import { WebView } from "react-native-webview";

const Stream = () => {
  return (
    // @ts-ignore
    <WebView
      source={{
        uri: "http://192.168.1.120:81/stream",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate",
          "Upgrade-Insecure-Requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0",
        },
      }}
      style={{ flex: 1 }}
    />
  );
};

export default Stream;
