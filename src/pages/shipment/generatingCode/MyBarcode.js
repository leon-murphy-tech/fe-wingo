import JsBarcode from "jsbarcode";
import React from "react";
import {
    View,
} from "@react-pdf/renderer";
const canvas = document.createElement("canvas");

const data = {};
// document.querySelector("body").appendChild(canvas);

export default function MyBarcode(props) {
    JsBarcode(data, props.barcode);
    console.log(data);
    JsBarcode(canvas, props.barcode);

  const barWidth = data.encodings[0].options.width;
  const barHeight = data.encodings[0].options.height;
  const barWidthRatio = barWidth / barHeight;
  const realHeight = 30;
  const heightRatio = barHeight / realHeight;
  return (<View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <View
        style={{
            display: "flex",
            flexDirection: "row",
            width: "100px"
        }}
        >
        {data.encodings[0].data.split("").map((bar, index) => {
            return (
            <View
                key={index}
                style={{
                margin: 0,
                width: `${realHeight * barWidthRatio}px`,
                height: `${barHeight / heightRatio}px`,
                backgroundColor: Number(bar) ? "black" : "white"
                }}
            />
            );
            
        })}
        </View>
        <View
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: "100px"
        }}
        >
        {data.encodings[0].data.split("").map((bar, index) => {
            return (
            <View
                key={index}
                style={{
                margin: 0,
                width: `${realHeight * barWidthRatio}px`,
                height: `${barHeight / heightRatio}px`,
                backgroundColor: Number(bar) ? "black" : "white"
                }}
            />
            );
            
        })}
        </View>
        <View
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: "100px"
        }}
        >
        {data.encodings[0].data.split("").map((bar, index) => {
            return (
            <View
                key={index}
                style={{
                margin: 0,
                width: `${realHeight * barWidthRatio}px`,
                height: `${barHeight / heightRatio}px`,
                backgroundColor: Number(bar) ? "black" : "white"
                }}
            />
            );
            
        })}
        </View>
    </View>
  );
}
