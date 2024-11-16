import React, { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import PageLoading from '@components/common/PageLoading';
import { routes } from '@routes/index';
import DynamicRouter from '@routes/utils';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <DynamicRouter routes={routes} />
      </Suspense>
    </Router>
  );
};

export default AppRouter;
