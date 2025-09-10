import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Instagram Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="card mb-3">
          <img src={post.imageUrl} className="card-img-top" alt="post" />
          <div className="card-body">
            <h5 className="card-title">{post.author?.username}</h5>
            <p className="card-text">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
