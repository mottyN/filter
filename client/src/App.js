import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Admin } from "./compnntes/admin/admin";
import { Users } from "./compnntes/users/users";
import { AdminUsers } from "./compnntes/admin/adminUsers";
import SignUp from "./compnntes/login/signUp";
import Login from "./compnntes/login/Login";
import { Adiminm } from "./compnntes/admin/adminm";
import SignIn from "./compnntes/login/signUpUi";
import LogIn from "./compnntes/login/logInUi";
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
        <Route index element={<LogIn />} />
          <Route path="login" element={<LogIn />} />
          {/* <Route path="users/:id" element={<Users />} /> */}
          <Route path="signUp" element={<SignIn />} />
          <Route path="admin" element={<Adiminm />} />
          <Route path="admin/adminUsers" element={<AdminUsers />} />
          <Route path="users/:id" element={<Users />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
     
  );
}

export default App;
