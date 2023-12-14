/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [data, setData] = useState([
    {id: '1', text: 'Item 1', checked: false},
    {id: '2', text: 'Item 2', checked: false},
    {id: '3', text: 'Item 3', checked: false},
    // Add more items as needed
  ]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [selectedItems, setSelectedItems] = useState([]);

  const handleLongPress = id => {
    const newSelectedItems = [...selectedItems, id];
    setSelectedItems(newSelectedItems);
  };

  const handleCheckBoxPress = id => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter(item => item.id !== id)
      : [...selectedItems, id];
    setSelectedItems(...newSelectedItems);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItems.includes(item.id) && styles.selectedItem,
      ]}
      onLongPress={() => handleLongPress(item.id)}>
      <Text style={styles.itemText}>{item.text}</Text>
      {selectedItems.includes(item.id) && (
        <TouchableOpacity
          style={styles.checkBox}
          onPress={() => handleCheckBoxPress(item.id)}>
          <Text>✓</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
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
});

export default App;
