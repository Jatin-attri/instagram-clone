import React from 'react';
import '../styles/PostGrid.css';

const posts = [
    '../src/assets/images/1.jpg',
    '../src/assets/images/2.jpg',
    '../src/assets/images/3.jpg',
    '../src/assets/images/4.jpg',
    '../src/assets/images/5.jpg',
    '../src/assets/images/6.jpg',
    '../src/assets/images/1.jpg',
    '../src/assets/images/2.jpg',
    '../src/assets/images/3.jpg',
    '../src/assets/images/4.jpg',
    '../src/assets/images/5.jpg',
    '../src/assets/images/6.jpg',
    '../src/assets/images/1.jpg',
    '../src/assets/images/2.jpg',
    '../src/assets/images/3.jpg',
    '../src/assets/images/4.jpg',
    '../src/assets/images/5.jpg',
    '../src/assets/images/6.jpg',
];

const PostGrid = () => {
    return (
        <div className="post-grid-container">
            <div className="post-nav">
                <div className="nav-icon active">
                    <i className="bi bi-grid-3x3-gap-fill"></i>
                </div>
                <div className="nav-icon">
                    <i className="bi bi-person"></i>
                </div>
            </div>

            <div className="post-grid">
                {posts.map((src, index) => (
                    <div className="post-item" key={index}>
                        <img src={src} alt={`Post ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostGrid;
