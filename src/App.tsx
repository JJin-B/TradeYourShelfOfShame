import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";

import FrontPage from "./Pages/FrontPage";
import PostingDetailPage from "./Pages/PostingDetailPage";
import SearchResultPage from "./Pages/SearchResultPage";

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
            path="/posting/:postId"
            element={
              <WrapperComponent>
                <PostingDetailPage />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;