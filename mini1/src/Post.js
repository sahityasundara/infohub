import React, { useState } from 'react';
import './Post.css';

const Post = ({ post, updatePost ,deletePost, currentUser}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newPhoto, setNewPhoto] = useState(null);
  
  const handleSave = () => {
    const updatedPost = {
      ...post,
      description: newDescription,
      photo: newPhoto ? URL.createObjectURL(newPhoto) : post.photo
    };
    updatePost(updatedPost);
    setIsEditing(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} className="post-container">
      {isEditing ? (
        <div className="post-edit-form">
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            className="post-textarea"
          ></textarea>
          <input
            type="file"
            onChange={(e) => setNewPhoto(e.target.files[0])}
            accept="image/*"
            style={{ marginBottom: '10px' }}
            className="post-file-input"
          />
          <button onClick={handleSave} style={{ padding: '10px', width: '100%' }} className="post-button">
            Save
          </button>
        </div>
      ) : (
        <div className="post-content">
          {post.photo && (
            <div style={{ marginBottom: '10px' }} className="post-image">
              <img src={post.photo} alt="Post" style={{ maxWidth: '100%' }}  className="post-image-img"/>
            </div>
          )}
          <p className="post-description">{post.description}</p>
          <small  className="post-timestamp">{post.timestamp}</small>
          <p className="post-username"><strong>Posted by : {post.username}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Post;
