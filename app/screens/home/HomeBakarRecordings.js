import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../themes'
import { Logger } from '../../utils/logger'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import { Image, ShimmerPlaceHolder } from '../../components'
import { FlashList } from '@shopify/flash-list'

export const HomeBakarRecordings = ({ navigation, translate }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const Constants = GlobalVariables.useValues()

  const fetchData = async () => {
    try {
      setLoading(true)
      const fetchData = await PagalFanBEApi.fetchAllBakarrRecordingsGET(Constants)
      setData(fetchData)
      setError(false)
    } catch (e) {
      setError(true)
      Logger.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (error) {
    return <Text style={{ textAlign: 'center' }}>{translate('HomeScreen.Text.ProblemFetchData')}</Text>
  }

  const keyExtractor = (flashListData) => flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)

  const renderItem = ({ item }) => {
    const flashListData = item
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('BakarrRecordingsScreen', {
            id: flashListData?.id,
            timestamp: Date.now(),
          })
        }}
        style={styles.itemContainer}
      >
        <Image
          style={styles.itemImage}
          resizeMode="cover"
          source={{
            uri: `${flashListData?.image_url}`,
          }}
        />
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode={'tail'}>
          {flashListData?.session_title}
        </Text>
        <Text style={styles.itemSubTitle} numberOfLines={1} ellipsizeMode={'tail'}>
          {'(' + flashListData?.language + ')'}
        </Text>
      </Pressable>
    )
  }

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{translate('HomeScreen.Text.BakarrRecordings')}</Text>

        <Pressable onPress={() => navigation.navigate('BakarrRecordingsScreen')}>
          <Text style={styles.viewAll}>{translate('HomeScreen.Text.ViewAll')}</Text>
        </Pressable>
      </View>
      {loading && !data?.length ? <Loader /> : null}
      <FlashList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={50}
        onEndReachedThreshold={0.5}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}

const Loader = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceHolder style={styles.shimmer} />
      <ShimmerPlaceHolder style={styles.shimmer} />
      <ShimmerPlaceHolder style={styles.shimmer} />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    color: theme.colors['Community_Medium_Black'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  viewAll: {
    color: theme.colors['Secondary'],
    fontFamily: 'Inter_300Light',
    fontSize: 10,
    marginHorizontal: 5,
  },
  shimmerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  shimmer: {
    marginRight: 14,
    width: 80,
    height: 80,
    borderRadius: 45,
  },

  itemContainer: {
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    width: 90,
  },
  itemImage: {
    borderColor: theme.colors['App Green'],
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 3,
    height: 70,
    width: 70,
  },
  itemTitle: {
    fontFamily: 'Inter_400Regular',
    color: theme.colors['PF-Grey'],
    fontSize: 9,
    textAlign: 'center',
  },
  itemSubTitle: {
    fontFamily: 'Inter_400Regular',
    color: theme.colors['PF-Grey'],
    fontSize: 7,
    marginBottom: 9,
  },
})
