/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import CheckBox from '@react-native-community/checkbox';
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

// const userState = atom({
//   key: 'userState', // unique ID (with respect to other atoms/selectors)
//   default: [], // default value (aka initial value)
// });
function App(): React.JSX.Element {
  // const [users, setUsers] = useRecoilState(userState);
  const [susers, setSUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(res => {
          setSUsers(res.users);
        });
    };
    fetchData();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '25%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleLongPress = id => {
    const newSelectedItems = [...selectedItems, id];
    setSelectedItems(newSelectedItems);
  };

  const onCheckBoxChanges = id => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id];
    if (newSelectedItems.length === 0) {
    }
    setSelectedItems(newSelectedItems);
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          styles.shadowProp,
          selectedItems.includes(item.id) && styles.selectedItem,
        ]}
        onLongPress={() => handleLongPress(item.id)}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={{height: 60, width: 60, borderRadius: 60 / 2}}
              source={{uri: item.image}}
            />
            {selectedItems.length > 0 ? (
              <CheckBox
                style={{marginTop: -54}}
                value={selectedItems.includes(item.id) ? true : false}
                onValueChange={() => onCheckBoxChanges(item.id)}
                tintColor="#6C63FF"
                onCheckColor='"#6C63FF"'
                tintColors={{true: '#6C63FF', false: '#6C63FF'}}
              />
            ) : null}
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={styles.itemText}>{item.firstName}</Text>
            <Text style={styles.itemText}>{item.address.address}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderBottomSheetContents = () => {
    switch (selectedItems.length) {
      case 0:
        return null;
      case 1:
        return (
          <>
            <Text>
              {susers.find(item => item.id === selectedItems[0]).firstName}
            </Text>
            <Text>
              {susers.find(item => item.id === selectedItems[0]).firstName}'s
              Friends
            </Text>
          </>
        );
      default:
        return (
          <>
            <Text>
              {susers.find(item => item.id === selectedItems[0]).firstName},
              {susers.find(item => item.id === selectedItems[1]).firstName},
              {selectedItems.length > 2 ? selectedItems.length - 2 + '+' : null}
            </Text>
            <Text>Their Friends</Text>
          </>
        );
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={susers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <Text>Data is Loading</Text>}
        />
        {selectedItems.length > 0 ? (
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text style={{color: '#6C63FF', fontSize: 16}}>Hang With</Text>
              {renderBottomSheetContents()}
            </View>
          </BottomSheet>
        ) : null}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 20,
    marginVertical: 5,
  },
  selectedItem: {
    borderColor: '#6C63FF',
    borderWidth: 3,
  },
  itemText: {
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default App;
