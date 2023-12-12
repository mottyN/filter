import {Link } from "react-router-dom";

export function Admin() {
  return (
    <div>
      <h1>מערכת ניהול סינון אתרים</h1>
      <div style={{ margin: "10px" }}>
        <Link to={'adminUsers'}> <button>לקוחות</button></Link>
      </div>
      <div
        style={{
          border: "1px black solid",
          width: "fit-content",
          margin: "auto",
          borderRadius: "10px",
          padding : '30px'
        }}
      >
        <h5>רשימת אתרים סגורה</h5>
        <label>חיפוש</label>
        <input type="text" />
        <div  style={{ margin: "10px",   border: "1px black solid",  width : '  minContent', margin: "auto", padding : '10px' }}>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
        </div>
        <label>הוספת אתר לרשימה</label>
        <input type="text" />
      </div>
    </div>
  );
}
