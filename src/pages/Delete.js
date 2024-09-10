// src/pages/Delete.js
import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, getUserById } from '../services/api';
import { trackPageView, trackEvent, trackTiming, trackEngagement, setUserId } from '../analytics';

const Delete = ({ userId, match }) => {
  const [user, setUser] = useState(null);
  const startTimeRef = useRef(Date.now());
  const userToDeleteId = match.params.id;

  useEffect(() => {
    setUserId(userId); // Set user ID for tracking
    trackPageView(`/delete/${userToDeleteId}`);

    const fetchUser = async () => {
      const user = await getUserById(userToDeleteId);
      setUser(user);
    };

    fetchUser();

    return () => {
      const duration = Date.now() - startTimeRef.current;
      trackEngagement('User', 'Time on Delete Page', duration, userId);
    };
  }, [userId, userToDeleteId]);

  const handleDelete = async () => {
    const start = performance.now();
    await deleteUser(userToDeleteId);
    const end = performance.now();
    trackEvent('User', 'Delete', 'User Deleted', null, userId);
    trackTiming('User', 'Delete Time', Math.round(end - start), 'Delete Operation', userId);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Delete User</h2>
      <p>Are you sure you want to delete {user.name}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
