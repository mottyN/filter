import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [passwordPhone, setpasswordPhone] = useState("");
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
    setEmail("");
    setPassword("");
    setpasswordPhone("");
    setTimeout(() => {
      setErrOn(false);
      console.log("time");
    }, 5000);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setpasswordPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const domin = "https://m.tlushbot.co.il";

  const handleSubmit1 = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    try {
      const response = await fetch(`${domin}/user/sent-code/change-password`, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data.
        },
        body: JSON.stringify({
          phone: email, // You should specify the phone number to send in the request.
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setFrom(false);
      } else {
        errMessage(data.message);
        console.error("Request failed with status:", response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    try {
      const response = await fetch("./user/change-password", {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data.
        },
        body: JSON.stringify({
          verificationCode: passwordPhone,
          newPassword: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/login";
        alert("הסיסמא חודשה בהצלחה");
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
      <h1> קהילות קארד</h1>
      <h3>חידוש סיסמא</h3>
      {from && (
        <form
          onSubmit={handleSubmit1}
          style={{ width: isMobile ? "70%" : "25%" }}
        >
          <div className="form-group">
            <label htmlFor="email">מספר טלפון או כתובת מייל:</label>
            <input
              type="text"
              id="email"
              name="phone"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit">שלח סיסמה לטלפון</button>
          <br />
          {errOn && <h6 className="err">{err}</h6>}
        </form>
      )}
      {!from && (
        <form
          onSubmit={handleSubmit}
          style={{ width: isMobile ? "70%" : "25%" }}
        >
          <div className="form-group">
            <label htmlFor="password">הקלד סיסמה טלפונית</label>
            <input
              type="passwordPhone"
              id="passwordPhone"
              name="passwordPhone"
              value={passwordPhone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">הקלד סיסמה חדשה</label>
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
          <button type="submit">שמור סיסמא חדשה</button>
          {errOn && <h6 className="err">{err}</h6>}
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
