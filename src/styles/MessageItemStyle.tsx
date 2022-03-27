import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const ChatBoxRight = styled.View({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  justifyContent: 'flex-end',
});
export const ChatBoxLeft = styled.View({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
});
export const ChatBoxTimeStamp = styled.Text({
  fontSize: 14,
  margin: 4,
});
export const ChatBoxMessage = styled.View({
  backgroundColor: '#fff',
  borderRadius: 4,
  padding: 10,
  whiteSpace: 'pre-line',
  alignSelf: 'flex-start',
  minHeight: 60,
  minWidth: 100,
  width: windowWidth - 180,
});
export const ChatBoxUserInfo = styled.View({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'flex-start',
});
export const ChatBoxUserName = styled.Text({
  fontSize: 16,
  color: '#999999',
});
export const ChatBoxPass = styled.View({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 4,
});
export const ChatBoxPassIcon = styled.View({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9ec94a',
  width: 20,
  height: 20,
  borderRadius: 10,
});
export const ChatBoxError = styled.View({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 4,
});
export const ChatBoxErrorIcon = styled.View({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#b71e3c',
  width: 20,
  height: 20,
  borderRadius: 10,
});
export const ChatBoxSentStatus = styled.Text({
  fontSize: 16,
  color: '#999999',
});
export const Avatar = styled.Image({
  width: 50,
  height: 50,
  borderRadius: 25,
});

export const TriangleRight = styled.View({
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 10,
  borderTopWidth: 10,
  borderBottomWidth: 10,
  borderLeftColor: '#fff',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  alignSelf: 'flex-start',
  marginTop: 8,
});
export const TriangleLeft = styled.View({
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderRightWidth: 10,
  borderTopWidth: 10,
  borderBottomWidth: 10,
  borderRightColor: '#fff',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  alignSelf: 'flex-start',
  marginTop: 8,
});

export const Readmore = styled.TouchableOpacity({
  padding: 4,
  backgroundColor: '#fff',
  marginTop: 10,
  marginBottom: 10,
  borderRadius: 6,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 3.84,
});

export const SubmitText = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  color: 'pink',
});

export const NotHaveMessage = styled.Text({
  fontSize: 16,
  color: '#999999',
  marginTop: 10,
});

export const ScrollViewMessage = styled.ScrollView({
  backgroundColor: '#FDEFEF',
  flex: 1,
  paddingLeft: 10,
  paddingRight: 10,
});

export const WriteMessage = styled.View({
  backgroundColor: 'pink',
  padding: 10,
});

export const SubmitMessage = styled.TouchableOpacity({
  padding: 10,
  backgroundColor: '#FDEFEF',
  marginTop: 10,
  marginBottom: 4,
  borderRadius: 6,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },

  shadowRadius: 3.84,
});

export const TextInputMessage = styled.TextInput({
  height: 66,
  padding: 10,
  backgroundColor: '#FDEFEF',
  marginTop: 10,
  marginBottom: 4,
  borderRadius: 6,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },

  shadowRadius: 3.84,
});
