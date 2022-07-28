const Errors = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <ul className="errorsWrapper">
      {errors.map((error) => (
        <li key={error.message}>{error.message}</li>
      ))}
    </ul>
  );
};

export default Errors;
