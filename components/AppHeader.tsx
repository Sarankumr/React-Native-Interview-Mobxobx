import {
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
} from "react-native";
import React from "react";
import { Icon, ListItem } from "react-native-elements";


interface myProps {
  title?: string, 
  back?: () => void, 
  hide?: boolean, 
  left?: any, 
  right?: any, 
}
const AppHeader = (props:myProps) => {
  return (
    <View style={styles.container}>
      <ListItem
        containerStyle={{
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={props.back}>
          {props.hide ? null : (
            <>
              {props.left ? (
                props.left
              ) : (
                <Icon
                  name={"arrowleft"}
                  type={"antdesign"}
                  size={25}
                />
              )}
            </>
          )}
        </TouchableOpacity>
        <ListItem.Content style={{flex:1}} >
          <Text style={styles.titleTxtSty}>{props.title}</Text>
        </ListItem.Content>
        <View>{props.right}</View>
      </ListItem>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    marginTop: 30,
  },
  row: {
    alignItems: "center",
  },
  referals: {
    fontSize: 16,
    color: "#000",
    margin: 10,
  },
  containerStyle: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 5,
    borderBottomWidth: 0,
    height: 8,
    paddingHorizontal: 10,
  },
  titleTxtSty: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textTransform: "capitalize",
  },
});
