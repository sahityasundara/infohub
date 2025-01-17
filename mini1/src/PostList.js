import React from 'react';
import Post from './Post';

const PostList = ({ posts=[], updatePost }) => {
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} updatePost={updatePost} />
        ))
      )}
    </div>
  );
};
export default PostList;
