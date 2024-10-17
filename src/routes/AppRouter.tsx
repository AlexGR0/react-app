import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '@routes/index';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
