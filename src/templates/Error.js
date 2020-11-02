const Error = (props) => {
  return (
    <div className="Errors mx-auto">
      <div className="alert alert-danger">{props.error}</div>
    </div>
  );
};

export default Error;
