import styled from 'styled-components/native';

export const ItemList = styled.TouchableOpacity({
  backgroundColor: 'pink',
  borderRadius: 10,
  padding: 6,
  marginVertical: 4,
  marginHorizontal: 10,
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },

  shadowRadius: 3.84,
});

export const AvatarList = styled.Image({
  width: 60,
  height: 60,
  borderRadius: 30,
  marginRight: 10,
});

export const TextList = styled.Text({
  fontSize: 26,
});
export const TextListChanel = styled.Text({
  fontSize: 26,
  padding: 10,
});
