"use client";
import React, { useState, ReactNode } from 'react';

interface ShowMoreComponentProps {
  children: ReactNode;
}

const ShowMoreComponent: React.FC<ShowMoreComponentProps> = ({ children }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => setShowMore(!showMore);

  // Split children into initial and extra content
  const initialContent = React.Children.toArray(children).slice(0, 1);
  const extraContent = React.Children.toArray(children).slice(1);

  return (
    <div className="content">
      {initialContent}
      {showMore && extraContent}
      {/* Centering the button */}
      <div className="show-more-button-container">
        <button className="consent-button" onClick={handleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default ShowMoreComponent;
