import React from 'react';
import '../styles/HighlightIcons.css'; // Custom styles

const highlights = [
  { label: 'New', type: 'new', icon: '+' },
  { label: 'Friends', type: 'friends', img: '../src/assets/images/1.jpg' },
  { label: 'Sport', type: 'sport', img: '../src/assets/images/2.jpg' },
  { label: 'Design', type: 'design', img: '../src/assets/images/3.jpg' },
];

const HighlightIcons = () => {
  return (
    <div className="container text-center mt-4">
      <div className="row justify-content-center">
        {highlights.map((item, index) => (
          <div className="col-3" key={index}>
            <div className={`highlight-circle ${item.type}`}>
              {item.img ? (
                <img src={item.img} alt={item.label} />
              ) : (
                <span className="highlight-icon">{item.icon}</span>
              )}
            </div>
            <p className="highlight-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightIcons;
