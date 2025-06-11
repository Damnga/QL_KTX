import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, Image, KeyboardAvoidingView,
  Platform, StyleSheet, Keyboard, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../../utils/Socket';
import { getAllTinNhan, createTinNhan } from '../../route/TinNhan';
import { getAll } from '../../route/TaiKhoan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const MessageScreen = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const flatListRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.id);
        setToken(storedToken);
        socket.emit('add-user', decoded.id);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!token || !userId) return;
    const fetchContacts = async () => {
      const allUsers = await getAll(token);
      setContacts(allUsers.filter(u => u.id !== Number(userId)));
    };
    fetchContacts();
  }, [token, userId]);

  const loadMessages = async (user = selectedUser) => {
    if (!user) return;
    setLoadingMessages(true);
    const allMessages = await getAllTinNhan(token);
    const filtered = allMessages.filter(msg =>
      (msg.NguoiGui === userId && msg.NguoiNhan === user.id) ||
      (msg.NguoiGui === user.id && msg.NguoiNhan === userId)
    );
    setMessages(filtered.map(msg => ({
      ...msg,
      sender: msg.NguoiGui === userId ? 'me' : 'them'
    })));
    setLoadingMessages(false);
  };

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser);
      intervalRef.current = setInterval(() => loadMessages(selectedUser), 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [selectedUser]);

  useEffect(() => {
    socket.on('msg-receive', ({ from }) => {
      if (selectedUser && from === selectedUser.id) {
        loadMessages(selectedUser);
      }
    });
    return () => socket.off('msg-receive');
  }, [selectedUser]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setMessages([]);
    setIsAtBottom(true);
    await loadMessages(user);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;
    const messageData = {
      NguoiGui: userId,
      NguoiNhan: selectedUser.id,
      NoiDung: input,
      Tgian: new Date(),
    };
    setMessages(prev => [...prev, { NoiDung: input, sender: 'me' }]);
    setInput('');
    setTimeout(() => scrollToBottom(), 100);

    try {
      await createTinNhan(messageData, token);
      socket.emit('send-msg', messageData);
      loadMessages(selectedUser);
    } catch (error) {
      console.error("Send message failed:", error);
    }
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    if (isAtBottom) scrollToBottom();
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.NoiDung}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {!selectedUser ? (
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleSelectUser(item)}
                >
                  <Image
                    source={{ uri: `http://192.168.1.5:3000/uploads/${item.anh}` }}
                    style={styles.avatar}
                  />
                  <Text style={styles.contactName}>{item.Username}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setSelectedUser(null)}>
                  <Ionicons name="arrow-back" size={24} color="#1877f2" />
                </TouchableOpacity>
                <Image
                  source={{ uri: `http://192.168.1.5:3000/uploads/${selectedUser.anh}` }}
                  style={styles.avatar}
                />
                <Text style={styles.headerText}>{selectedUser.Username}</Text>
                {loadingMessages && <ActivityIndicator size="small" color="#1877f2" style={{ marginLeft: 10 }} />}
              </View>

              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderMessage}
                contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
                onScroll={handleScroll}
                scrollEventThrottle={100}
                keyboardShouldPersistTaps="handled"
                style={styles.messageList}
              />

              <View style={styles.inputContainer}>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  placeholder="Nhập tin nhắn..."
                  style={styles.textInput}
                  onSubmitEditing={sendMessage}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                  <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#1877f2',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#e4e6eb',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopColor: '#ddd',
    borderTopWidth: 2,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#1877f2',
    padding: 10,
    borderRadius: 20,
  },
});

export default MessageScreen;
