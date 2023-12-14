/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import CheckBox from '@react-native-community/checkbox';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {
  const [data, setData] = useState([
    {id: '1', text: 'Item 1', checked: false},
    {id: '2', text: 'Item 2', checked: false},
    {id: '3', text: 'Item 3', checked: false},
    // Add more items as needed
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

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

  const renderItem = ({item}) => (
    <Pressable
      style={[
        styles.itemContainer,
        selectedItems.includes(item.id) && styles.selectedItem,
      ]}
      onLongPress={() => handleLongPress(item.id)}>
      <Text style={styles.itemText}>{item.text}</Text>
      {selectedItems.length > 0 ? (
        <CheckBox
          value={selectedItems.includes(item.id) ? true : false}
          onValueChange={() => onCheckBoxChanges(item.id)}
        />
      ) : null}
    </Pressable>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
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
              <Text>Awesome 🎉</Text>
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
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
