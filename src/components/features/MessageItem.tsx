import {Text} from 'react-native';
import React, {FC} from 'react';
import {USERS} from '../../config/app.config';
import {
  ChatBoxLeft,
  ChatBoxRight,
  ChatBoxTimeStamp,
  ChatBoxMessage,
  ChatBoxUserInfo,
  ChatBoxUserName,
  TriangleRight,
  TriangleLeft,
  ChatBoxPassIcon,
  ChatBoxSentStatus,
  ChatBoxErrorIcon,
  ChatBoxPass,
  ChatBoxError,
  Avatar,
} from '../../styles/MessageItemStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faWarning} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
const FORMATTIME = 'HH:mm';

interface Props {
  userId: string;
  userIdActive: string;
  text: string;
  messageId: string;
  datetime: string;
  status: string | null;
}

const MessageItem: FC<Props> = ({
  userId,
  userIdActive,
  text,
  datetime,
  status,
}) => {
  const getUserImage = (userIdfinding: string) => {
    const userInfo = USERS.find(user => user.userId === userIdfinding);
    return userInfo?.avatar;
  };
  if (userId === userIdActive) {
    return (
      <ChatBoxRight>
        <ChatBoxTimeStamp>
          {moment(datetime).format(FORMATTIME)}
        </ChatBoxTimeStamp>
        {status !== 'erorr' && (
          <ChatBoxPass>
            <ChatBoxPassIcon>
              <FontAwesomeIcon icon={faCheck} color={'#fff'} />
            </ChatBoxPassIcon>
            <ChatBoxSentStatus>Sent</ChatBoxSentStatus>
          </ChatBoxPass>
        )}
        {status === 'erorr' && (
          <ChatBoxError>
            <ChatBoxErrorIcon>
              <FontAwesomeIcon icon={faWarning} color={'#fff'} />
            </ChatBoxErrorIcon>
            <ChatBoxSentStatus>Error</ChatBoxSentStatus>
          </ChatBoxError>
        )}
        <ChatBoxMessage>
          <Text>{text}</Text>
        </ChatBoxMessage>
        <TriangleRight />
        <ChatBoxUserInfo>
          <Avatar source={getUserImage(userId)} />
          <ChatBoxUserName>{userId}</ChatBoxUserName>
        </ChatBoxUserInfo>
      </ChatBoxRight>
    );
  }
  return (
    <ChatBoxLeft>
      <ChatBoxUserInfo>
        <Avatar source={getUserImage(userId)} />
        <ChatBoxUserName>{userId}</ChatBoxUserName>
      </ChatBoxUserInfo>
      <TriangleLeft />
      <ChatBoxMessage>
        <Text>{text}</Text>
      </ChatBoxMessage>
      <ChatBoxTimeStamp>{moment(datetime).format(FORMATTIME)}</ChatBoxTimeStamp>
    </ChatBoxLeft>
  );
};

export default MessageItem;
