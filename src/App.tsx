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
import UserSettingPage from "./Pages/UserSettingPage";
import UserTradePage from "./Pages/UserTradePage";
import ChatPage from "./Pages/ChatPage";

import WrapperComponent from "./Wrapper/WrapperComponent";

import { useAuth } from "./Wrapper/AuthContext";
import TestingPage from "./Pages/TestingPage";

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
                {user ? <PostPage /> : <LoginPage />}
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
                {user ? <EditPage user={user} /> : <LoginPage />}
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

          <Route
            path="/setting"
            element={
              <WrapperComponent>
                {user ? <UserSettingPage user={user} /> : <LoginPage />}
              </WrapperComponent>
            }
          />
          <Route
            path="/trade/:userId"
            element={
              <WrapperComponent>
                <UserTradePage />
              </WrapperComponent>
            }
          />

          <Route
            path="/chat"
            element={
              <WrapperComponent>
                {user ? <ChatPage userId={user._id} /> : <LoginPage />}
              </WrapperComponent>
            }
          />
          <Route
            path="/test"
            element={
              <WrapperComponent>
                <TestingPage />
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
