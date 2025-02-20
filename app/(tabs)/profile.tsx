import { StyleSheet, Image, Platform, Text, Button, FlatList, View, Alert } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Avatar } from '@rneui/themed';
import { AirbnbRating } from '@rneui/themed';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { router } from 'expo-router';


export default function Profile() {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext); // Access the logout function from the context

  let accountName = "placeholder";
  const accountCreated = '01/01/2025';
  const accountRating = 4;

  if (user) {
    accountName = user.name;
  }

  const handleLogout = async () => {

    try {
      await logout(); // Call the logout function from the context
      router.push("/(tabs)/loginScreen"); // Navigate after successful login
    } catch (error: any) {
      console.error("LogoutError:", error);
      Alert.alert('Error', error.message);
    }

  };

  //TODO: Placeholder Data: move this to pull from database
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Great Guy',
      content: "This is my positive review of bob, he's a great guy",
      rating: 5,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Awesome Dude',
      content: "This is my positive review of bob, he's a very nice man",
      rating: 4,

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Great Route',
      content: "This is my positive review of bob, he's a great guy and makes good routes",
      rating: 5,

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Rude',
      content: "This is my negative review of bob, he's a bad guy",
      rating: 2,

    },
  ];

  type ItemProps = { title: string, content: string, rating: number };

  const Item = ({ title, content, rating }: ItemProps) => (
    <View >
      <Text style={{ color: 'white', fontSize: 24 }}>{title}</Text>
      <Text style={{ color: 'white', fontSize: 10 }}>Rating: {rating}/5</Text>
      <Text style={{ color: 'white' }}>{content}</Text>
    </View>
  );

  return (
    <ThemedView>
      <Avatar
        size={150}
        rounded
        source={require('@/assets/images/avatar.png')}
        title="BP"
        containerStyle={{ backgroundColor: "blue" }}
      />
      <ThemedText type="title">{accountName}</ThemedText>
      <ThemedText>Account Created: {accountCreated}</ThemedText>
      <AirbnbRating
        isDisabled={true}
        defaultRating={accountRating}
        size={12}
      />
      <ThemedText>Rating: {accountRating}/5</ThemedText>
      <Button title='Send a message'></Button>
      <Button title='View Meetups'></Button>
      <Button title="Log Out" onPress={handleLogout} />
      <ThemedText type="subtitle">Reviews</ThemedText>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} content={item.content} rating={item.rating} />}
        keyExtractor={item => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
