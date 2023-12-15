import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";

import FrontPage from "./FrontPage";
import PostingDetailPage from "./PostingDetailPage";

import { postings, user } from "./dummyData/dummydata";

function App() {
  return (
    <>
      <Router>
        <NavBar user={user} isDarkMode={false} />

        <Routes>
          <Route path="/" element={<FrontPage postings={postings} />} />
          <Route
            path="/posting/:postId"
            element={<PostingDetailPage user={user} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
