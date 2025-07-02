import {Spinner} from 'reactstrap';
export default function SpinLoader() {
  return (
    <div className="container p-5 w-100 h-100 d-flex justify-content-center align-items-center">
      <Spinner color="dark" />
    </div>
  );
}
