import * as React from 'react';
import { useState } from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, FlatList, Icon } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Tạo Stack Navigator
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      {/* Dòng chữ */}
      <Text style={styles.title1}>A premium online store for</Text>
      <Text style={styles.title1}>sporter and their stylish choice </Text>

      {/* Bức ảnh */}
      <Image source={require('./assets/anhHome.jpeg')} style={styles.image} />

      <Text style={styles.title}>POWER BIKE</Text>
      <Text style={styles.title}>SHOP</Text>

      {/* Nút Get Started */}
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Screen1', { userName: name })}
      />
    </View>
  );
}

function Screen1({ route, navigation }) {
  const { userName } = route.params;

  const bikes = [
    { id: '1', name: 'Pinarello', price: 1800, image: require('./assets/bike1.jpg') },
    { id: '2', name: 'Pina Mountai', price: 1700, image: require('./assets/bike2.jpg') },
    { id: '3', name: 'Pina Bike', price: 1500, image: require('./assets/bike3.jpg') },
    { id: '4', name: 'Pina Minh Thật', price: 1900, image: require('./assets/bike4.jpg') },
    { id: '5', name: 'Pinarello', price: 2700, image: require('./assets/bike5.jpeg') },
    { id: '6', name: 'Pinarello', price: 1350, image: require('./assets/bike6.jpeg') },
  ];
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id], 
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bikeCard}
      onPress={() => navigation.navigate('Screen2', { bike: item })}
    >
      <Image source={item.image} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>${item.price}</Text>
      {/* <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => toggleFavorite(item.id)}
      >
        <Icon
          name={favorites[item.id] ? 'favorite' : 'favorite-border'} // Filled heart if favorite, else outlined
          size={24}
          color={favorites[item.id] ? 'red' : 'gray'}
        />
      </TouchableOpacity>*/}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The World's Best Bike</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Roadbike</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Mountain</Text></TouchableOpacity>
      </View>
      <FlatList
        data={bikes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.bikeList}
      />
    </View>
  );
}

function Screen2({ route, navigation }) {
  const { bike } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bike Details</Text>
      <Image source={bike.image} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{bike.name}</Text>
      <Text style={styles.bikePrice}>Price: ${bike.price}</Text>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.textdescription}>It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.</Text>
      <Button title="Add to card" / >
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Ensures equal spacing between the buttons
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  bikeList: {
    justifyContent: 'center',
  },
  bikeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bikeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  bikePrice: {
    fontSize: 14,
    color: '#ff6600',
  },
  description: {
    fontSize: 16,
    marginTop: 15,
  },
  textdescription:{
    fontSize: 14,
    marginTop: 15,
    marginBottom: 20,
    color: "gray",
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
