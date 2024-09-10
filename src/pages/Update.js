// src/pages/Update.js
import React, { useState, useEffect, useRef } from 'react';
import { updateUser, getUserById } from '../services/api';
import { trackPageView, trackEvent, trackTiming, trackEngagement, setUserId } from '../analytics';

const Update = ({ userId, match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const startTimeRef = useRef(Date.now());
  const userToUpdateId = match.params.id;

  useEffect(() => {
    setUserId(userId); // Set user ID for tracking
    trackPageView(`/update/${userToUpdateId}`);

    const fetchUser = async () => {
      const user = await getUserById(userToUpdateId);
      setName(user.name);
      setEmail(user.email);
    };

    fetchUser();

    return () => {
      const duration = Date.now() - startTimeRef.current;
      trackEngagement('User', 'Time on Update Page', duration, userId);
    };
  }, [userId, userToUpdateId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const start = performance.now();
    await updateUser(userToUpdateId, { name, email });
    const end = performance.now();
    trackEvent('User', 'Update', 'User Updated', null, userId);
    trackTiming('User', 'Update Time', Math.round(end - start), 'Update Operation', userId);

    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
