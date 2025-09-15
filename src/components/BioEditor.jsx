import React, { useState } from 'react';
import '../styles/BioEditor.css';

const BioEditor = ({ userId, currentBio }) => {
  const [bio, setBio] = useState(currentBio || '');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user/${userId}/bio`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }),
    });
    if (res.ok) {
      setStatus('Bio updated!');
    } else {
      setStatus('Failed to update bio.');
    }
  };

  return (
    <form className="bio-editor" onSubmit={handleSubmit}>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write your bio..."
      />
      <button type="submit">Update Bio</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
};

export default BioEditor;
