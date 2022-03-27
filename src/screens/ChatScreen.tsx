import {SafeAreaView} from 'react-native';
import React, {useState, FC, useEffect} from 'react';
import HeaderChat from '../components/HeaderChat';
import BodyChat from '../components/BodyChat';
import SelectUser from '../components/features/SelectUser';
import SelectChannel from '../components/features/SelectChannel';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {USERS, CHANNELS} from '../config/app.config';
import {useLazyQuery} from '@apollo/client';
import {
  FETCH_LAST_MESSAGE,
  FETCH_MORE_MESSAGE,
} from '../services/graphql.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen: FC = () => {
  const [isFirstload, setIsFirstload] = useState<boolean>(true);
  const [lastHoldingMsg, setLastHoldingMsg] = useState<string>('');
  const [userSelected, setUserSelected] = useState<string>('');
  const [userAvatarSelected, setUserAvatarSelected] = useState<any>('');
  const [channelSelected, setChannelSelected] = useState<string>('');
  const [channelIdSelected, setChannelIdSelected] = useState<string>('');
  const [isUserSelect, setIsUserSelect] = useState<boolean>(false);
  const [isChannelSelect, setIsChannelSelect] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [oldestMessageId, setOldestMessageId] = useState<string>('');
  const [newestMessageId, setNewestMessageId] = useState<string>('');
  const [intervalID, setIntervalID] = useState<any>(null);
  const [getMessage, {loading, data}] = useLazyQuery(FETCH_LAST_MESSAGE);
  const [getMoreMessage] = useLazyQuery(FETCH_MORE_MESSAGE, {
    onCompleted: res => {
      manageMessage(res.fetchMoreMessages);
    },
  });

  useEffect(() => {
    getMessage({variables: {channelId: channelIdSelected}});
    if (isFirstload) {
      getData();
      setIsFirstload(false);
    }
    if (data) {
      manageMessage(data.fetchLatestMessages);
    }
  }, [data, getMessage, isFirstload]);

  useEffect(() => {
    startIntervalChat(channelIdSelected, newestMessageId);
  }, [newestMessageId]);

  const startIntervalChat = (channelId: string, newestMessageId: string) => {
    clearInterval(intervalID);
    const newIntervalId = setInterval(() => {
      getMoreMessage({
        variables: {
          channelId: channelId,
          messageId: newestMessageId,
          old: false,
        },
      });
    }, 5000);
    setIntervalID(newIntervalId);
  };

  const getData = async () => {
    try {
      const assUserName = await AsyncStorage.getItem('@user_Name');
      const assChannelId = await AsyncStorage.getItem('@channel_Id');
      const assChannelName = await AsyncStorage.getItem('@channel_Name');
      const assLastHoldingMsg = await AsyncStorage.getItem('@last_Hold_Msg');
      setUserSelected(assUserName !== null ? assUserName : USERS[0].userId);
      setChannelIdSelected(
        assChannelId !== null ? assChannelId : CHANNELS[0].channelId,
      );
      setChannelSelected(
        assChannelName !== null ? assChannelName : CHANNELS[0].name,
      );
      setLastHoldingMsg(assLastHoldingMsg !== null ? assLastHoldingMsg : '');
      getMessage({variables: {channelId: assChannelId}});
    } catch (e) {
      console.log('error');
      // error reading value
    }
  };

  const manageMessage = (messageComing: any) => {
    if (messageComing == null || messageComing.length <= 0) {
      return false;
    } else {
      const items = [...messageList, ...messageComing];
      items.sort(
        (a, b) =>
          new Date(a.datetime).valueOf() - new Date(b.datetime).valueOf(),
      );
      if (items.length > 0) {
        setOldestMessageId(items[0].messageId);
        for (let i = items.length - 1; i > 0; i--) {
          if (items[i].status !== 'erorr') {
            setNewestMessageId(items[i].messageId);
            break;
          }
        }
      }
      setMessageList(items);
    }
  };

  const manageGetMoreMessage = (old: boolean, channelId: string) => {
    getMoreMessage({
      variables: {
        channelId: channelId,
        messageId: old ? oldestMessageId : newestMessageId,
        old: old,
      },
    });
  };

  const changeChannelHandle = (channelId: string) => {
    setMessageList([]);
    getMessage({variables: {channelId: channelId}});
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <HeaderChat
            setIsUserSelect={setIsUserSelect}
            userSelected={userSelected}
            channelSelected={channelSelected}
            setIsChannelSelect={setIsChannelSelect}
          />
          <BodyChat
            messageList={messageList}
            userSelected={userSelected}
            channelIdSelected={channelIdSelected}
            setMessageList={setMessageList}
            setNewestMessageId={setNewestMessageId}
            messageLoading={loading}
            manageGetMoreMessage={manageGetMoreMessage}
            lastHoldingMsg={lastHoldingMsg}
          />
          <SelectUser
            onOpenSelectUser={isUserSelect}
            setIsUserSelect={setIsUserSelect}
            setUserSelected={setUserSelected}
            setUserAvatarSelected={setUserAvatarSelected}
          />
          <SelectChannel
            isChannelSelect={isChannelSelect}
            setIsChannelSelect={setIsChannelSelect}
            setChannelSelected={setChannelSelected}
            setChannelIdSelected={setChannelIdSelected}
            changeChannelHandle={changeChannelHandle}
          />
        </BottomSheetModalProvider>
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;
