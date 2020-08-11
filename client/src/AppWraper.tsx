import React, { useState, useEffect } from 'react';

import App from './App';
import { setAccessToken } from './accessToken';

const AppWraper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/refresh_token', { method: 'POST', credentials: 'include' }).then(
      async (res) => {
        const data = await res.json();
        const accessToken = data.accessToken;
        setAccessToken(accessToken);
        setLoading(false);
      },
    );
  }, []);
  if (loading) return <div>Loading...</div>;
  return <App />;
};

export default AppWraper;
