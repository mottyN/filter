import { useEffect, useState } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import "./Login.css";
import { Connection } from "./connection";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [data, setData] = useState("");
  const [con, setCon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin]= useState(false)
  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isadmin = queryParams.get('admin');
  useEffect(()=> {
    if(isadmin == '1') {
      setAdmin(true)
    }
  },[])
  console.log(admin);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // קוד בשביל סמארטפון
  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth < 768);
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //קוד לשרת
    const domin = "http://localhost:4000";

    try {
      const response = await fetch(`${domin}/api/login?admin=${admin} `, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data.
        },
        body: JSON.stringify({
          name: email,
          password: password,
        }),
      });
      const data = await response.json();
      setData(data);
      if (response.ok) {
        // setCon(true)
        var userDataJSON = JSON.stringify(data);
        localStorage.setItem("userData", userDataJSON);
        // console.log(data);
        if (admin) {
          window.location.href = `/admin`;

        }
        else{

          window.location.href = `/users/${data.id}`;
        }
        // alert("הצלחה");
      } else {
        console.log(data.massenge);
        // errMessage(data.message)
        console.error("Request failed with status:", response.status);
        alert(data.massenge);
      }
      // console.log("Response from server:", data.message);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("שגיאה-");
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
              <style>
        {`
          /* הוסף את הCSS הבא ישירות כאן */
          .App {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f4;
          }

          form {
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1, h3 {
            text-align: center;
            color: #333;
          }

          /* עוד קוד כמו שהוא */

          @media screen and (max-width: 768px) {
            form {
              width: 70%;
            }
          }

          @media screen and (max-width: 480px) {
            form {
              width: 90%;
            }
          }
        `}
      </style>
      <h1> פילטר כניסה</h1>
      {!con && (
        <form
          onSubmit={handleSubmit}
          action="./user/login"
          method="post"
          // style={{ width: isMobile ? "70%" : "25%" }}
        >
          <h3>התחברות</h3>
          <div className="form-group">
            <label htmlFor="email"> שם:</label>
            <input
              type="text"
              id="email"
              name="phone"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group password-container">
            <label htmlFor="password">סיסמה:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="password-input"
                required
              />
              <button
                type="button"
                style={{ padding: "0%" }}
                className="password-eye"
                onClick={togglePasswordVisibility}
              >
                👁️
              </button>
            </div>
            {/* <Link to="/forgotPassword">שכחת סיסמתך לחץ כאן</Link> */}
          </div>
          {/* <label htmlFor="admin">
            <input id="admin" type="checkbox" checked={admin} onChange={(e)=>setAdmin(e.target.checked)}/>
            התחברות כמנהל
          </label> */}
          <br/>
          <button type="submit">כניסה</button>
          <br></br>
          <Link to="/signUp">לא רשום? לחץ כאן</Link>
        </form>
      )}
      {con && <Connection obj={data} />}
    </div>
  );
}

export default Login;
