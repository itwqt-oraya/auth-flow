export default function ErrorLoader({error}: {error: string}) {
  return (
    <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
      <h5 className="text-danger">{error}</h5>
    </div>
  );
}
