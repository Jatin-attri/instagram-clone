import React, { useState } from 'react';

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    fetch(`/api/posts/${post._id}/like`, { method: 'POST' })
      .then(() => setLikes(prev => prev + 1));
  };

  const handleComment = e => {
    e.preventDefault();
    fetch(`/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: comment })
    }).then(() => setComment(''));
  };

  return (
    <div className="post-card">
      <img src={post.imageUrl} alt="Post" />
      <p>{post.caption}</p>
      <button onClick={handleLike}>❤️ {likes}</button>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
      </form>
    </div>
  );
};

export default PostCard;
