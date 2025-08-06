import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import PostCard from './PostCard';
import './ProfileView.css';

const ProfileView = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://linkup-3gic.onrender.com/api/users/${id}`);
      const { user: userData, posts: userPosts } = response.data;
      
      setUser(userData);
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-view-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-view-error">
        <h2>User not found</h2>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="profile-view">
      <div className="profile-view-header">
        <div className="profile-view-info">
          <h1>{user.firstName} {user.lastName}</h1>
          <p className="profile-view-email">{user.email}</p>
          {user.bio && <p className="profile-view-bio">{user.bio}</p>}
        </div>
        
        {isOwnProfile && (
          <div className="profile-view-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate(`/profile/${user._id}/edit`)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="profile-view-posts">
        <h2>Posts ({posts.length})</h2>
        {posts.length > 0 ? (
          <div className="posts-list">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <p>No posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView; 
