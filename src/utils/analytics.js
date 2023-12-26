import { logEvent } from 'firebase/analytics';
import React from 'react';

const AnalyticsContext = React.createContext();

export const useAnalytics = () => {
  const context = React.useContext(AnalyticsContext);
  return context?.app?.current?.analytics;
};

export const AnalyticsProvider = props => {
  const app = React.useRef();

  React.useEffect(() => {
    const { getFirebase } = require('../utils/firebase');
    app.current = getFirebase();
    logEvent(app.current.analytics, 'page_view', { page_title: 'Home' });
  }, []);

  return <AnalyticsContext.Provider value={{ app }}>{props.children}</AnalyticsContext.Provider>;
};
