// src/pages/Create.js
import React, { useState, useEffect, useRef } from 'react';
import { createUser } from '../services/api';
import { trackPageView, trackEvent, trackTiming, trackEngagement, setUserId } from '../analytics';

const Create = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    setUserId(userId); // Set user ID for tracking
    trackPageView('/create');

    return () => {
      const duration = Date.now() - startTimeRef.current;
      trackEngagement('User', 'Time on Create Page', duration, userId);
    };
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = performance.now();
    await createUser({ name, email });
    const end = performance.now();
    trackEvent('User', 'Create', 'User Created', null, userId);
    trackTiming('User', 'Create Time', Math.round(end - start), 'Create Operation', userId);

    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;
