import React from "react";
import { Document, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
  },
});

function QRCodePage() {
  return (
      <View style={styles.view}>
      </View>
  );
}

function QRCodeDocument({ ids }) {
  return (
    <Document>
      {ids.map((id) => (
        <QRCodePage id={id} key={id}/>
      ))}
    </Document>
  );
}

export default QRCodeDocument;
