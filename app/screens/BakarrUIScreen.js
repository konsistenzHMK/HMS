import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Divider, Icon, IconButton, ScreenContainer, withTheme } from '@draftbit/ui'
import { Modal, ScrollView, Text, View, useWindowDimensions } from 'react-native'

const BakarrUIScreen = (props) => {
  const dimensions = useWindowDimensions()

  const { theme } = props
  const { navigation } = props

  const [showChatModal, setShowChatModal] = React.useState(false)

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
          },
          dimensions.width,
        )}
      >
        <Text
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              color: theme.colors['PF-Grey'],
              fontFamily: 'Rubik_600SemiBold',
              fontSize: 24,
            }),
            dimensions.width,
          )}
        >
          {'PagalFan - Bakarr Room'}
        </Text>
        <Icon size={24} name={'Entypo/mic'} color={theme.colors['Custom Color_13']} />
      </View>
      {/* Speakers Grid */}
      <ScrollView
        style={StyleSheet.applyWidth({ height: 600 }, dimensions.width)}
        contentContainerStyle={StyleSheet.applyWidth(
          {
            marginLeft: 30,
            marginRight: 20,
            paddingLeft: 10,
            paddingRight: 10,
          },
          dimensions.width,
        )}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Row1 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              height: 160,
              justifyContent: 'center',
              marginBottom: 5,
              width: '100%',
            },
            dimensions.width,
          )}
        >
          {/* Item-L */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Shakti (Mod)'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderColor: theme.colors['PF-Primary'],
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'SH'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
          {/* Item-R */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Ronit'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'RO'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
        </View>
        {/* Row2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              height: 160,
              justifyContent: 'center',
              marginBottom: 5,
              width: '100%',
            },
            dimensions.width,
          )}
        >
          {/* Item-L */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Aakarsh'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'AA'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
          {/* Item-R */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Samarth'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'SA'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
        </View>
        {/* Row3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              height: 160,
              justifyContent: 'center',
              marginBottom: 5,
              width: '100%',
            },
            dimensions.width,
          )}
        >
          {/* Item-L */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Yogesh'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'YO'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
          {/* Item-R */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Ravi'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'RA'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
        </View>
        {/* Row4 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              height: 160,
              justifyContent: 'center',
              marginBottom: 5,
              width: '100%',
            },
            dimensions.width,
          )}
        >
          {/* Item-L */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'Jashan'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'JA'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon name={'Feather/mic'} size={18} color={theme.colors['Secondary']} />
            </View>
          </View>
          {/* Item-R */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors['Secondary'],
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                height: 140,
                justifyContent: 'space-around',
                marginLeft: 10,
                marginRight: 10,
                width: '50%',
              },
              dimensions.width,
            )}
          >
            {/* Item-header */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Custom Color_13'],
                    fontFamily: 'Rubik_400Regular',
                  }),
                  dimensions.width,
                )}
              >
                {'You (Sam)'}
              </Text>
            </View>
            {/* Item-initials */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Custom Color_13'],
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                  },
                  dimensions.width,
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_White'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 18,
                    }),
                    dimensions.width,
                  )}
                >
                  {'SA'}
                </Text>
              </View>
            </View>
            {/* Item-mic */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', marginBottom: 4 }, dimensions.width)}>
              <Icon size={18} color={theme.colors['Secondary']} name={'Feather/mic-off'} />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* All Participants */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          },
          dimensions.width,
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: theme.colors['BG Gray'],
              borderTopWidth: 1,
              flexDirection: 'row',
              height: 40,
              justifyContent: 'flex-start',
              marginLeft: 10,
              paddingLeft: 10,
            },
            dimensions.width,
          )}
        >
          {/* L1 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Studily Emerald Mint'],
                borderRadius: 50,
                height: 20,
                width: 20,
              },
              dimensions.width,
            )}
          />
          {/* L2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Secondary'],
                borderRadius: 50,
                height: 20,
                left: -8,
                width: 20,
              },
              dimensions.width,
            )}
          />
          {/* L3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Studily Emerald Mint'],
                borderRadius: 50,
                height: 20,
                left: -18,
                width: 20,
              },
              dimensions.width,
            )}
          />
          {/* L4 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Community_Secondary_Alt'],
                borderRadius: 50,
                height: 20,
                left: -25,
                width: 20,
              },
              dimensions.width,
            )}
          />
        </View>

        <Text
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              color: theme.colors['PF-Grey'],
              fontFamily: 'Rubik_400Regular',
              fontSize: 12,
              marginLeft: -15,
            }),
            dimensions.width,
          )}
        >
          {'+ 218 participants'}
        </Text>
      </View>
      {/* Footer */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: '"rgba(0, 0, 0, 0)"',
            borderBottomWidth: 0.5,
            borderColor: theme.colors['Secondary'],
            borderRadius: 12,
            borderTopWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            paddingBottom: 8,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 8,
          },
          dimensions.width,
        )}
      >
        {/* Mic Icon Button */}
        <IconButton size={36} color={theme.colors['Secondary']} icon={'Feather/mic-off'} />
        {/* Chat Icon Button */}
        <IconButton
          onPress={() => {
            try {
              setShowChatModal(true)
            } catch (err) {
              console.error(err)
            }
          }}
          icon={'Entypo/chat'}
          size={36}
          color={theme.colors['Secondary']}
        />
        {/* Exit Icon Button */}
        <IconButton
          onPress={() => {
            try {
              navigation.navigate('Tabs', { screen: 'HomeScreen' })
            } catch (err) {
              console.error(err)
            }
          }}
          size={36}
          icon={'MaterialIcons/exit-to-app'}
          color={theme.colors['PF-Primary']}
        />
      </View>
      {/* Chat Modal */}
      <>
        {!showChatModal ? null : (
          <Modal animationType={'slide'} transparent={true}>
            <View
              style={StyleSheet.applyWidth(
                {
                  bottom: 0,
                  left: 0,
                  opacity: 0.3,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                },
                dimensions.width,
              )}
            />
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Community_Dark_UI'],
                  borderColor: theme.colors['Border Color'],
                  borderLeftWidth: 0.5,
                  borderRightWidth: 0.5,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderTopWidth: 0.5,
                  bottom: 0,
                  height: '90%',
                  left: 0,
                  opacity: 1,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  position: 'absolute',
                  right: 0,
                  width: '100%',
                },
                dimensions.width,
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    alignSelf: 'center',
                    color: theme.colors['Secondary'],
                    fontFamily: 'Rubik_600SemiBold',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'Bakarr Chat'}
              </Text>
              <Divider
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], { marginBottom: 10 }),
                  dimensions.width,
                )}
                color={theme.colors.divider}
              />
              {/* Messages */}
              <ScrollView
                contentContainerStyle={StyleSheet.applyWidth({ marginLeft: 4, marginRight: 4 }, dimensions.width)}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                bounces={true}
              >
                {/* Chat Item */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 4,
                      marginTop: 4,
                    },
                    dimensions.width,
                  )}
                >
                  {/* Item-L */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        justifyContent: 'flex-start',
                        marginRight: 10,
                        width: 65,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* username */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Studily_Blue_White'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'Aakarsh'}
                    </Text>
                  </View>
                  {/* Item-R */}
                  <View style={StyleSheet.applyWidth({ justifyContent: 'flex-start', width: 280 }, dimensions.width)}>
                    {/* msg */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Background'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'This match will go to the last ball 😍'}
                    </Text>
                  </View>
                </View>
                {/* Chat Item */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 4,
                      marginTop: 4,
                    },
                    dimensions.width,
                  )}
                >
                  {/* Item-L */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        justifyContent: 'flex-start',
                        marginRight: 10,
                        width: 65,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* username */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['App Green'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'Sam (Me)'}
                    </Text>
                  </View>
                  {/* Item-R */}
                  <View style={StyleSheet.applyWidth({ justifyContent: 'flex-start', width: 280 }, dimensions.width)}>
                    {/* msg */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Background'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'🔥'}
                    </Text>
                  </View>
                </View>
                {/* Chat Item */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 4,
                      marginTop: 4,
                    },
                    dimensions.width,
                  )}
                >
                  {/* Item-L */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        justifyContent: 'flex-start',
                        marginRight: 10,
                        width: 65,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* username */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Studily_Blue_White'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'Yogesh'}
                    </Text>
                  </View>
                  {/* Item-R */}
                  <View style={StyleSheet.applyWidth({ justifyContent: 'flex-start', width: 280 }, dimensions.width)}>
                    {/* msg */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Background'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'yeah, definitely a thriller'}
                    </Text>
                  </View>
                </View>
                {/* Chat Item */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 4,
                      marginTop: 4,
                    },
                    dimensions.width,
                  )}
                >
                  {/* Item-L */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        justifyContent: 'flex-start',
                        marginRight: 10,
                        width: 65,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* username */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Studily_Blue_White'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'Shubhaam'}
                    </Text>
                  </View>
                  {/* Item-R */}
                  <View style={StyleSheet.applyWidth({ justifyContent: 'flex-start', width: 280 }, dimensions.width)}>
                    {/* msg */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['Background'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'✋🏻 I have a question for the experts on the panel. Can I hv the mic plzz?'}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {/* Footer */}
              <View style={StyleSheet.applyWidth({ justifyContent: 'flex-end' }, dimensions.width)}>
                <Divider
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], { marginBottom: 5 }),
                    dimensions.width,
                  )}
                  color={theme.colors.divider}
                />
                {/* CloseButton */}
                <Button
                  onPress={() => {
                    try {
                      setShowChatModal(false)
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                      backgroundColor: '"rgba(0, 0, 0, 0)"',
                      color: theme.colors['Secondary'],
                      fontFamily: 'Rubik_400Regular',
                      fontSize: 12,
                    }),
                    dimensions.width,
                  )}
                  title={'Close Chat'}
                />
              </View>
            </View>
          </Modal>
        )}
      </>
    </ScreenContainer>
  )
}

export default withTheme(BakarrUIScreen)
