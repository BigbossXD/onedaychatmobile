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
import {USERS} from '../../config/app.config';
import {AvatarList, ItemList, TextList} from '../../styles/SelectListStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  setIsUserSelect: Dispatch<SetStateAction<boolean>>;
  setUserSelected: Dispatch<SetStateAction<string>>;
  setUserAvatarSelected: Dispatch<SetStateAction<any>>;
  onOpenSelectUser: boolean;
}

const SelectUser: FC<Props> = ({
  setIsUserSelect,
  setUserSelected,
  onOpenSelectUser,
  setUserAvatarSelected,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);

  useEffect(() => {
    if (onOpenSelectUser) {
      handlePresentModalPress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOpenSelectUser]);

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
        onPress={() => handleUserSelected(item.userId, item.avatar)}
        activeOpacity={0.7}>
        <AvatarList source={item.avatar} />
        <TextList>{item.userId}</TextList>
      </ItemList>
    );
  };

  // callbacks
  const storeDataUser = async (userId: string) => {
    try {
      await AsyncStorage.setItem('@user_Name', userId);
    } catch (e) {
      console.log(JSON.stringify(e));
      // saving error
    }
  };
  const handleUserSelected = (
    userId: React.SetStateAction<string>,
    avatar: React.SetStateAction<string>,
  ) => {
    setUserSelected(userId);
    setUserAvatarSelected(avatar);
    storeDataUser(userId);
    sheetRef.current?.close();
  };
  const handleSheetChange = useCallback(index => {
    if (index <= 0) {
      sheetRef.current?.close();
      setIsUserSelect(false);
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
        data={USERS}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
      />
    </BottomSheetModal>
  );
};

export default SelectUser;
