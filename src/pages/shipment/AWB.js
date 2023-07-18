// Created at 7/15/2023
// Created by Danylo

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import MyBarcode from './generatingCode/MyBarcode'
import dhlIcon from 'assets/images/DHL.png'
// import PropTypes from 'prop-types';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        border: "1px solid black",
        margin: 10
    },
    header: {
        display: "flex",
        height: "80px",
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 0
    },
    headerIMG: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "150px"
    },
    sender: {
        backgroundColor: "#417bd2",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "30px",
        marginBottom: "5px"
    },
    senderText: {
        color: "white",
        fontSize: "10px"
    },
    senderPanel: {
        display: "flex",
        flexDirection: "row"
    },
    senderTitles: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        fontSize: "10px",
        fontStyle: "bold",
        width: "20%",
        marginBottom: "15px",
        marginTop: "15px"
    },
    senderTitle: {
        marginTop: "5px",
        marginBottom: "5px"
    },
    senderContents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontSize: "10px",
        fontStyle: "bold",
        width: "35%",
        marginBottom: "15px",
        marginTop: "15px"
    },
    senderContent: {
        marginTop: "3.7px",
        marginBottom: "3.7px",
        marginLeft: "7px",
        height: "14px"
    },
    senderEnds: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        fontSize: "10px",
        fontStyle: "bold",
        width: "20%",
        marginBottom: "15px",
        marginTop: "15px"
    },
    senderEnd: {
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "7px"
    },
    senderEndsContents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        fontSize: "10px",
        fontStyle: "bold",
        width: "25%",
        marginBottom: "15px",
        marginTop: "15px",
    },
    senderEndContent: {
        marginTop: "2px",
        marginBottom: "3px",
        marginLeft: "7px",
        height: "15px"
    },
    barcode: {
        width: "30%",
        marginTop: "20px"
    },
    fontSpc: {
        textAlign: "center",
        fontSize: "10px"
    },
});


export default function ReactPDF(props) {
    return (
        <Document>
            {props.packageInfo.map((item, index) =>
                <Page size="B5" style={styles.page} key={ index }>
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <View style-={styles.headerIMG}>
                                <Image src={ dhlIcon } alt="dhl" style={{width: 120, height: 30, marginTop: 22, marginRight: 10}}/>
                            </View>
                            <View style={styles.barcode}>
                                <MyBarcode barcode={ item.hawb ? item.hawb : "1" }/>
                                <Text style={styles.fontSpc}>{ item.hawb ? item.hawb : "1" }</Text>
                                <Text style={styles.fontSpc}>DHL Express</Text>
                            </View>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, display: "flex", justifyContent: "center", flexDirection: "row"}}>
                            <Text style={{fontSize: "25px", textAlign: "center", paddingTop: "8px", paddingBottom: "8px", fontWeight: "bold"}}>AWB NUMBER</Text>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, display: "flex", justifyContent: "center", flexDirection: "row"}}>
                            <Text style={{fontSize: "40px", padding: "15px", fontWeight: "bold"}}>{ props.shipment.hawb ? props.shipment.hawb : "1" }</Text>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "#e6b800", padding: "5px"}}>
                            <Text>COUNTRY</Text>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, display: "flex", justifyContent: "center", flexDirection: "row", padding: "15px"}}>
                            <Text style={{fontSize: "25px"}}>United States</Text>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, padding: "10px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Text style={{fontStyle: "italic", width: "100%", marginLeft: "20PX"}}>Pes no:</Text>
                            <Text style={{fontSize: "40px", textAlign: "center", letterSpacing: "10px", marginRight: "245px"}}>{ index+1 } / { props.packageInfo.length }</Text>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, backgroundColor: "#e6b800", padding: "5px"}}>
                            <Text style={{fontSize: "15px"}}>Sender: </Text>
                        </View>
                        <View style={styles.senderPanel}>
                            <View style={styles.senderTitles}>
                                <Text style={styles.senderTitle}>Company:</Text>
                                <Text style={styles.senderTitle}>Contact name:</Text>
                                <Text style={styles.senderTitle}>Country:</Text>
                            </View>
                            <View style={styles.senderContents}>
                                <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.company : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.name : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.country : "" }</Text>
                            </View>
                        </View>
                        <View style={{borderWidth: "1px", borderStyle: "solid", borderLeft: 0, borderRight: 0, backgroundColor: "#e6b800", padding: "5px"}}>
                            <Text style={{fontSize: "15px"}}>Consignee: </Text>
                        </View>
                        <View style={styles.senderPanel}>
                            <View style={styles.senderTitles}>
                                <Text style={styles.senderTitle}>Company:</Text>
                                <Text style={styles.senderTitle}>Address1:</Text>
                                <Text style={styles.senderTitle}>Address2:</Text>
                                <Text style={styles.senderTitle}>City:</Text>
                                <Text style={styles.senderTitle}>Country:</Text>
                                <Text style={styles.senderTitle}>Contact name:</Text>
                            </View>
                            <View style={styles.senderContents}>
                                <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.company : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.address_first : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.address_second : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.city : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.country : "" }</Text>
                                <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.name : "" }</Text>
                            </View>
                            <View style={styles.senderEnds}>
                                <Text style={styles.senderEnd}>State:</Text>
                                <Text style={styles.senderEnd}>Postal Code:</Text>
                                <Text style={styles.senderEnd}>Phone number:</Text>
                            </View>
                            <View style={styles.senderEndsContents}>
                                <Text style={styles.senderEndContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.state : "" }</Text>
                                <Text style={styles.senderEndContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.zipCode : "" }</Text>
                                <Text style={styles.senderEndContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.phone : "" }</Text>
                            </View>
                        </View>
                    </View>
                </Page>  
            )}
        </Document>
    )
}