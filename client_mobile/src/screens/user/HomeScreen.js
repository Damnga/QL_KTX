
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createBaiViet, getAllBaiVietData } from '../../route/BaiViet';
import { createTuongTac, removeTuongTac, getAllTuongTac } from '../../route/TuongTac';
import { createBinhLuan, getAllBinhLuan } from '../../route/BinhLuan';
import { jwtDecode } from 'jwt-decode';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const toast = useToast();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [BaiVietListData, setBaiVietListData] = useState([]);
  const [tuongTacList, setTuongTacList] = useState([]);
  const [binhLuanList, setBinhLuanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (!savedToken) {
          toast.show('Không tìm thấy token, vui lòng đăng nhập lại.', { type: 'danger' });
          return;
        }
        const decoded = jwtDecode(savedToken);
        setToken(savedToken);
        setUserData({
          id: decoded.id,
          anh: decoded.anh,
          username: decoded.Username,
        });
        await fetchData(savedToken);
      } catch (err) {
        console.error(err);
        toast.show('Lỗi khi lấy token hoặc user.', { type: 'danger' });
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  const fetchData = async (token) => {
    try {
      const posts = await getAllBaiVietData(token);
      const likes = await getAllTuongTac(token);
      const comments = await getAllBinhLuan(token);
      setBaiVietListData(posts);
      setTuongTacList(likes);
      setBinhLuanList(comments);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.show('Lỗi tải dữ liệu', { type: 'danger' });
    }
  };

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    const picked = result.assets[0];
    const fileName = picked.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(fileName ?? '');
    const ext = match ? match[1] : 'jpg';
    const mimeType = `image/${ext}`;

    setNewImage(picked.uri);
    setSelectedFile({
      uri: picked.uri,
      type: mimeType,
      name: fileName || `photo_${Date.now()}.${ext}`,
    });
  }
};

const handlePost = async () => {
  if (!newPost.trim()) {
    toast.show('Bạn chưa nhập nội dung bài viết', { type: 'danger' });
    return;
  }
  if (!userData) return;

  const formData = new FormData();
  formData.append('NoiDung', newPost);
  formData.append('MaTK', userData.id);
  formData.append('Tgian', new Date().toISOString());

  if (selectedFile) {
    formData.append('anh', selectedFile);
  }

  try {
    await createBaiViet(formData, token);
    await fetchData(token);
    setNewPost('');
    setNewImage(null);
    setSelectedFile(null);
    toast.show('Đăng bài thành công!', { type: 'success' });
  } catch (error) {
    console.error(error);
    toast.show('Có lỗi khi đăng bài', { type: 'danger' });
  }
};
  const handleLike = async (postId) => {
    if (!userData) return;

    try {
      const existing = tuongTacList.find((tt) => tt.MaTK === userData.id && tt.MaBV === postId);
      if (existing) {
        await removeTuongTac(existing.id);
      } else {
        await createTuongTac({ MaTK: userData.id, MaBV: postId, Tgian: new Date().toISOString() });
      }
      const updatedLikes = await getAllTuongTac(token);
      setTuongTacList(updatedLikes);
    } catch {
      toast.show('Lỗi khi xử lý tương tác!', { type: 'danger' });
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!commentText.trim() || !userData) return;

    const newComment = {
      MaTK: userData.id,
      MaBV: postId,
      NoiDung: commentText,
      Tgian: new Date().toISOString(),
    };

    try {
      await createBinhLuan(newComment);
      const comments = await getAllBinhLuan(token);
      setBinhLuanList(comments);
      toast.show('Bình luận đã được thêm!', { type: 'success' });
    } catch {
      toast.show('Lỗi khi gửi bình luận!', { type: 'danger' });
    }
  };

  const renderItem = ({ item: post }) => {
    const liked = tuongTacList.some((tt) => tt.MaTK === userData?.id && tt.MaBV === post.id);
    const likeCount = tuongTacList.filter((tt) => tt.MaBV === post.id).length;

    return (
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image source={{ uri: `http://172.20.10.3:3000/uploads/${post.anhnguoidung}` }} style={styles.avatar} />
          <View>
            <Text style={styles.author}>{post.Username}</Text>
            <Text style={styles.timestamp}>{new Date(post.Tgian).toLocaleDateString('vi-VN')}</Text>
          </View>
        </View>
        <Text style={styles.postContent}>{post.NoiDung}</Text>
        {post.anhbaiviet && (
          <Image
            source={{ uri: `http://172.20.10.3:3000/uploads/${post.anhbaiviet}` }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity onPress={() => handleLike(post.id)}>
          <Text style={{ color: liked ? 'red' : '#1877f2' }}>
            {liked ? '❤️ Đã thích' : '🤍 Thích'} ({likeCount})
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 10 }}>
          {binhLuanList.filter((c) => c.MaBV === post.id).map((c, i) => (
            <Text key={i} style={styles.comment}>
              <Text style={{ fontWeight: 'bold' }}>{c.Username}:</Text> {c.NoiDung}
            </Text>
          ))}
          <CommentForm onSubmit={(text) => handleComment(post.id, text)} />
        </View>
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#1877f2" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.postForm}>
          <View style={styles.postFormHeader}>
            <Image source={{ uri: `http://172.20.10.3:3000/uploads/${userData.anh}` }} style={styles.avatar} />
            <TextInput
              value={newPost}
              placeholder={`${userData.username} à, bạn đang nghĩ gì thế?`}
              onChangeText={setNewPost}
              multiline
              style={styles.textArea}
            />
          </View>
          {newImage && <Image source={{ uri: newImage }} style={styles.previewImage} />}
          <View style={styles.imageUpload}>
            <TouchableOpacity onPress={pickImage} style={styles.imageUploadBtn}>
              <Text>🖼️ Thêm ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
              <Text style={{ color: '#fff' }}>Đăng bài</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <FlatList
        data={BaiVietListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  return (
    <View style={styles.commentForm}>
      <TextInput
        value={comment}
        placeholder="Viết bình luận..."
        onChangeText={setComment}
        style={styles.commentInput}
      />
      <TouchableOpacity
        onPress={() => {
          if (comment.trim()) {
            onSubmit(comment);
            setComment('');
          }
        }}
        style={styles.commentBtn}
      >
        <Text style={{ color: '#fff' }}>Bình luận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 10 },
  postForm: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15 },
  postFormHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 50, marginRight: 8 },
  textArea: { flex: 1, minHeight: 60, backgroundColor: '#f0f2f5', borderRadius: 6, padding: 8, textAlignVertical: 'top' },
  imageUpload: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  imageUploadBtn: { backgroundColor: '#eee', padding: 8, borderRadius: 6 },
  postBtn: { backgroundColor: '#1877f2', padding: 8, borderRadius: 6 },
  previewImage: { width: '100%', height: 200, borderRadius: 8, marginTop: 8 },
  post: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  author: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { fontSize: 12, color: 'gray' },
  postContent: { fontSize: 14, marginVertical: 6 },
  postImage: { width: '100%', height: 200, borderRadius: 8, marginTop: 6 },
  comment: { backgroundColor: '#f0f2f5', padding: 6, borderRadius: 6, marginTop: 4, fontSize: 13 },
  commentForm: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  commentInput: { flex: 1, backgroundColor: '#fff', borderRadius: 6, paddingHorizontal: 10, height: 35, fontSize: 13, borderWidth: 1, borderColor: '#ccc' },
  commentBtn: { backgroundColor: '#1877f2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
});

export default Home;
