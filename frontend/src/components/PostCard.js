import React from 'react';
import moment from 'moment';
import './PostCard.css';

const PostCard = ({ post, onPostUpdated, onPostDeleted }) => {
  const formatTime = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-info">
          <h4>{post.author?.firstName} {post.author?.lastName}</h4>
          <span className="post-time">{formatTime(post.createdAt)}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard; 