import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    fetchUserPosts();
    
    // Listen for post creation/deletion events
    const handlePostCreated = () => {
      fetchUserPosts();
    };
    
    const handlePostDeleted = () => {
      fetchUserPosts();
    };

    window.addEventListener('postCreated', handlePostCreated);
    window.addEventListener('postDeleted', handlePostDeleted);

    return () => {
      window.removeEventListener('postCreated', handlePostCreated);
      window.removeEventListener('postDeleted', handlePostDeleted);
    };
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`/api/users/${user?._id}`);
      setPostCount(response.data.posts.length);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const handleCreatePost = () => {
    // Scroll to the create post form
    const createPostElement = document.querySelector('.create-post');
    if (createPostElement) {
      createPostElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditProfile = () => {
    navigate(`/profile/${user?._id}/edit`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-header">
          <div className="sidebar-user-info">
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p>{user?.bio || 'Add a bio to your profile'}</p>
          </div>
        </div>

        <div className="sidebar-stats">
          <div className="stat-item">
            <span className="stat-label">Posts</span>
            <span className="stat-value">{postCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Profile views</span>
            <span className="stat-value">0</span>
          </div>
        </div>
      </div>

      <div className="sidebar-card">
        <h3 className="sidebar-title">Quick Actions</h3>
        <ul className="sidebar-list">
          <li onClick={handleCreatePost}>
            <span>Create Post</span>
          </li>
          <li onClick={handleEditProfile}>
            <span>Edit Profile</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 