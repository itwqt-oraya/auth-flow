import {BrowserRouter, Routes, Route} from 'react-router';

const renderRoutes = (webRoutes) => {
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
                element={item.element && <item.layout />}
              >
                <Route index element={item.element} />
                {item.children?.map((child, index) => (
                  <Route
                    key={index}
                    path={child.path}
                    element={child.element}
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
