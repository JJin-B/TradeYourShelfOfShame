const TestPage: React.FC = () => {
  return (
    <div>ApiAddress : {process.env.REACT_APP_AWS_API_Gateway_Address}</div>
  );
};

export default TestPage;
