import ReactGA from 'react-ga4';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
const initGA = () => {
  if (GA_TRACKING_ID) {
    ReactGA.initialize(GA_TRACKING_ID, {
      debug: process.env.NODE_ENV === 'development',
    });
  }
};

// Track page views
const trackPageView = (path = '', title) => {
  if (GA_TRACKING_ID) {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
  }
};

// Track custom events
const trackEvent = (action, category = 'General', label = '', value) => {
  if (GA_TRACKING_ID) {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

// Track custom dimensions/metrics
const trackCustomEvent = (eventName, parameters = {}) => {
  if (GA_TRACKING_ID) {
    ReactGA.gtag('event', eventName, parameters);
  }
};

// Set user properties
const setUserProperties = properties => {
  if (GA_TRACKING_ID) {
    ReactGA.set(properties);
  }
};

export {
  initGA,
  trackPageView,
  trackEvent,
  trackCustomEvent,
  setUserProperties,
};
