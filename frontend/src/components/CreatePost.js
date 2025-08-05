import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please write something to post');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/posts', { content });
      const newPost = response.data;
      
      onPostCreated(newPost);
      setContent('');
      
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <div className="post-header">
          <div className="post-input-container">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you want to talk about?"
              className="post-input"
              rows="3"
            />
          </div>
        </div>

        <div className="post-actions">
          <div className="post-controls">
            <button
              type="submit"
              className="btn btn-primary post-submit"
              disabled={loading || !content.trim()}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost; 