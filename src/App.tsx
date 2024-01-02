import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import FrontPage from "./Pages/FrontPage";
import PostingDetailPage from "./Pages/PostingDetailPage";
import SearchResultPage from "./Pages/SearchResultPage";
import PostPage from "./Pages/PostPage";
import EditPage from "./Pages/EditPage";

import WrapperComponent from "./components/WrapperComponent";

import { user } from "./dummyData/dummydata";

function App() {
  return (
    <>
      <Router>
        <NavBar user={user} isDarkMode={true} />
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
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
