import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostList from './PostList';
import { useNavigate } from 'react-router-dom';
import './PostsPage.css';


const PostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div className="posts-page">
       <header className="header">
      <h1 className="posts-title">Posts</h1>
      <button onClick={handleLogout} style={{ padding: '10px', marginTop: '20px' }} className="logout-button">
        Logout
      </button>
      </header>
      <main className="main-content">
        <PostForm addPost={addPost} />
        <PostList posts={posts} updatePost={updatePost} />
      </main>
    </div>
  );
};

export default PostPage;

