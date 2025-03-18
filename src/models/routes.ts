import {ComponentType, JSX} from 'react';

export type WebRouteProps = {
  [key: string]: RouteProps;
};

export type RouteProps = {
  path: string;
  element: JSX.Element;
  layout?: ComponentType<{children?: JSX.Element}>;
  children?: ChildRouteProps[];
};

export type ChildRouteProps = {
  path: string;
  element: JSX.Element;
};
