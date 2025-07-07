import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PostForm.css';

const PostForm = ({ addPost }) => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const location = useLocation();
  const username = location.state?.username || 'No data';
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
   if (description.trim() !== '') {
      const newPost = {
        id: Date.now(),
        description: description,
        photo: photo ? URL.createObjectURL(photo) : null,
        timestamp: new Date().toLocaleDateString('en-US', options),
        likes: 0,
        comments: [],
        username: username,
      };
      const formData = new FormData();
      formData.append('description', description);
      formData.append('timestamp', newPost.timestamp);
      formData.append('likes', newPost.likes);
      formData.append('comments', JSON.stringify(newPost.comments));
      formData.append('username', username);
      formData.append('photo', photo);
      /*addPost(newPost);
      setDescription('');
      setPhoto(null);*/
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:5000/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        addPost(res.data);
        setDescription('');
        setPhoto(null);
      }
      catch (err) {
        console.error(err);
      }
   }
   
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Information about Event "
        rows="4"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        className="post-textarea"
      ></textarea>
      <input
        type="file"
        onChange={handlePhotoChange}
        accept="image/*"
        style={{ marginBottom: '10px' }}
        className="post-file-input"
      />
      <button type="submit" style={{ padding: '10px', width: '100%' }}  className="post-button">
        Post
      </button>
    </form>
  );
};

export default PostForm;
