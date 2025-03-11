import {Route} from 'react-router';
import {PrivateLayout, PublicLayout} from '@components/Layout';

export default function Loader(props) {
  const {element: Element, path, children} = props;
  console.log(props);
  return <></>;
}
