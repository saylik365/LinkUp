import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import axios from 'axios';
import './Feed.css';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

useEffect(() => {
  setPage(1);
}, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://linkup-3gic.onrender.com/api/posts?page=${page}&limit=10`);
      const newPosts = response.data.posts;
      
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
      
      setHasMore(response.data.currentPage < response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

const loadMore = () => {
  if (!loading && hasMore) {
    setPage(prev => prev + 1);
  }
};


  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    
    // Trigger a custom event to refresh sidebar post count
    window.dispatchEvent(new CustomEvent('postCreated'));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prev => prev.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
    
    // Trigger a custom event to refresh sidebar post count
    window.dispatchEvent(new CustomEvent('postDeleted'));
  };

  return (
    <div className="feed">
      <CreatePost onPostCreated={handlePostCreated} />
      
      <div className="feed-posts">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onPostUpdated={handlePostUpdated}
            onPostDeleted={handlePostDeleted}
          />
        ))}
        
        {loading && (
          <div className="loading-posts">
            <div className="skeleton-post"></div>
            <div className="skeleton-post"></div>
            <div className="skeleton-post"></div>
          </div>
        )}
        
        {!loading && hasMore && (
          <button 
            className="load-more-btn"
            onClick={loadMore}
          >
            Load more posts
          </button>
        )}
        
        {!loading && !hasMore && posts.length > 0 && (
          <div className="no-more-posts">
            <p>You're all caught up!</p>
          </div>
        )}
        
        {!loading && posts.length === 0 && (
          <div className="empty-feed">
            <h3>Welcome to LinkedIn Clone!</h3>
            <p>Start by creating your first post or connecting with others.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed; 
