import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts') // Get all posts
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="post-feed">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
