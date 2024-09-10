// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes, Link } from 'react-router-dom';
import { initializeGA } from './analytics';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';
import Delete from './pages/Delete';
import LandingPage from './LandingPage';


const App = () => {
  useEffect(() => {
    initializeGA();
  }, []);

  const userId = 'user-id-123'; // Replace with dynamic user ID if available

  return (
 <div>

  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/create">Create</Link></li>
    <li><Link to="/read">Read</Link></li>
    <li><Link to="/update">Update</Link></li>
    <li><Link to="/delete">Delete</Link></li>
  </ul>
 <Routes>
   
 <Route path="/create" element={<Create userId={userId}/>}  />


 <Route path="/read" element={ <Read userId={userId} />} />
  

 <Route path="/update/:id" element={   <Update userId={userId} />} />


 <Route path="/delete/:id" element={  <Delete userId={userId} />} />
 

 <Route path="/" element={  <LandingPage userId={userId} />}>
 
 </Route>

</Routes>
 
 </div>
  );
};

export default App;