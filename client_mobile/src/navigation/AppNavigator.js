import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/user/HomeScreen';
import Notification from '../screens/user/Notification';
import Event from '../screens/user/Event';
import Message from '../screens/user/Message';
import Profile from '../screens/user/LakeProfile';
import HeaderUser from '../component/Header';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderUser />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </View>
  );
}
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
}
