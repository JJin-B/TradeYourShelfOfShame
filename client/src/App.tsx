import User from "./components/classes/User";
import NavBar from "./components/NavBar";

const user: User = new User("UserName", "John Doe", "john.doe@gmail.com");

function App() {
  return (
    <>
      <NavBar user={user} isDarkMode={false} />
    </>
  );
}

export default App;
