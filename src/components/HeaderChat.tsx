import {Text} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  HeaderSession,
  HeaderRow,
  HeaderAvatar,
  HeaderUserInfo,
  HeaderChannelInfo,
  ChannelText,
} from '../styles/HeaderStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faGlobe} from '@fortawesome/free-solid-svg-icons';
import {USERS} from '../config/app.config';

interface Props {
  userSelected: string;
  setIsUserSelect: Dispatch<SetStateAction<boolean>>;
  channelSelected: string;
  setIsChannelSelect: Dispatch<SetStateAction<boolean>>;
}

const HeaderChat: FC<Props> = ({
  setIsUserSelect,
  userSelected,
  channelSelected,
  setIsChannelSelect,
}) => {
  const getUserImage = (userIdfinding: string) => {
    const userInfo = USERS.find(user => user.userId === userIdfinding);
    return userInfo?.avatar;
  };

  return (
    <HeaderSession>
      <HeaderRow>
        <HeaderUserInfo
          activeOpacity={0.7}
          onPress={() => {
            setIsUserSelect(true);
          }}>
          <HeaderAvatar source={getUserImage(userSelected)} />
          <Text>{userSelected}</Text>
          <FontAwesomeIcon icon={faCaretDown} />
        </HeaderUserInfo>
        <HeaderChannelInfo
          activeOpacity={0.7}
          onPress={() => {
            setIsChannelSelect(true);
          }}>
          <FontAwesomeIcon size={30} icon={faGlobe} />
          <ChannelText>{channelSelected}</ChannelText>
          <FontAwesomeIcon icon={faCaretDown} />
        </HeaderChannelInfo>
      </HeaderRow>
    </HeaderSession>
  );
};

export default HeaderChat;
