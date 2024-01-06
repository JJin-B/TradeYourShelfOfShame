import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import FrontPage from "./Pages/FrontPage";
import PostingDetailPage from "./Pages/PostingDetailPage";
import SearchResultPage from "./Pages/SearchResultPage";
import PostPage from "./Pages/PostPage";
import EditPage from "./Pages/EditPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import WrapperComponent from "./components/WrapperComponent";

// import { user } from "./dummyData/dummydata";
import { useAuth } from "./Wrapper/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <>
      <Router>
        <NavBar user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <WrapperComponent>
                <FrontPage />
              </WrapperComponent>
            }
          />
          <Route
            path="/search"
            element={
              <WrapperComponent>
                <SearchResultPage />
              </WrapperComponent>
            }
          />

          <Route
            path="/post"
            element={
              <WrapperComponent>
                <PostPage />
              </WrapperComponent>
            }
          />
          <Route
            path="/posting/:postId"
            element={
              <WrapperComponent>
                <PostingDetailPage />
              </WrapperComponent>
            }
          />

          <Route
            path="/posting/:postId/edit"
            element={
              <WrapperComponent>
                <EditPage />
              </WrapperComponent>
            }
          />

          <Route
            path="/signin"
            element={
              <WrapperComponent>
                <LoginPage />
              </WrapperComponent>
            }
          />

          <Route
            path="/signup"
            element={
              <WrapperComponent>
                <RegisterPage />
              </WrapperComponent>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
