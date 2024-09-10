// src/analytics.js
import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initializeGA = () => {
  ReactGA.initialize('YOUR_GA_MEASUREMENT_ID'); // Replace with your GA measurement ID
};

// Set User ID
export const setUserId = (userId) => {
  ReactGA.set({ user_id: userId });
};

// Track Page Views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path, title: document.title });
};

// Track Events
export const trackEvent = (category, action, label, value, userId) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
    user_id: userId, // Include user ID
  });
};

// Track Timing
export const trackTiming = (category, variable, value, label, userId) => {
  ReactGA.timing({
    category,
    variable,
    value, // value in milliseconds
    label,
    user_id: userId, // Include user ID
  });
};

// Track Engagement
export const trackEngagement = (category, action, duration, userId) => {
  ReactGA.event({
    category,
    action,
    label: `Engagement Time: ${duration / 1000}s`,
    user_id: userId, // Include user ID
  });
};
