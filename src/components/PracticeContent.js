import React from 'react';

function PracticeContent({ data }) {
  const paragraphs = data.split('\n'); // Assuming each paragraph is separated by a new line

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default PracticeContent;