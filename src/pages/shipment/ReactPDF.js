// Created at 7/14/2023
// Created by Danylo

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import MyBarcode from './generatingCode/MyBarcode'
import dhlIcon from 'assets/images/DHL.png'
import qrCode from 'assets/images/qrCode.png'
import tick from 'assets/images/tick.png'
// import PropTypes from 'prop-types';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        border: "1px solid black",
        margin: 10,
        width: "50%"
    },
    header: {
        display: "flex",
        height: "70px",
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 0
    },
    headerTop: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    headerTopTitle: {
        fontSize: "10px",
        fontWeight: "bold",
    },
    headerTopDate: {
        fontSize: "8px",
        marginTop: "8px"
    },
    headerMiddle: {
        width: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
    headerMiddleText: {
        fontSize: "20px",
        color: "white",
        fontWeight: "bold"
    },
    headerIMG: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    sender: {
        backgroundColor: "#417bd2",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "40px",
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
        fontSize: "8px",
        fontStyle: "bold",
        width: "30%"
    },
    senderTitle: {
        marginTop: "3px",
        marginBottom: "3px"
    },
    senderContents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontSize: "8px",
        fontStyle: "bold",
        width: "45%"
    },
    senderContent: {
        marginTop: "3px",
        marginBottom: "3px",
        marginLeft: "7px"
    },
    senderEnds: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        fontSize: "8px",
        fontStyle: "bold",
        width: "10%"
    },
    senderEnd: {
        marginTop: "3px",
        marginBottom: "3px",
        marginLeft: "7px"
    },
    senderEndsContents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        fontSize: "8px",
        fontStyle: "bold",
        width: "15%"
    },
    senderEndContent: {
        marginTop: "3px",
        marginBottom: "3px",
        marginLeft: "7px"
    },
    Reciever: {
        backgroundColor: "#417bd2",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "40px",
        marginBottom: "5px",
        marginTop: "8px"
    },
    line: {
        height: "2px",
        backgroundColor: "#ff3333",
        marginTop: "10px",
        marginBottom: "10px"
    },
    code: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: "20px",
        marginLeft: "20px"
    },
    barcode: {
        width: "45%",
    },
    fontSpc: {
        textAlign: "center",
        fontSize: "8px"
    },
    country: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        width: "33%",
        height: "25px"
    },
    // table stylesheet
    table: {  
        flexDirection: "row",
        marginTop: "10px",
        marginRight: "20px",
        marginLeft: "20px",
    },
    tableHeaderCol: { 
        backgroundColor: "#417bd2",
        width: "100%",
        margin: "0.3px",
        paddingTop: "2px",
        paddingBottom: "2px"
    }, 
    tableHeaderCell: { 
        width: "100%",
        fontSize: "8px",
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    }, 
    tableRow1: { 
        margin: "auto",
        width: "18%"
    }, 
    tableRow2: { 
        margin: "auto",
        width: "12%"
    }, 
    tableRow3: { 
        margin: "auto",
        width: "24%"
    }, 
    tableRow4: { 
        margin: "auto",
        width: "44%",
    }, 
    tableCol: {  
        border: "1px solid #417bd2",
        margin: "0.3px",
    }, 
    tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 8
    },
    tableColSpc: {  
        border: "1px solid #417bd2",
        margin: "0.3px",
    }, 
    tableCellSpc: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 8,
        padding: "1px",
        marginBottom: "4px",
        fontStyle: "italic"
    },
    tableCellLast: { 
        margin: "auto", 
        marginTop: 5, 
        padding: "1px",
        marginBottom: "4px",
        height: "26px"
    },
    // details styleSheet
    details: {
        marginRight: "20px",
        marginLeft: "20px",
        display: "flex",
        fontSize: "8px",
        flexDirection: "row",
        marginTop: "10px"
    },

    // section2 stylesheets
    section2: {
        margin: 10,
        width: "50%"
    },
});


export default function ReactPDF(props) {
    var today = new Date()
console.log("==========================")
console.log(props)
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View style={styles.section}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Text style={styles.headerTopTitle}>EXPRESS WORLDWIDE</Text>
                            <Text style={styles.headerTopDate}>{ props.shipment.created_at?props.shipment.created_at.split('T')[0]:""} DHL</Text>
                        </View>
                        <View style={styles.headerMiddle}>
                            <Text style={styles.headerMiddleText}>WPX</Text>
                        </View>
                        <View style-={styles.headerIMG}>
                            <Image src={ dhlIcon } alt="dhl" style={{width: 85, height: 25, marginTop: 22, marginRight: 10}}/>
                        </View>
                    </View>
                    <View style={styles.sender}>
                        <Text style={styles.senderText}>From (Sender.s information):</Text>
                    </View>
                    <View style={styles.senderPanel}>
                        <View style={styles.senderTitles}>
                            <Text style={styles.senderTitle}>Company:</Text>
                            <Text style={styles.senderTitle}>Address:</Text>
                            <Text style={styles.senderTitle}>City:</Text>
                            <Text style={styles.senderTitle}>Country:</Text>
                            <Text style={styles.senderTitle}>Phone:</Text>
                        </View>
                        <View style={styles.senderContents}>
                            <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.company : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.address_first : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.city : "" }</Text>

                            <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.country : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.sender_address ? props.shipment.sender_address.phone : "" }</Text>
                        </View>
                        <View style={styles.senderEnds}>
                            <Text style={styles.senderEnd}>State:</Text>
                            <Text style={styles.senderEnd}>ZipCode:</Text>
                            <Text style={styles.senderEnd}>Email:</Text>
                        </View>
                        <View style={styles.senderEndsContents}>
                            <Text style={styles.senderEndContent}>{ props.shipment.sender_address ? props.shipment.sender_address.state : "" }</Text>
                            <Text style={styles.senderEndContent}>{ props.shipment.sender_address ? props.shipment.sender_address.zipCode : "" }</Text>
                            <Text style={styles.senderEndContent}>{ props.shipment.sender_address ? props.shipment.sender_address.email : "" }</Text>
                        </View>
                    </View>
                    <View style={styles.Reciever}>
                        <Text style={styles.senderText}>To (Consignee.s information):</Text>
                    </View>
                    <View style={styles.senderPanel}>
                        <View style={styles.senderTitles}>
                            <Text style={styles.senderTitle}>Company:</Text>
                            <Text style={styles.senderTitle}>Address:</Text>
                            <Text style={styles.senderTitle}>City:</Text>
                            <Text style={styles.senderTitle}>Country:</Text>
                            <Text style={styles.senderTitle}>Phone:</Text>
                        </View>
                        <View style={styles.senderContents}>
                            <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.company : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.address_first : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.city : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.country : "" }</Text>
                            <Text style={styles.senderContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.phone : "" }</Text>
                        </View>
                        <View style={styles.senderEnds}>
                            <Text style={styles.senderEnd}>State:</Text>
                            <Text style={styles.senderEnd}>ZipCode:</Text>
                            <Text style={styles.senderEnd}>Email:</Text>
                        </View>
                        <View style={styles.senderEndsContents}>
                            <Text style={styles.senderEndContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.state : "" }</Text>
                            <Text style={styles.senderEndContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.zipCode : "" }</Text>
                            <Text style={styles.senderEndContent}>{ props.shipment.receiver_address ? props.shipment.receiver_address.email : "" }</Text>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.code}>
                        <View style={styles.barcode}>
                            <Text style={styles.fontSpc}>Service: DHL Express</Text>
                            <MyBarcode barcode={ props.shipment.hawb ? props.shipment.hawb : "1" } />
                            <Text style={styles.fontSpc}>{ props.shipment?.hwab }</Text>
                        </View>
                        {/* <QRCodeDocument ids={}/> */}
                        <Image src={ qrCode } alt="dhl" style={{width: 50, height: 50, marginRight: 10, marginLeft: 15}}/>
                        <View style={styles.country}>
                            <Text style={{color: "white"}}>US</Text>
                        </View>
                    </View>
                    {/* This table view need to be updated. */}
                    <View style={styles.table}> 
                        <View style={styles.tableRow1}> 
                            <View style={styles.tableHeaderCol}> 
                                <Text style={styles.tableHeaderCell}>Number</Text> 
                            </View> 
                            <View style={styles.tableColSpc}> 
                                <Text style={styles.tableCellSpc}>PCS</Text> 
                            </View>
                            {/* {console.log(props.packageInfo)} */}
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>{ props.packageInfo.length }</Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow2}> 
                            <View style={styles.tableHeaderCol}> 
                                <Text style={styles.tableHeaderCell}>Gross</Text> 
                            </View> 
                            <View style={styles.tableColSpc}> 
                                <Text style={styles.tableCellSpc}>Weight</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>{ props.packageInfo.reduce((a,v) =>  a = a + Number(v.subweight) , 0 ) }</Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow3}> 
                            <View style={styles.tableHeaderCol}> 
                                <Text style={styles.tableHeaderCell}>Chargeable</Text> 
                            </View> 
                            <View style={styles.tableColSpc}> 
                                <Text style={styles.tableCellSpc}>Weight</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCell}>{ props.packageInfo.reduce((a,v) =>  a = a + Number(v.subcharge) , 0 ) }</Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow4}> 
                            <View style={styles.tableHeaderCol}> 
                                <Text style={styles.tableHeaderCell}>Kích thước (Dimensions)</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                                <Text style={styles.tableCellLast}></Text>
                            </View>
                        </View> 
                    </View>
                    <View style={styles.details}>
                        <View style={{width: "60%"}}>
                            <Text style={{marginBottom: "3px"}}>Description:</Text>
                            <Text style={{marginBottom: "3px"}}>Declared Value: { props.product.reduce((a,v) =>  a = a + v.amount , 0 )}</Text>
                            <Text style={{marginBottom: "3px"}}>Tax:</Text>
                            <Text style={{marginBottom: "3px"}}>Remark:</Text>
                        </View>
                        <View style={{width: "40%"}}>
                            <Text style={{marginBottom: "3px"}}>Issue by carrier:</Text>
                            <Text style={{marginBottom: "3px"}}>DHL EXPRESS</Text>
                            <Text style={{marginBottom: "3px"}}>Website: </Text>
                            <Text style={{marginBottom: "3px"}}>Email: <Link>{}</Link>{ props.shipment.sender_address ? props.shipment.sender_address.email : "" }</Text>
                        </View>
                    </View>
                    <View style={{height: "2px", backgroundColor: "#417bd2", marginLeft: "15px", marginRight: "15px", marginTop: "15px", marginBottom: "15px"}}></View>
                    <View style={{display: "flex", flexDirection: "row", marginRight: "20px", marginLeft: "20px"}}>
                        <Text style={{fontSize: "9px", width: "50%"}}>(Sender.s Signature)</Text>
                        <Text style={{fontSize: "9px", width: "50%"}}>(Picked up by)</Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", marginRight: "20px", marginLeft: "20px", marginTop: "5px"}}>
                        <Text style={{fontSize: "8px", width: "50%"}}></Text>
                        <Text style={{fontSize: "8px", width: "50%"}}></Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", marginRight: "20px", marginLeft: "20px", marginTop: "20px"}}>
                        <Text style={{fontSize: "9px", width: "50%"}}>(Date/time) {today.getHours()} / {today.getMinutes() } / {today.getSeconds()}</Text>
                        <Text style={{fontSize: "9px", width: "50%"}}>(Date/time) {today.getHours()} / {today.getMinutes() } / {today.getSeconds()}</Text>
                    </View>
                </View>
                <View style={styles.section2}>
                    <View><Text style={{textAlign: "center", marginTop: "20px"}}>Terms & Conditions</Text></View>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginTop: "15px", marginBottom: "10px"}}>
                        This limitation is subject to revision as published in 24/7 Express Logistics, Inc. tariffs in effect at the time of a shipment.
                        Declared value for carriage shall be subject to an excess valuation charge of $0.65 per $100.00 of declared value.
                    </Text>
                    <Text style={{fontSize: "8px", fontWeight: "bold", marginLeft: "15px"}}>
                        1. Declared Value and Insurance
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "5px"}}>
                        24/7 Express Logistics, Inc., liability in the absence of a higher declared value for carriage is limited to $0.50 per
                        pound up to a maximum of $50.00 unless greater amount is declared prior to the shipment, declared on the bill of
                        lading, and applicable declared value charges paid thereon. The maximum declared value for any shipment is
                        $10,000.00.
                    </Text>
                    <Text style={{fontSize: "8px", fontWeight: "bold", marginLeft: "15px", marginTop: "3px"}}>
                        2. Payment of Charges/Default
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "5px"}}>
                        1.) On approved credit and with a valid 24/7 Express Logistics, Inc. Customer Account number, 24/7 Express
                        Logistics, Inc credit terms require invoices to be paid upon receipt or agreed upon net terms with late fees starting
                        at 15 days from customer’s receipt of invoice.<br/>
                        (After 30 days add 10% to total invoice, after 45 days add 15% to total invoice, after 60 days add 20% to total invoice.)
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        2.) Nonpayment of any invoiced shipments or any other default by any and all parties under these Terms and
                        Conditions of Services shall constitute a claim by 24/7 Express Logistics, Inc against such parties and such parties,
                        in addition to accepting liability for such claim of payment or other damages, shall be liable for all costs related to
                        the collection of such claim, including but not limited to, court costs, attorney’s fees, and related expenses.
                    </Text>
                    <Text style={{fontSize: "8px", fontWeight: "bold", marginLeft: "15px", marginTop: "3px"}}>
                        3. Claims
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "5px"}}>
                        + Courier limits are 15 days and freight limits are 9 months from the date any shipment should have delivered.
                        Consignees must accept damaged freight until the claims process can be initiated.
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        + Merchandise must be retained in its original shipping container until an inspection can be scheduled and
                        completed. 24/7 Express Logistics, Inc will arrange for or perform the inspection within 15 days of notification
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        + Claimant agrees and understands that federal regulations require every effort be made to reduce the loss and assist
                        24/7 Express Logistics, Inc. in recovery from any insurer and invoke all legal rights shipper may have to minimize
                        the effect of any loss.
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        + 24/7 Express Logistics, Inc or its insurer shall honor all rights and remedies, if any, of claimant in respect to such
                        a loss, based on the respective mode of transport used and that mode’s respective liabilities.
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        + Claims for overcharges must be made in writing to 24/7 Express Logistics, Inc within one year of the shipment’s
                        delivery date. Freight shipments have 18 months in which to file overcharges.
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        + No claims for loss or damage to a shipment will be processed until all transportation charges have been paid. The
                        amount of any open claims may not be deducted from transportation charges.
                    </Text>
                    <Text style={{fontSize: "8px", fontWeight: "bold", marginLeft: "15px", marginTop: "3px"}}>
                        4. Rate Changes
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        24/7 Express Logistics, Inc reserves the right to change its shipping tariffs on all shipments without serving prior
                        notice to shipper and any such surcharge may apply for any period of time as deemed necessary by 24/7 Express
                        Logistics, Inc.
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginLeft: "23px", marginTop: "2px"}}>
                        24/7 Express Logistics, Inc reserves the right to assess a fuel surcharge on all shipments without serving prior
                        notice to shipper and any such surcharge may apply for any period of time as deemed necessary by 24/7 Express
                        Logistics, Inc. The price of fuel is obtained from the Energy
                    </Text>
                    <Text style={{fontSize: "7.5px", lineHeight: "1.5px", marginTop: "10px"}}>
                        <Image src={tick}/>The Terms and Conditions of Service contained herein shall be governed by and constructed in accordance with the
                        laws of the Commonwealth of Missouri and, in the event of any disputes whatsoever under such Terms and Conditions of
                        Service.
                    </Text>
                </View>
            </Page>
        </Document>
    )
}