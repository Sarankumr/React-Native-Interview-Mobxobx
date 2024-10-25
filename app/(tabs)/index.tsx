import AppHeader from "@/components/AppHeader";
import CustomCard from "@/components/CustomCrad";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Platform, View, Text, FlatList, ActivityIndicator, RefreshControl, Pressable } from "react-native";
import { Icon, SearchBar } from "react-native-elements";

export default function HomeScreen() {


  const navigation = useNavigation()

  const [data, setDate] = useState([])
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [hashMore, setHashMore] = useState(false);
  const [totalrecords, setTotalRecords] = useState(0)
  const [isRefreshing, setRefreshing] = useState(false);
  const [isFooterLoading, setIsFooterLoading] = useState(false);
  const [onSearchData, setOnSearchData] = useState([])

  React.useEffect(() => {
    ApiCall({ page: page });
    onSearchApiCall()
  }, []);

  const ApiCall = async ({ page = 1 }) => {
    try {
      const response = await axios.get('https://dummyjson.com/users', {
        params: {
          limit: 10,
          skip: page,
        }
      })
      console.log({ response: response.data.total });
      const arrayData = response.data;
      setTotalRecords(response.data.total)
      console.log({ response: response.data.total });
      if (data?.length === totalrecords) {
        setHashMore(true)
        setIsFooterLoading(false)
        return null;
      } else {
        if (page === 1) {
          setDate(response.data.users)
        } else {
          setDate((pre: any) => [...pre, ...arrayData.users])
        }
      }

    } catch (error) {
      console.log("@@@ apical error =====>>>>>>>", error)
    } finally {
      setRefreshing(false);
      console.log("@@@ finally =====>>>>>>>")
    }
  }

  const onSearchApiCall = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      setOnSearchData(response.data.users)
    }
    catch (error) {
      console.log()
    } finally {
      setRefreshing(false);
      console.log("@@@ finally =====>>>>>>>")
    }
  }

  const renderItem = (item: any, index: any) => {
    return (
      <Pressable
        key={index}
        onPress={() => { navigation.navigate('companyView', { companyData: item }) }}
      >
        <CustomCard data={item} />
      </Pressable>
    )
  }

  const handleRefresh = () => {
    setPage(1);
    setHashMore(false)
    setRefreshing(true);
    setSearch('');
    ApiCall({ page: 1 })
  }


  const onSeachCompanyName = (values: string) => {
    setSearch(values);
    if (values.length > 2) {
      const filterArray = onSearchData.filter((item: any) => item.company.name.toLocaleUpperCase() === values.toLocaleUpperCase())
      setDate(filterArray)
    } else {
      setDate(onSearchData)
    }
  }



  return (
    <View style={styles.conatainer} className={'p-10'}>
      <AppHeader title={'Home'} hide />
      <SearchBar
        value={search}
        autoFocus={false}
        searchIcon={() => <Icon type={'antdesign'} name={'search1'} size={20} />}
        placeholderTextColor={'#000'}
        placeholder={'Search company name...'}
        style={{ backgroundColor: '#a0a0a0' }}
        containerStyle={styles.searchBarContainer}
        inputStyle={{ color: '#000' }}
        inputContainerStyle={styles.inputContainerStyle}
        onChangeText={(values: string) => { return onSeachCompanyName(values); }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.companyNametxtSty}>Total Records: - {totalrecords}</Text>
        <FlatList
          data={data}
          extraData={data}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderItem(item, index)}
          onEndReached={() => {
            if (!hashMore) {
              setPage(page + 1);
              setIsFooterLoading(true);
              setTimeout(() => { ApiCall({ page: page }) }, 2000)
            }
          }
          }
          ListFooterComponent={() => {
            if (!isFooterLoading) return null;
            return (
              <View style={styles.footerContSty}>
                <ActivityIndicator size={30} color={'#000'} />
              </View>
            )
          }}
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl colors={['#000']} refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  footerContSty: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  companyNametxtSty: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    paddingVertical: 10,
    marginHorizontal: 5
  },
  searchBarContainer: {
    padding: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#fff'
  },
  inputContainerStyle: {
    backgroundColor: '#a0a0a0'
  }
});
