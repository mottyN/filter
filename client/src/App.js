import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Admin } from "./compnntes/admin/admin";
import { Users } from "./compnntes/users/users";
import { AdminUsers } from "./compnntes/admin/adminUsers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/adminUsers" element={<AdminUsers />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
