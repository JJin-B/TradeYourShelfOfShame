const TestPage: React.FC = () => {
  console.log(import.meta.env);
  return (
    <div>
      ApiAddress :{" "}
      {import.meta.env.VITE_REACT_APP_AWS_API_Gateway_Address}
    </div>
  );
};

export default TestPage;
