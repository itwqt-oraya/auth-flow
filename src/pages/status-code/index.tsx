type StatusCodeProps = {
  code?: number;
};

export default function index(props: StatusCodeProps) {
  return (
    <div className="container text-center vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <h1>{props.code || 404}</h1>
        <p className="text-black-50">Something went wrong. Please try again.</p>
        <button
          className="btn btn-dark"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
