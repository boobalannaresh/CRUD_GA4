// src/pages/Read.js
import React, { useEffect, useState, useRef } from 'react';
import { getUsers } from '../services/api';
import { trackPageView, trackEngagement, setUserId } from '../analytics';

const Read = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    setUserId(userId); // Set user ID for tracking
    trackPageView('/read');

    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();

    return () => {
      const duration = Date.now() - startTimeRef.current;
      trackEngagement('User', 'Time on Read Page', duration, userId);
    };
  }, [userId]);

  return (
    <div>
      <h2>Read Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
