import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Login.css";

function SignUp() {
  const [name, setname] = useState("");
  const [emil, setemil] = useState("");
  const [password, setPassword] = useState("");
  const [from, setFrom] = useState(true);
  const [err, setErr] = useState("");
  const [errOn, setErrOn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // קוד בשביל סמארטפון
  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth < 768);
  });

  const errMessage = (message) => {
    setErr(message);
    setErrOn(true);
    setname("");
    setPassword("");
    setemil("");
    setTimeout(() => {
      setErrOn(false);
      console.log("time");
    }, 5000);
  };
  const handlenameChange = (event) => {
    setname(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setemil(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const domin = "";

  // const handleSubmit1 = async (event) => {
  //   event.preventDefault(); // Prevent the default form submission behavior.

  //   try {
  //     const response = await fetch(`${domin}/user/sent-code/register`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json", // Specify the content type if sending JSON data.
  //       },
  //       body: JSON.stringify({
  //         phone: name, // You should specify the phone number to send in the request.
  //       }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setFrom(false);
  //     } else {
  //       errMessage(data.message);
  //       console.error("Request failed with status:", response);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    const domin = "http://localhost:4000";

    try {
      const response = await fetch(`${domin}/api/users `, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data.
        },
        body: JSON.stringify({
          name : name,
          email: emil,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/login";
        alert("המשתמש נוצר בהצלחה");
   
      } else {
        errMessage(data.message);
        console.error("Request failed with status:", response.status);
      }
      // console.log("Response from server:", data.message);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="App">
      <h1>קהילות קארד</h1>
      <h3>הרשמה</h3>
      {/* {from && (
        <form
          onSubmit={handleSubmit1}
          style={{ width: isMobile ? "70%" : "25%" }}
        >
       
          <button type="submit">שלח סיסמה לטלפון</button>
          <br />
          <Link to="/login">רשום כבר? לחץ כאן</Link>
          {errOn && <h6 className="err">{err}</h6>}
        </form>
      )} */}
       
        <form
          onSubmit={handleSubmit}
          style={{ width: isMobile ? "70%" : "25%" }}
        >
             <div className="form-group">
            <label htmlFor="name">  שם משתמש </label>
            <input
              type="text"
              id="name"
              name="phone"
              value={name}
              onChange={handlenameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">כתובת מייל</label>
            <input
              type="emil"
              id="emil"
              name="emil"
              value={emil}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"> סיסמה </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
             type='button'
              style={{ padding: "0%" }}
              className="password-eye"
              onClick={togglePasswordVisibility}
            >
              👁️
            </button>
          </div>
          <button type="submit">הרשמה</button>
          {errOn && <h6 className="err">{err}</h6>}
          <Link to="/login">רשום כבר? לחץ כאן</Link>

        </form>
      
    </div>
  );
}

export default SignUp;
