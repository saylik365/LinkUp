import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import PostCard from './PostCard';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    bio: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://testcase-backend.onrender.com/api/users/${id}`);
      const { user: userData, posts: userPosts } = response.data;
      
      setUser(userData);
      setPosts(userPosts);
      setEditForm({
        firstName: userData.firstName,
        lastName: userData.lastName,
        bio: userData.bio || ''
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://testcase-backend.onrender.com/api/users/profile', editForm);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <h2>User not found</h2>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user.firstName} {user.lastName}</h1>
          <p className="profile-email">{user.email}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
        </div>
        
        {isOwnProfile && (
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="edit-form">
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="textarea"
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="edit-actions">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="profile-posts">
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

export default Profile; 
