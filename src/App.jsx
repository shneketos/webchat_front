import "./App.scss";
import Main from "./Pages/Main/Main";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Chat from "./Components/Chat/Chat";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
