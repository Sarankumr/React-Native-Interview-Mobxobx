import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";




export const TabNavigation = ({
    array = [],
    onSelectedIndexAction = (item: any) => { }
}) => {


    const [onSelectedIndex, setOnselectedIndex] = useState(1);
    const renderItems = (item: any, index: any) => {
        return (
            <Pressable
                key={index}
                style={styles.renderCardContSty(onSelectedIndex === item.id)}
                onPress={() => {
                    setOnselectedIndex(item.id)
                    onSelectedIndexAction(item)
                }}
            >
                <Text style={styles.titleTxtSty(onSelectedIndex === item.id)}>{item.title}</Text>
            </Pressable>
        )
    }
    return (
        <View style={styles.continue}>
            <FlatList
                horizontal
                data={array}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => renderItems(item, index)}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    continue: {
        // paddingVertical: 10,
        borderBottomWidth: 2,
        // bottom:5,
        borderBottomColor: 'gray',
        backgroundColor: '#fff'
    },
    titleTxtSty: (isSeleted: boolean) => {
        return {
            color: isSeleted ? 'blue' : '#000',
            fontSize: 17,
            paddingHorizontal: 20,
            textTransform: `capitalize`,
            fontWeight: '600',
        }
    },
    renderCardContSty: (isSeleted: boolean) => {
        return {
            flex: 1,
            marginRight: 20,
            paddingVertical: 10,
            borderBottomWidth: isSeleted ? 4 : 0,
            borderBottomColor: isSeleted ? 'blue' : '#fff',
        }
    }
})

