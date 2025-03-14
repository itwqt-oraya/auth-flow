import {Suspense, ReactNode, ComponentType} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';

interface WebRouteProps {
  [key: string]: RouteProps;
}

interface RouteProps {
  path: string;
  element: ReactNode;
  layout?: ComponentType;
  children?: Array<ChildRouteProps>;
}

interface ChildRouteProps {
  path: string;
  element: ReactNode;
}

export default function renderRoutes(webRoutes: WebRouteProps) {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(webRoutes).map((route) => {
          const arrayRoutes = Object.values(route);
          return arrayRoutes.map((item: RouteProps) => {
            return (
              <Route
                key={item!.path}
                path={item!.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    {item!.element && item.layout && <item.layout />}
                  </Suspense>
                }
              >
                <Route index element={item!.element} />
                {item!.children?.map((child: ChildRouteProps, index) => (
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
