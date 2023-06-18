import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function CommentList({ comments }) {
  return (
    <div className="comments-list">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <h3>By: <span>{comment.author}</span></h3>
              <h3>{formatDistanceToNow(new Date(comment.timestamp),{addSuffix:true})}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentList;