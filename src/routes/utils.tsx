import React, { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import PageLoading from '@components/common/PageLoading';
import { RouteConfig } from '@routes/index';

// 懒加载组件
export const LazyLoad = (path: string) => {
  const Component = lazy(() => import(`@/${path}`));
  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  );
};

// 递归渲染路由
export const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((item: RouteConfig) => {
    const obj = { ...item };
    const { componentPath, children, redirect, path } = item;
    if (children && children.length) {
      obj.children = renderRoutes(children);
    }

    let element;
    if (componentPath) {
      element = LazyLoad(componentPath);
    } else {
      if (redirect) {
        element = <Navigate to={redirect} replace />;
      }
    }

    const routeConfig: RouteConfig = {
      path,
      element,
      children: children ? renderRoutes(children) : undefined,
    };

    return routeConfig;
  });
};

const DynamicRouter = (props: { routes: RouteConfig[] }) => {
  const list = renderRoutes(props.routes);
  return useRoutes(list);
};

export default DynamicRouter;
