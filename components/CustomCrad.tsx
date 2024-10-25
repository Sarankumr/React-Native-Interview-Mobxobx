import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Button, Card, Icon, ListItem } from "react-native-elements";


interface myProps {
    data: any;
}
const CustomCard = (props: myProps) => {
    const navigation = useNavigation()
    return (
        <Card containerStyle={styles.constainer}>
            <ListItem containerStyle={{ padding: 0 }}>
                <Image source={{ uri: props.data.image }} style={styles.imageStyle} />
                <View>
                    <Text style={styles.titleTxtSty}>{props.data.company.title}</Text>
                    <Text style={styles.companyNameTxtSty}>{props.data.company.name}</Text>
                </View>
               
            </ListItem>
            <View style={styles.list}>
                <Text style={styles.leftTxtSty}>Email</Text>
                <Text style={styles.rightTxtSty}>{props.data.email}</Text>
            </View>
            <View style={styles.list}>
                <Text style={styles.leftTxtSty}>Phone</Text>
                <Text style={styles.rightTxtSty}>{props.data.phone}</Text>
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        borderRadius: 10
    },
    titleTxtSty: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000'
    },
    iconeContSty: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10
    },
    companyNameTxtSty: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000'
    },
    imageStyle: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    list: {
        flex: 1,
        gap: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftTxtSty: {
        fontSize: 12,
        fontWeight: '400',
        color: 'gray'
    },
    rightTxtSty: {
        fontSize: 12,
        fontWeight: '600',
        color: 'gray'
    },
    viewTxtSty: {
        fontSize: 15,
        color: 'blue',
        textAlign: 'right'
    }
});


export default CustomCard;