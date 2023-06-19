import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
function App() {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/:id" element={<ChatRoom />} />
            <Route path="*" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
