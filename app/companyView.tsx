import AppHeader from "@/components/AppHeader";
import CustomCard from "@/components/CustomCrad";
import { TabNavigation } from "@/components/TabNavigation";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Platform, View, Text, FlatList, ActivityIndicator, RefreshControl, Pressable, ScrollView } from "react-native";
import { Divider, Icon, SearchBar } from "react-native-elements";

export default function companyView() {

    const route = useRoute()
    const navigation = useNavigation();
    const companyData = route?.params?.companyData;

    console.log({ route: companyData.crypto })
    const TAB = [
        { id: 1, title: 'Company' },
        { id: 2, title: 'Crypto' },
        { id: 3, title: 'Address' },
        { id: 4, title: 'bank' }
    ]

    const COMPANY = [
        { id: 1, leftTitle: "name", rightTitle: companyData?.company.name },
        { id: 2, leftTitle: "title", rightTitle: companyData?.company.title },
        { id: 3, leftTitle: "department", rightTitle: companyData?.company.department },
        { id: 4, leftTitle: "address", rightTitle: companyData?.company.address?.address },
        { id: 5, leftTitle: "city", rightTitle: companyData?.company.address?.city },
        { id: 6, leftTitle: "coordinates", rightTitle: companyData?.company.address?.coordinates.lat },
        { id: 7, leftTitle: "country", rightTitle: companyData?.company.address?.country },
        { id: 8, leftTitle: "post code", rightTitle: companyData?.company.address?.postalCode },
        { id: 9, leftTitle: "state", rightTitle: companyData?.company.address?.state },
        { id: 10, leftTitle: "state code", rightTitle: companyData?.company.address?.stateCode },
    ]
    return (
        <View style={styles.conatainer}>
            <AppHeader title={''} back={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.innerViewStyle}>
                    <Image source={{ uri: companyData?.image }} style={styles.imageSty} />
                    <Text style={styles.jobNameTxtSty}>{companyData?.company.title}</Text>
                    <Text style={styles.deparTxtSty}>{companyData?.company.department}</Text>
                    <View>
                        <TabNavigation array={TAB} onSelectedIndexAction={(data: any) => { return console.log(data); }} />
                    </View>

                    <View style={{justifyContent:'flex-start',alignItems:'flex-start', flexDirection:'row',gap:10, marginTop:15}}>
                        <Icon size={30} type={'material-community'}name={'home-city-outline'}color={'skyblue'}/>
                        <Text style={styles.jobNameTxtSty}>{'Adddress'}</Text>
                    </View>

                    <View style={styles.companyViewSty}>
                        {COMPANY.map((item: any, index: number) => {
                            return (
                                <View key={index} style={styles.companyCardContSty}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.leftTitleSty}>{item.leftTitle}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.rightTitleSty}>: {item.rightTitle}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    <Divider style={{marginVertical:10}}/>

                    <View style={{justifyContent:'flex-start',alignItems:'flex-start', flexDirection:'row',gap:10}}>
                        <Icon size={30} type={'material-community'}name={'bitcoin'}color={'gold'}/>
                        <Text style={styles.jobNameTxtSty}>{'crypto'}</Text>
                    </View>

                    <View style={styles.cryptoViewSty}>
                        {COMPANY.map((item: any, index: number) => {
                            return (
                                <View key={index} style={styles.companyCardContSty}>
                                    <Text style={styles.leftTitleSty}>{item.leftTitle}</Text>
                                    <Text style={styles.rightTitleSty}>{item.rightTitle}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    innerViewStyle: {
        marginTop: 20
    },
    imageSty: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 10
    },
    jobNameTxtSty: {
        marginTop: 0,
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
        marginBottom: 10
    },
    deparTxtSty: {
        marginTop: 0,
        fontSize: 17,
        color: 'gray',
        fontWeight: '500',
        marginBottom: 10
    },
    companyViewSty: {
        flex: 1,
        padding: 10
    },
    companyCardContSty: {
        padding: 5,
        flexDirection: `row`,
        gap: 10
    },
    leftTitleSty: {
        fontSize: 15,
        color: 'gray',
        textTransform: 'capitalize'
    },
    rightTitleSty: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
        textTransform: `capitalize`
    },
    cryptoViewSty: {
        flex: 1,
        padding: 10
    }
});