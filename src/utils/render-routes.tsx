import {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {WebRouteProps, RouteProps, ChildRouteProps} from '@/models/routes';

export default function renderRoutes(webRoutes: WebRouteProps) {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(webRoutes).map((route: RouteProps) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {route.layout && <route.layout>{route.element}</route.layout>}
              </Suspense>
            }
          >
            <Route index element={route.element} />
            {route.children &&
              route.children.map((child: ChildRouteProps, index) => (
                <Route
                  key={`${child.path}-${index}`}
                  path={child.path}
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      {child.element}
                    </Suspense>
                  }
                />
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}
