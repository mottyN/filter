import { Link, useNavigate } from "react-router-dom";
import SiteAdmin from "./siteAdmin";
import { useEffect, useState } from "react";
import { Panel } from "./panel";
import DataTable from "./siteAdmin1";

export function Admin() {
  const [sites, setSites] = useState([]);
  const [addSite, setAddSite] = useState('')
  const [addName, setAddName] = useState('')
  const nav = useNavigate();

  var storedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getSite();
    if (storedUserData === null) {
      console.log(storedUserData);
      nav("/");
    }
  }, []);

  const getSite = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/sites/", {
        headers: { authorization: storedUserData.accessToken },
      });
      const data = await res.json();
      setSites(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const setsiteClosed = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:4000/api/sites/${id}`, {
        method: "put",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });
      const data = await res.json();
      // setSites(data);
      // console.log(data);
      getSite();
    } catch (e) {
      console.log(e);
    }
  };
  const hndelAddSite = async() => {
    try {
      const res = await fetch(`http://localhost:4000/api/sites/`, {
        method: "post",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url : addSite, name: addName}),
      });
      const data = await res.json();
      // setSites(data);
      // console.log(data);
      getSite();
    } catch (e) {
      console.log(e);
      alert("אירעה שגיאה נסה שוב")
    }
    setAddSite('');
    setAddName("");
  }
  return (
    <div>
      {/* <Panel /> */}
      <h1>מערכת ניהול סינון אתרים</h1>
      {/* <div style={{ margin: "10px" }}>
        <Link to={"adminUsers"}>
        
        </Link>
      </div> */}
      <div
        style={{
          border: "1px black solid",
          width: "fit-content",
          margin: "auto",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <h5>רשימת אתרים סגורה</h5>
        {/* <label>חיפוש</label>
        <input type="text" /> */}
        {/* <div
          style={{
            margin: "10px",
            border: "1px black solid",
            width: "  minContent",
            margin: "auto",
            padding: "10px",
          }}
        > */}
          {/* <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p>
          <p>https://www.kore.co.il/flashNews#f104314</p> */}
          {sites && (
            <>  
            {/* <SiteAdmin
              categories={sites}
              siteClosed={sites
                .filter((item) => item.status === 0)
                .map((item) => item.url)}
              setsiteClosed={setsiteClosed}
            /> */}
                {/* <DataTab data={sites}/> */}
                <DataTable data={sites}  siteClosed={sites
                .filter((item) => item.status === 0)
                .map((item) => item.id)}
                setsiteClosed={setsiteClosed}
                />
                            
            </>
          )}
        {/* </div> */}
        <label>הוספת אתר לרשימה</label>
        <input type="text" value={addSite} onChange={(e) => setAddSite(e.target.value)} placeholder="כתובת אתר"/>
        <input type="text" value={addName} onChange={(e) => setAddName(e.target.value)}  placeholder="שם האתר"/>

        <input type="submit" onClick={hndelAddSite}/>
      </div>
    </div>
  );
}
