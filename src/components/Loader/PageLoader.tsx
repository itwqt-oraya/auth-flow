export default function PageLoader() {
  return (
    <div className="container text-center vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="spinner-border" role="status"></div>
        <span className="my-2">Loading...</span>
      </div>
    </div>
  );
}
