import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';

// lazy load routes
// move auth here
const renderRoutes = (webRoutes) => {
  // use auth here
  // in routes
  // isPrivate
  return (
    <BrowserRouter>
      <Routes>
        {webRoutes.map((route) => {
          const arrayRoutes = Object.values(route);
          return arrayRoutes.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    {item.element && <item.layout />}
                  </Suspense>
                }
              >
                <Route index element={item.element} />
                {item.children?.map((child, index) => (
                  <Route
                    key={index}
                    path={child.path}
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        {child.element}
                      </Suspense>
                    }
                  />
                ))}
              </Route>
            );
          });
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default renderRoutes;
