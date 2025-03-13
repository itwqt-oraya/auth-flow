import {Suspense, ReactNode, ComponentType} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';

interface WebRouteProps {
  [key: string]: {
    path: string;
    element: ReactNode;
    layout?: ComponentType;
    children?: Array<{
      path: string;
      element: ReactNode;
    }>;
  };
}

export default function renderRoutes(webRoutes: WebRouteProps) {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(webRoutes).map((route) => {
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
}
