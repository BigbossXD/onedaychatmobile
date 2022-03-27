import styled from 'styled-components/native';

export const HeaderSession = styled.View({
  backgroundColor: 'pink',
});

export const HeaderRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

export const HeaderAvatar = styled.Image({
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 4,
});

export const HeaderUserInfo = styled.TouchableOpacity({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  margin: 10,
  padding: 6,
  backgroundColor: '#fff',
  borderRadius: 10,
  height: 50,
});

export const HeaderChannelInfo = styled.TouchableOpacity({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  margin: 10,
  padding: 6,
  backgroundColor: '#fff',
  borderRadius: 10,
  height: 50,
});

export const ChannelText = styled.Text({
  marginLeft: 4,
});
