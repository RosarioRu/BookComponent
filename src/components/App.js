import React from "react";
import Header from "./Header";
import BookControl from "./BookControl";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return(
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<BookControl />} />
      </Routes>
    </Router>
  );
}

export default App;