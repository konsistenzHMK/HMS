import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../themes'
import { Logger } from '../../utils/logger'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import { FlashList } from '@shopify/flash-list'
import { Image, ShimmerPlaceHolder } from '../../components'
import convertNullToTBD from '../../global-functions/convertNullToTBD'
import checkMatchDates from '../../global-functions/matchType'
import getCorrectDateFormat from '../../global-functions/getCorrectDateFormat'
import endDate from '../../global-functions/endDate'
import getCorrectTimeFormat from '../../global-functions/getCorrectTimeFormat'

export const HomeMatchList = ({ translate, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const Constants = GlobalVariables.useValues()

  if (error) {
    return <Text style={{ textAlign: 'center' }}>{translate('HomeScreen.Text.ProblemFetchData')}</Text>
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const fetchData = await PagalFanBEApi.fetchAllUpcomingMatchesGET(Constants)
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

  const keyExtractor = (flashListData) => flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)

  const renderItem = ({ item }) => {
    const flashListData = item
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('MatchDaySingleScreen', {
            match_id: flashListData?.id,
          })
        }
        style={styles.itemContainer}
      >
        {/* LiveBadge */}
        {flashListData?.match_is_live && (
          <View style={styles.itemLiveContainer}>
            <Text style={styles.itemLiveText}>{translate('HomeScreen.Text.Live')}</Text>
          </View>
        )}
        <View style={styles.itemMatchTitleContainer}>
          {/* MatchName */}
          <Text style={styles.itemMatchTitle}>{flashListData?.title}</Text>
        </View>
        {flashListData?.feed_available ? (
          <>
            {/* Teams */}
            <View style={styles.teamContainer}>
              {/* Team-1 */}
              <View style={styles.teamTitleContainer}>
                {/* Logo */}
                <Image
                  style={styles.teamImage}
                  resizeMode={'cover'}
                  source={{
                    uri: `${flashListData?.team_1?.logo_path}`,
                  }}
                />
                {/* Name */}
                <Text style={styles.teamTitle}>{convertNullToTBD(flashListData?.team_1?.team_initials)}</Text>
              </View>
              {/* vs */}
              <Text style={styles.teamVS}>{translate('HomeScreen.Text.vs')}</Text>
              {/* Team-2 */}
              <View style={styles.teamContainer}>
                {/* Name */}
                <Text style={styles.teamTitle}>{convertNullToTBD(flashListData?.team_2?.team_initials)}</Text>
                {/* Logo */}
                <Image
                  style={styles.teamImage}
                  resizeMode={'cover'}
                  source={{
                    uri: `${flashListData?.team_2?.logo_path}`,
                  }}
                />
              </View>
            </View>
            {/* Details */}
            <View style={styles.matchDetailsContainer}>
              {/* Date */}
              <Text style={styles.matchDetailsText}>
                {checkMatchDates(flashListData?.match_date, flashListData?.end_date)
                  ? getCorrectDateFormat(flashListData?.match_date)
                  : getCorrectDateFormat(flashListData?.match_date)}
                {checkMatchDates(flashListData?.match_date, flashListData?.end_date)
                  ? null
                  : endDate(flashListData?.end_date)}
              </Text>
              {/* StartTime */}
              <Text style={styles.matchTimeText}>
                {getCorrectTimeFormat(flashListData?.start_time)} {translate('HomeScreen.Text.IST')}
              </Text>
            </View>
            {/* venue */}
            <Text style={styles.matchVenueText}>{flashListData?.venue_city}</Text>
          </>
        ) : (
          <>
            {/*Image to cover if not feed is not available*/}
            <Image
              source={{ uri: flashListData?.thumbnail_path }}
              style={styles.imageFeedNotAvailable}
              resizeMode="contain"
            />
          </>
        )}
      </Pressable>
    )
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{translate('HomeScreen.Text.MatchesHeader')}</Text>
        <Pressable onPress={() => navigation.navigate('MatchDaysAllScreen')}>
          <Text style={styles.headerViewAll}>{translate('HomeScreen.Text.ViewAll')}</Text>
        </Pressable>
      </View>
      {loading && !data?.length ? (
        <View style={styles.shimmerContainer}>
          <ShimmerPlaceHolder style={styles.liveUpcomingShimmer} />
          <ShimmerPlaceHolder style={styles.liveUpcomingShimmer} />
        </View>
      ) : (
        <FlashList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={50}
          onEndReachedThreshold={0.5}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    color: theme.colors['Community_Medium_Black'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  headerViewAll: {
    color: theme.colors['Secondary'],
    fontFamily: 'Inter_300Light',
    fontSize: 10,
    marginHorizontal: 5,
  },

  itemContainer: {
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderColor: theme.colors['App Green'],
    borderLeftWidth: 1,
    borderRadius: 12,
    borderRightWidth: 1,
    height: 100,
    marginRight: 14,
    padding: 2,
    paddingTop: 2,
    width: 160,
  },
  itemLiveContainer: {
    backgroundColor: theme.colors['PF-Primary'],
    marginBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
  itemLiveText: {
    color: theme.colors['Background'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 7,
  },
  itemMatchTitleContainer: {
    backgroundColor: theme.colors['Custom #eb3a4a'],
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 4,
  },
  itemMatchTitle: {
    alignSelf: 'center',
    color: theme.colors['Community_White'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    marginBottom: 2,
    textDecorationLine: 'none',
  },

  teamContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  teamTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamImage: {
    height: 24,
    marginRight: 1,
    width: 24,
  },
  teamTitle: {
    color: theme.colors['Community_Highlight_Blue'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    marginLeft: 2,
  },
  teamVS: {
    color: theme.colors['Custom #eb3a4a'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },

  matchDetailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  matchDetailsText: {
    color: theme.colors['PF-Grey'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
    marginRight: 4,
  },
  matchTimeText: {
    color: theme.colors['PF-Grey'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
  },
  matchVenueText: {
    alignSelf: 'center',
    color: theme.colors['PF-Grey'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
  },

  imageFeedNotAvailable: {
    height: 70,
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  shimmerContainer: {
    flexDirection: 'row',
  },
  liveUpcomingShimmer: {
    borderRadius: 12,
    height: 100,
    marginRight: 14,
    width: 160,
  },
})
