import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { AiOutlineSend } from 'react-icons/ai'

function CommentForm({ addComment }) {
  const [text, setText] = useState('');
  const { user } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(text, `${user.user.firstName} ${user.user.lastName}`);
    setText('');
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Add Your Comments here'
            required
          ></input>
        </div>
        <button type="submit"><AiOutlineSend className='send-icon'/></button>
      </form>
  );
}

export default CommentForm;