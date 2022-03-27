import {FlatList} from 'react-native';
import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {CHANNELS} from '../../config/app.config';
import {ItemList, TextListChanel} from '../../styles/SelectListStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  setIsChannelSelect: Dispatch<SetStateAction<boolean>>;
  isChannelSelect: boolean;
  setChannelSelected: Dispatch<SetStateAction<string>>;
  setChannelIdSelected: Dispatch<SetStateAction<string>>;
  changeChannelHandle: Function;
}

const SelectChannel: FC<Props> = ({
  setIsChannelSelect,
  isChannelSelect,
  setChannelSelected,
  setChannelIdSelected,
  changeChannelHandle,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);

  useEffect(() => {
    if (isChannelSelect) {
      handlePresentModalPress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChannelSelect]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const renderItem = ({item}: any) => {
    return (
      <ItemList
        onPress={() => handleUserSelected(item.channelId, item.name)}
        activeOpacity={0.7}>
        <TextListChanel>{item.name}</TextListChanel>
      </ItemList>
    );
  };

  // callbacks
  const storeDataChannel = async (channelId: string, name: string) => {
    try {
      await AsyncStorage.setItem('@channel_Id', channelId);
      await AsyncStorage.setItem('@channel_Name', name);
    } catch (e) {
      console.log(JSON.stringify(e));
      // saving error
    }
  };

  const handleUserSelected = (
    channelId: React.SetStateAction<string>,
    name: React.SetStateAction<string>,
  ) => {
    setChannelSelected(name);
    setChannelIdSelected(channelId);
    changeChannelHandle(channelId);
    storeDataChannel(channelId, name);
    sheetRef.current?.close();
  };
  const handleSheetChange = useCallback(index => {
    if (index <= 0) {
      sheetRef.current?.close();
      setIsChannelSelect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);
  return (
    <BottomSheetModal
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}>
      <FlatList
        data={CHANNELS}
        renderItem={renderItem}
        keyExtractor={item => item.channelId}
      />
    </BottomSheetModal>
  );
};

export default SelectChannel;
