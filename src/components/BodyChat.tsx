import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {Text} from 'react-native';
import MessageItem from './features/MessageItem';
import {APPCONSTANTS} from '../constants/app.const';
import {POST_MESSAGE} from '../services/graphql.service';
import {useMutation} from '@apollo/client';
import {
  Readmore,
  NotHaveMessage,
  ScrollViewMessage,
  WriteMessage,
  SubmitMessage,
  TextInputMessage,
  SubmitText,
} from '../styles/MessageItemStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  message: {
    userId: string;
    text: string;
    messageId: string;
    datetime: string;
    status: string | null;
  }[];
}

interface Props {
  channelIdSelected: string;
  userSelected: string;
  messageList: Message['message'];
  setMessageList: Dispatch<SetStateAction<any[]>>;
  setNewestMessageId: Dispatch<SetStateAction<string>>;
  manageGetMoreMessage: Function;
  messageLoading: boolean;
}

const BodyChat: FC<Props> = ({
  channelIdSelected,
  messageList,
  userSelected,
  setMessageList,
  manageGetMoreMessage,
  setNewestMessageId,
  messageLoading,
}) => {
  const messageRef = useRef<any>(null);
  const [firstLoad, setfirstLoad] = useState<boolean>(true);
  const [postMessage, {error, data}] = useMutation(POST_MESSAGE);
  const [messageSending, setMessageSending] = useState<string>('');
  const [copyMessageSending, setCopyMessageSending] = useState<string>('');

  const getData = async () => {
    try {
      const assLastHoldingMsg = await AsyncStorage.getItem('@last_Hold_Msg');
      setMessageSending(assLastHoldingMsg !== null ? assLastHoldingMsg : '');
      setCopyMessageSending(
        assLastHoldingMsg !== null ? assLastHoldingMsg : '',
      );
    } catch (e) {
      console.log('error');
      // error reading value
    }
  };

  const storeDataMessage = async (message: string) => {
    try {
      await AsyncStorage.setItem('@last_Hold_Msg', message);
    } catch (e) {
      console.log(JSON.stringify(e));
      // saving error
    }
  };

  const messageSendingHandle = (val: React.SetStateAction<string>) => {
    setMessageSending(val);
    setCopyMessageSending(val);
    storeDataMessage(val);
  };

  const loadMore = (old: boolean) => {
    manageGetMoreMessage(old, channelIdSelected);
  };

  useEffect(() => {
    if (firstLoad) {
      getData();
      setfirstLoad(false);
    }
    if (error) {
      errorMessageHandle();
    }
    if (data) {
      successMessageHandle(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data, firstLoad]);

  const successMessageHandle = (msg: any) => {
    let successMessage: object = {
      userId: msg.postMessage.userId,
      text: msg.postMessage.text,
      messageId: msg.postMessage.messageId,
      datetime: msg.postMessage.datetime,
      status: 'success',
    };
    setMessageList([...messageList, successMessage]);
    setNewestMessageId(msg.postMessage.messageId);
    setMessageSending('');
    setCopyMessageSending('');
    storeDataMessage('');
    goToButtom();
  };
  const errorMessageHandle = () => {
    let errorMessage: object = {
      userId: userSelected,
      text: copyMessageSending,
      messageId: 'erorr_' + Math.random().toString(),
      datetime: new Date(),
      status: 'erorr',
    };
    setMessageList([...messageList, errorMessage]);

    goToButtom();
  };

  const postMessageHandle = () => {
    postMessage({
      variables: {
        channelId: channelIdSelected,
        text: messageSending,
        userId: userSelected,
      },
    });
  };

  const goToButtom = () => {
    messageRef.current.scrollToEnd({animated: true});
  };

  return (
    <>
      <ScrollViewMessage ref={messageRef}>
        {messageLoading && (
          <NotHaveMessage>{APPCONSTANTS.APP_LOADING}</NotHaveMessage>
        )}
        {!messageLoading && messageList.length <= 0 && (
          <NotHaveMessage>{APPCONSTANTS.APP_NO_MESSAGE}</NotHaveMessage>
        )}
        {!messageLoading && messageList.length > 0 && (
          <Readmore onPress={() => loadMore(true)}>
            <Text>{APPCONSTANTS.APP_READ_MORE}</Text>
            <FontAwesomeIcon icon={faArrowUp} />
          </Readmore>
        )}
        {messageList.map(({userId, text, messageId, datetime, status}) => (
          <MessageItem
            key={messageId}
            userId={userId}
            text={text}
            messageId={messageId}
            datetime={datetime}
            status={status}
            userIdActive={userSelected}
          />
        ))}
        <Readmore onPress={() => loadMore(false)}>
          <Text>{APPCONSTANTS.APP_READ_MORE}</Text>
          <FontAwesomeIcon icon={faArrowDown} />
        </Readmore>
      </ScrollViewMessage>
      <WriteMessage>
        <TextInputMessage
          onChangeText={messageSendingHandle}
          value={messageSending}
          placeholder={APPCONSTANTS.APP_MESSAGE_PLACEHOLDER}
          multiline
          numberOfLines={3}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <SubmitMessage onPress={postMessageHandle} activeOpacity={0.7}>
          <SubmitText>{APPCONSTANTS.APP_SENT_MESSAGE}</SubmitText>
        </SubmitMessage>
      </WriteMessage>
    </>
  );
};

export default BodyChat;
