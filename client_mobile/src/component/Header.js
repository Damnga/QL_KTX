import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const navItems = [
  { label: 'Trang Chủ', icon: 'home-outline', screen: 'Home' },
  { label: 'Thông Báo', icon: 'notifications-outline', screen: 'Notification' },
  { label: 'Sự Kiện', icon: 'calendar-outline', screen: 'Event' },
  { label: 'Tin Nhắn', icon: 'chatbubble-ellipses-outline', screen: 'Message' },
  { label: 'Tôi', icon: 'person-circle-outline', screen: 'Profile' },
];

const HeaderUser = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const handlePress = (screen) => {
    setActiveTab(screen);
    navigation.navigate('Main', { screen });
  };

  return (
    <View style={styles.header}>
      <View style={styles.navMenu}>
        {navItems.map((item, index) => {
          const isActive = activeTab === item.screen;

          return (
            <Pressable
              key={index}
              onPress={() => handlePress(item.screen)}
              style={({ pressed }) => [
                styles.navItemWrapper,
                pressed && { transform: [{ scale: 0.9 }], opacity: 0.6 },
                isActive && styles.activeTab,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isActive ? '#fff' : '#ccc'}
              />
              <Text style={[styles.navItem, isActive && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#002f6c',
    width: '100%',
    paddingTop: 35,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  navMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navItemWrapper: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  navItem: {
    color: '#ccc', 
    fontSize: 12,
    marginTop: 3,
  },
  activeTab: {
    backgroundColor: '#01408e',
  },
  activeText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default HeaderUser;
