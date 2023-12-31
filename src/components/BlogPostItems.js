import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImQuotesLeft } from 'react-icons/im'
import { ImQuotesRight } from 'react-icons/im'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import PracticeContent from '../components/PracticeContent';

function BlogPostItems({ postId,current }) {
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext()
  let navigate = useNavigate()

  useEffect(() => {
    fetchComments();
  }, []);

  
  const fetchComments = async () => {
    await axios.get(`https://rcdso-backend.onrender.com/api/comments/${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const addComment = (text, author, postc) => {
    if(!user) {
      navigate("/login")
    }
    axios.post('https://rcdso-backend.onrender.com/api/commentspost', { text, author, posting: postId})
      .then((response) => {
        setComments([...comments, response.data]);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div className='card-flexing'>
      <div className='myblogs-card poi-poi' key={current._id}>
        <div className='myblogs-title'>
          <h1>{current.title}</h1>
          <h2>By {current.postedBy}</h2> 
        </div>
        <div className='myblogs-content'>
          <div className='icon-quotes'><ImQuotesLeft /></div>
          <p className='equalizing'><PracticeContent data={current.content} /></p>
          <div className='right-bottom'><ImQuotesRight /></div>
        </div>
      </div>
      <div className='comments-flexing'>
        <CommentList comments={comments} />
        <CommentForm addComment={addComment} postId={postId} />
      </div>
    </div>
  );
}

export default BlogPostItems;
