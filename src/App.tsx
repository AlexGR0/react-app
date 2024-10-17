import React from 'react';
import '@styles/global.scss';
import AppRouter from '@routes/AppRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
