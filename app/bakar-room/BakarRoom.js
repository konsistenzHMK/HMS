import React, { useState, useRef, useEffect } from 'react'
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
  Platform,
} from 'react-native'
import { PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions'
import {
  HMSSDK,
  HMSUpdateListenerActions,
  HMSConfig,
  HMSTrackType,
  HMSTrackUpdate,
  HMSPeerUpdate,
} from '@100mslive/react-native-hms'

import { Dimensions } from 'react-native'
import { useSnackbar } from '../components'

/**
 * using `ROOM_CODE` is recommended over `AUTH_TOKEN` approach
 *
 * Take Auth Token from Dashbaord for this sample app.
 * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/foundation/security-and-tokens | Token Concept}
 */
const AUTH_TOKEN = '' // PASTE AUTH TOKEN FROM DASHBOARD HERE

export const BakarRoom = (props) => {
  /**
   * `usePeerTrackNodes` hook takes care of setting up {@link HMSSDK | HMSSDK} instance, joining room and adding all required event listeners.
   * It gives us:
   *  1. peerTrackNodes - This is a list of {@link PeerTrackNode}, we can use this list to render local and remote peer tiles.
   *  2. loading - We can show loader while Room Room join is under process.
   *  3. leaveRoom - This is a function that can be called on a button press to leave room and go back to Welcome screen.
   */
  const snackbar = useSnackbar()
  const { route, navigation } = props
  const { roomCode, username } = route.params

  const onConnectionError = (error) => {
    navigation.goBack()
    snackbar.show({ title: 'Connection error' })
    console.log(error)
  }

  const {
    peerTrackNodes,
    loading,
    leaveRoom,
    hmsInstanceRef,
    muteStatus,
    ChangeMuteStatus,
    trackIds,
    chatData,
    setChatData,
    ID,
  } = usePeerTrackNodes({ roomCode, username, onConnectionError })

  const HmsView = hmsInstanceRef.current?.HmsView

  const [viewChat, setViewChat] = useState(false)
  const [text, onChangeText] = React.useState('')

  const _keyExtractor = (item) => item.id

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const _renderItem = ({ item }) => {
    // console.log(item.peer.peerID);
    const color = item.peer.peerID == ID ? '#f2a45d' : '#87CEEB'
    const name = item.peer.peerID == ID ? 'You(' + item.peer.name + ')' : item.peer.name
    return (
      <View
        style={{
          width: windowWidth / 2 - 8,
          height: 300,
          margin: 4,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: 'white',
          borderColor: '#87CEEB',
          borderWidth: 1,
          borderRightWidth: 2.5,
          borderLeftWidth: 2.5,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              paddingBottom: 10,
              color: '#000000',
            }}
          >
            {name}
          </Text>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color,
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {item.peer.name
                .split(' ')
                .map((item) => item[0])
                .join('')}
            </Text>
          </View>
          <Text
            style={{
              height: '20%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              paddingBottom: 10,
              color: '#000000',
            }}
          >
            {item.track.isMute() == true ? (
              <Image source={require('./assets/mute.png')} style={{ width: 20, height: 25 }} />
            ) : (
              <Image source={require('./assets/unmute.png')} style={{ width: 20, height: 25 }} />
            )}
          </Text>
        </View>
      </View>
    )
  }

  const handleChat = () => {
    setViewChat(true)
    console.log(viewChat)
    return
  }
  const endChat = () => {
    setViewChat(false)
    console.log(viewChat)
  }

  const handleRoomEnd = () => {
    snackbar.show({ title: 'Exiting room' })
    setTimeout(() => {
      navigation.goBack()
    }, 500)
  }

  //////////

  async function getAudioStatus() {
    const localPeer = await hmsInstanceRef.current.getLocalPeer()
    const audioMuted = localPeer.audioTrack?.isMute()
    return audioMuted
  }

  async function toggleAudio() {
    try {
      const localPeer = await hmsInstanceRef.current.getLocalPeer()
      const audioMuted = localPeer.audioTrack?.isMute()
      localPeer.localAudioTrack().setMute(!audioMuted)
      ChangeMuteStatus(!audioMuted)

      if (!audioMuted) {
        snackbar.show({ title: 'Microphone muted' })
      }
    } catch (e) {
      console.log('Bakar Room -> toggleAudio error', e)
    }
  }

  async function handleBrodcast() {
    if (text == '') return
    try {
      snackbar.show({ title: 'Posting comment' })
      const result = await hmsInstanceRef.current.sendBroadcastMessage(text)
      const ob = {
        message: text,
        sender: {
          name: username,
          peerID: ID,
        },
      }
      console.log('Broadcast Message Success: ', result)
      // console.log(ob?.item[0].sender.name);
      // console.log(ob?.item[0].message);
      setChatData((prevchatData) => [...prevchatData, [ob]])
    } catch (error) {
      console.log('Broadcast Message Error: ', error)
    }
    onChangeText('')
  }

  const _renderItem2 = (value) => {
    // console.log(value?.item[0].sender.peerID);
    const color = value?.item[0].sender.peerID == ID ? '#0b795f' : '#3bc9ea'
    const name =
      value?.item[0].sender.peerID == ID
        ? value?.item[0].sender.name.split(' ')[0] + '(me)'
        : value?.item[0].sender.name.split(' ')[0]
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 4,
          marginTop: 4,
        }}
      >
        {/* Item-L */}
        <View
          style={{
            justifyContent: 'flex-start',
            marginRight: 10,
            marginLeft: 20,
            width: 80,
          }}
        >
          {/* username */}
          <Text
            style={{
              color: color,
              fontFamily: 'Rubik_400Regular',
              fontSize: 14,
            }}
          >
            {name}
          </Text>
        </View>
        {/* Item-R */}
        <View
          style={{
            justifyContent: 'flex-start',
            width: 280,
          }}
        >
          {/* msg */}
          <Text
            style={{
              color: 'white',
              fontFamily: 'Rubik_400Regular',
              fontSize: 12,
            }}
          >
            {value?.item[0].message}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        // Showing loader while Join is under process
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color="#2471ED" />
        </View>
      ) : (
        <View style={{ flex: 1, position: 'relative' }}>
          {/* Header */}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingTop: '2%',
              paddingBottom: '2%',
              backgroundColor: 'white',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 22,
                marginRight: '2%',
              }}
            >
              PagalFan - Bakarr Room
            </Text>
            <Image source={require('./assets/gold-mic.png')} style={{ width: 30, height: 35, marginEnd: '1%' }} />
          </View>

          {/* Main -- Tiles  */}
          <View style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
            {trackIds.length > 0 ? (
              <FlatList
                centerContent={true}
                key={1}
                data={trackIds}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={_keyExtractor}
                // inverted={true}
                renderItem={_renderItem}
                contentContainerStyle={{
                  paddingBottom: 120,
                  flexGrow: Platform.OS === 'android' ? 1 : undefined,
                  justifyContent: Platform.OS === 'android' ? 'center' : undefined,
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 28, marginBottom: 32 }}>Welcome!</Text>
                <Text style={{ fontSize: 16 }}>You’re the first one here.</Text>
                <Text style={{ fontSize: 16 }}>Sit back and relax till the others join.</Text>
              </View>
            )}
          </View>

          {/* Footer */}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              width: windowWidth,
              padding: 10,
              backgroundColor: 'white',
            }}
          >
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '90%',
                borderColor: '#87CEEB',
                borderWidth: 1,
                borderRightWidth: 2.5,
                borderLeftWidth: 2.5,
              }}
            >
              <View>
                <TouchableHighlight onPress={toggleAudio}>
                  <View>
                    {muteStatus ? (
                      <Image source={require('./assets/mute.png')} style={{ width: 55, height: 60 }} />
                    ) : (
                      <Image source={require('./assets/unmute.png')} style={{ width: 55, height: 60 }} />
                    )}
                  </View>
                </TouchableHighlight>
              </View>

              <View>
                <TouchableHighlight onPress={handleChat} style={{}}>
                  <Image source={require('./assets/chat.png')} style={{ width: 55, height: 60 }} />
                </TouchableHighlight>
              </View>

              <View>
                <TouchableHighlight onPress={handleRoomEnd}>
                  <Image source={require('./assets/leave.png')} style={{ width: 55, height: 60 }} />
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <>
            {!viewChat ? null : (
              <Modal animationType={'slide'} transparent={true}>
                {/* main container */}
                <View
                  style={{
                    display: 'flex',
                    height: '80%',
                    marginTop: 'auto',
                    backgroundColor: '#171717',
                    flexDirection: 'column',
                  }}
                >
                  {/* Header + Line */}
                  <View
                    style={{
                      width: '100%',
                      height: '6%',
                      marginTop: '4%',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#3bc9ea',
                        fontWeight: '500',
                        fontSize: 18,
                        marginBottom: 2,
                      }}
                    >
                      Bakarr Chat
                    </Text>
                    <View
                      style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 3,
                        width: '90%',
                      }}
                    />
                  </View>

                  {/* Dynamic Comments */}
                  <View
                    style={{
                      width: '100%',
                      height: '70%',
                      alignItems: 'center',
                      marginTop: 3,
                    }}
                  >
                    {chatData.length > 0 ? (
                      <FlatList centerContent={true} data={chatData} renderItem={_renderItem2} />
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>No Chat</Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      height: '10%',
                      alignItems: 'center',
                      marginTop: 3,
                    }}
                  >
                    <TextInput
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'white',
                      }}
                      marginLeft="10%"
                      width="80%"
                      color="white"
                      onChangeText={onChangeText}
                      value={text}
                    ></TextInput>
                    <TouchableHighlight onPress={handleBrodcast} style={{ height: 20, marginTop: 5, marginLeft: 3 }}>
                      <Image source={require('./assets/send.png')} style={{ width: 25, height: 25 }} />
                    </TouchableHighlight>
                  </View>

                  {/* Footer --> Close Chat */}
                  <View
                    style={{
                      width: '100%',
                      marginTop: '1%',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 3,
                        width: '90%',
                        marginBottom: 1,
                      }}
                    />
                    <TouchableHighlight onPress={endChat} style={{ height: 'auto', marginTop: 5 }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'red',
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                      >
                        Close Chat
                      </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            )}
          </>
        </View>
      )}
    </View>
  )
}
//#endregion Screens

/**
 * Sets up HMSSDK instance, Adds required Event Listeners
 * Checkout Quick Start guide to know things covered {@link https://www.100ms.live/docs/react-native/v2/guides/quickstart | Quick Start Guide}
 */
const usePeerTrackNodes = ({ onConnectionError, username, roomCode }) => {
  const hmsInstanceRef = useRef(null) // We will save `hmsInstance` in this ref
  const [loading, setLoading] = useState(true)
  const [muteStatus, ChangeMuteStatus] = useState(false)
  const [peerTrackNodes, setPeerTrackNodes] = useState([]) // Use this state to render Peer Tiles
  const [trackIds, setTrackIds] = useState([])
  const [chatData, setChatData] = useState([])
  const [ID, setID] = useState('')
  /**
   * Handles Room leave process
   */
  const handleRoomLeave = async () => {
    try {
      const hmsInstance = hmsInstanceRef.current
      if (!hmsInstance) {
        return Promise.reject('HMSSDK instance is null')
      }
      // Removing all registered listeners
      hmsInstance.removeAllListeners()

      /**
       * Leave Room. For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/leave | Leave Room}
       */
      const leaveResult = await hmsInstance.leave()
      console.log('Leave Success: ', leaveResult)

      /**
       * Free/Release Resources. For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/release-resources | Release Resources}
       */
      const destroyResult = await hmsInstance.destroy()
      console.log('Destroy Success: ', destroyResult)

      // Removing HMSSDK instance
      hmsInstanceRef.current = null
    } catch (error) {
      console.log('Leave or Destroy Error: ', error)
    }
  }

  /**
   * Handles Join Update received from {@link HMSUpdateListenerActions.ON_JOIN} event listener
   * Receiving This event means User (that is Local Peer) has successfully joined room
   * @param {Object} data - object which has room object
   * @param {Object} data.room - current {@link HMSRoom | room} object
   */
  const onJoinSuccess = (data) => {
    /**
     * Checkout {@link HMSLocalPeer | HMSLocalPeer} Class
     */
    const { localPeer } = data.room

    // Creating or Updating Local Peer Tile

    // `updateNode` function updates "Track and Peer objects" in PeerTrackNodes and returns updated list.
    // if none exist then we are "creating a new PeerTrackNode with the received Track and Peer"
    setPeerTrackNodes((prevPeerTrackNodes) =>
      updateNode({
        nodes: prevPeerTrackNodes,
        peer: localPeer,
        track: localPeer.videoTrack,
        createNew: true,
      }),
    )
    setID(localPeer.peerID)
    // Turning off loading state on successful Room Room join
    setLoading(false)
  }
  const onRoomListener = (data) => {
    console.log('Changed')
  }
  const onChangeLocalAudioStats = (data) => {
    ChangeMuteStatus(data.track.isMute())
  }
  const onMessageReceived = (message) => {
    // console.log(message);
    setChatData((prevchatData) => [...prevchatData, [message]])
  }

  /**
   * Handles Peer Updates received from {@link HMSUpdateListenerActions.ON_PEER_UPDATE} event listener
   * @param {Object} data - This has updated peer and update type
   * @param {HMSPeer} data.peer - Updated Peer
   * @param {HMSPeerUpdate} data.type - Update Type
   */
  const onPeerListener = ({ peer, type }) => {
    // We will create Tile for the Joined Peer when we receive `HMSUpdateListenerActions.ON_TRACK_UPDATE` event.
    // Note: We are chosing to not create Tiles for Peers which does not have any tracks
    if (type === HMSPeerUpdate.PEER_JOINED) return

    if (type === HMSPeerUpdate.PEER_LEFT) {
      // Remove all Tiles which has peer same as the peer which just left the room.
      // `removeNodeWithPeerId` function removes peerTrackNodes which has given peerID and returns updated list.
      setPeerTrackNodes((prevPeerTrackNodes) => removeNodeWithPeerId(prevPeerTrackNodes, peer.peerID))
      return
    }

    if (peer.isLocal) {
      // Updating the LocalPeer Tile.
      // `updateNodeWithPeer` function updates Peer object in PeerTrackNodes and returns updated list.
      // if none exist then we are "creating a new PeerTrackNode for the updated Peer".
      setPeerTrackNodes((prevPeerTrackNodes) =>
        updateNodeWithPeer({ nodes: prevPeerTrackNodes, peer, createNew: true }),
      )
      return
    }

    if (
      type === HMSPeerUpdate.ROLE_CHANGED ||
      type === HMSPeerUpdate.METADATA_CHANGED ||
      type === HMSPeerUpdate.NAME_CHANGED ||
      type === HMSPeerUpdate.NETWORK_QUALITY_UPDATED
    ) {
      // Ignoring these update types because we want to keep this implementation simple.
      return
    }
  }

  /**
   * Handles Track Updates received from {@link HMSUpdateListenerActions.ON_TRACK_UPDATE} event listener
   * @param {Object} data - This has updated track with peer and update type
   * @param {HMSPeer} data.peer - Peer
   * @param {HMSTrack} data.track - Peer Track
   * @param {HMSTrackUpdate} data.type - Update Type
   */
  const onTrackListener = (data) => {
    // on TRACK_ADDED update
    // We will update Tile with the track or
    // create new Tile for with the track and peer
    // If Video track is added, add trackId to our list
    if (data.type === HMSTrackUpdate.TRACK_ADDED) setTrackIds((prevTrackIds) => [...prevTrackIds, data])

    if (data.type === HMSTrackUpdate.TRACK_MUTED || data.type === HMSTrackUpdate.TRACK_UNMUTED) {
      setTrackIds((prevTrackIds) =>
        prevTrackIds.filter((prevTrackId) => prevTrackId.track.trackId !== data.track.trackId),
      )
      setTrackIds((prevTrackIds) => [...prevTrackIds, data])
    }

    // If Video track is removed, remove trackId from our list
    if (data.type === HMSTrackUpdate.TRACK_REMOVED)
      setTrackIds((prevTrackIds) =>
        prevTrackIds.filter((prevTrackId) => prevTrackId.track.trackId !== data.track.trackId),
      )
  }

  /**
   * Handles Errors received from {@link HMSUpdateListenerActions.ON_ERROR} event listener
   * @param {HMSException} error
   *
   * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/error-handling | Error Handling}
   */
  const onErrorListener = (error) => {
    setLoading(false)

    console.log(`${error?.code} ${error?.description}`)
  }

  // Effect to handle HMSSDK initialization and Listeners Setup
  useEffect(() => {
    const joinRoom = async () => {
      try {
        setLoading(true)

        /**
         * creating {@link HMSSDK} instance to join room
         * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/join#join-a-room | Join a Room}
         */
        const hmsInstance = await HMSSDK.build()

        // Saving `hmsInstance` in ref
        hmsInstanceRef.current = hmsInstance

        let token = AUTH_TOKEN

        // if `AUTH_TOKEN` is not valid, generate auth token from `ROOM_CODE`
        if (!token) {
          token = await hmsInstance.getAuthTokenByRoomCode(roomCode)
        }

        /**
         * Adding HMSSDK Event Listeners before calling Join method on HMSSDK instance
         * For more info, Check out -
         * {@link https://www.100ms.live/docs/react-native/v2/features/join#update-listener | Adding Event Listeners before Join},
         * {@link https://www.100ms.live/docs/react-native/v2/features/event-listeners | Event Listeners},
         * {@link https://www.100ms.live/docs/react-native/v2/features/event-listeners-enums | Event Listeners Enums}
         */
        hmsInstance.addEventListener(HMSUpdateListenerActions.ON_JOIN, onJoinSuccess)

        hmsInstance.addEventListener(HMSUpdateListenerActions.ON_PEER_UPDATE, onPeerListener)

        hmsInstance.addEventListener(HMSUpdateListenerActions.ON_TRACK_UPDATE, onTrackListener)

        hmsInstance.addEventListener(HMSUpdateListenerActions.ON_ERROR, onErrorListener)

        hmsInstance.addEventListener(HMSUpdateListenerActions.ON_ROOM_UPDATE, onRoomListener)

        hmsInstance?.addEventListener(HMSUpdateListenerActions.ON_LOCAL_AUDIO_STATS, onChangeLocalAudioStats)

        hmsInstance.addEventListener(HMSUpdateListenerActions.ON_MESSAGE, onMessageReceived)

        /**
         * Joining Room. For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/features/join#join-a-room | Join a Room}
         */
        hmsInstance.join(new HMSConfig({ authToken: token, username: username }))
      } catch (error) {
        onConnectionError(error)
      }
    }

    joinRoom()

    // When effect unmounts for any reason, We are calling leave function
    return () => {
      handleRoomLeave()
    }
  }, [])
  return {
    loading,
    leaveRoom: handleRoomLeave,
    peerTrackNodes,
    hmsInstanceRef,
    muteStatus,
    ChangeMuteStatus,
    trackIds,
    chatData,
    setChatData,
    ID,
  }
}

//#region Utilities

/**
 * Function to check permissions
 * @param {string[]} permissions
 * @returns {boolean} all permissions granted or not
 */
export const checkPermissions = async (permissions) => {
  try {
    if (Platform.OS === 'ios') {
      return true
    }
    const requiredPermissions = permissions.filter(
      (permission) => permission.toString() !== PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    )

    const results = await requestMultiple(requiredPermissions)

    let allPermissionsGranted = true
    for (let permission in requiredPermissions) {
      if (!(results[requiredPermissions[permission]] === RESULTS.GRANTED)) {
        allPermissionsGranted = false
      }
      console.log(`${requiredPermissions[permission]} : ${results[requiredPermissions[permission]]}`)
    }

    // Bluetooth Connect Permission handling
    if (permissions.findIndex((permission) => permission.toString() === PERMISSIONS.ANDROID.BLUETOOTH_CONNECT) >= 0) {
      const bleConnectResult = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)
      console.log(`${PERMISSIONS.ANDROID.BLUETOOTH_CONNECT} : ${bleConnectResult}`)
    }

    return allPermissionsGranted
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * returns `uniqueId` for a given `peer` and `track` combination
 */

// export const getPeerTrackNodeId = (peer, track) => {
//     return peer.peerID + (track?.source ?? HMSTrackSource.REGULAR);
// };
export const getPeerTrackNodeId = (peer, track) => {
  return peer.peerID + track?.source
}

/**
 * creates `PeerTrackNode` object for given `peer` and `track` combination
 */
export const createPeerTrackNode = (peer, track) => {
  let isVideoTrack = false
  if (track && track?.type === HMSTrackType.VIDEO) {
    isVideoTrack = true
  }
  const videoTrack = isVideoTrack ? track : undefined
  return {
    id: getPeerTrackNodeId(peer, track),
    peer: peer,
    track: videoTrack,
  }
}

/**
 * Removes all nodes which has `peer` with `id` same as the given `peerID`.
 */
export const removeNodeWithPeerId = (nodes, peerID) => {
  return nodes.filter((node) => node.peer.peerID !== peerID)
}

/**
 * Updates `peer` of `PeerTrackNode` objects which has `peer` with `peerID` same as the given `peerID`.
 *
 * If `createNew` is passed as `true` and no `PeerTrackNode` exists with `id` same as `uniqueId` generated from given `peer` and `track`
 * then new `PeerTrackNode` object will be created.
 */
export const updateNodeWithPeer = (data) => {
  const { nodes, peer, createNew = false } = data

  const peerExists = nodes.some((node) => node.peer.peerID === peer.peerID)

  if (peerExists) {
    return nodes.map((node) => {
      if (node.peer.peerID === peer.peerID) {
        return { ...node, peer }
      }
      return node
    })
  }

  if (!createNew) return nodes

  if (peer.isLocal) {
    return [createPeerTrackNode(peer), ...nodes]
  }

  return [...nodes, createPeerTrackNode(peer)]
}

/**
 * Removes all nodes which has `id` same as `uniqueId` generated from given `peer` and `track`.
 */
export const removeNode = (nodes, peer, track) => {
  const uniqueId = getPeerTrackNodeId(peer, track)

  return nodes.filter((node) => node.id !== uniqueId)
}

/**
 * Updates `track` and `peer` of `PeerTrackNode` objects which has `id` same as `uniqueId` generated from given `peer` and `track`.
 *
 * If `createNew` is passed as `true` and no `PeerTrackNode` exists with `id` same as `uniqueId` generated from given `peer` and `track`
 * then new `PeerTrackNode` object will be created
 */
export const updateNode = (data) => {
  const { nodes, peer, track, createNew = false } = data

  const uniqueId = getPeerTrackNodeId(peer, track)

  const nodeExists = nodes.some((node) => node.id === uniqueId)

  if (nodeExists) {
    return nodes.map((node) => {
      if (node.id === uniqueId) {
        return { ...node, peer, track }
      }
      return node
    })
  }

  if (!createNew) return nodes

  if (peer.isLocal) {
    return [createPeerTrackNode(peer, track), ...nodes]
  }

  return [...nodes, createPeerTrackNode(peer, track)]
}

//#endregion Utility
