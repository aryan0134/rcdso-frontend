import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImQuotesLeft } from 'react-icons/im'
import { ImQuotesRight } from 'react-icons/im'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useAuthContext } from '../hooks/useAuthContext'

function BlogPostItems({ postId,current }) {
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext()

  useEffect(() => {
    fetchComments();
  }, []);

  
  const fetchComments = async () => {
    await axios.get(`/api/comments/${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const addComment = (text, author) => {
    axios.post('/api/comments', { text, author, post: postId})
      .then((response) => {
        setComments([...comments, response.data]);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div className='card-flexing'>
      <div className='myblogs-card' key={current._id}>
        <div className='myblogs-title'>
          <h1>{current.title}</h1>
          <h2>By {current.postedBy}</h2> 
        </div>
        <div className='myblogs-content'>
          <div className='icon-quotes'><ImQuotesLeft /></div>
          <p>{current.content}</p>
          <div className='right-bottom'><ImQuotesRight /></div>
        </div>
      </div>
      <div className='comments-flexing'>
        <CommentList comments={comments} />
        <CommentForm addComment={addComment} />
      </div>
    </div>
  );
}

export default BlogPostItems;