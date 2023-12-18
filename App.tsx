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
          selectedItems.includes(item.id) && styles.selectedItem,
        ]}
        onLongPress={() => handleLongPress(item.id)}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 30, width: 30, borderRadius: 30 / 2}}
            source={{uri: item.image}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.itemText}>{item.firstName}</Text>
            <Text style={styles.itemText}>{item.address.address}</Text>
          </View>
        </View>

        {selectedItems.length > 0 ? (
          <CheckBox
            value={selectedItems.includes(item.id) ? true : false}
            onValueChange={() => onCheckBoxChanges(item.id)}
          />
        ) : null}
      </Pressable>
    );
  };

  const renderBottomSheetContents = () => {
    console.log(`selectedItems:${JSON.stringify(selectedItems)}`);
    if (selectedItems.length === 1) {
      console.log(susers.find(item => item.id === selectedItems[0]).firstName);
    } else {
      console.log(
        susers.find(item => item.id === selectedItems[0]).firstName +
          '---' +
          susers.find(item => item.id === selectedItems[1]).firstName,
      );
    }
    return <Text>{selectedItems.length}</Text>;
    // switch (selectedItems.length) {
    //   case 0:
    //     return (
    //       <>
    //         <Text>{susers[selectedItems[0]].firstName}</Text>
    //         <Text>{susers[selectedItems[0]].firstName}+s Friends</Text>
    //       </>
    //     );
    //   default:
    //     return (
    //       <>
    //         <Text>
    //           {susers[selectedItems[0].firstName]},
    //           {susers[selectedItems[1].firstName]}
    //         </Text>
    //         <Text>Their Friends</Text>
    //       </>
    //     );
    // }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>Hello</Text>
        <FlatList
          style={{backgroundColor: 'green'}}
          data={susers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {selectedItems.length > 0 ? (
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text>Hang With</Text>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'red',
  },
  itemContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'blue',
  },
  selectedItem: {
    backgroundColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 18,
  },
  checkBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    alignItems: 'center',
  },
});

export default App;
