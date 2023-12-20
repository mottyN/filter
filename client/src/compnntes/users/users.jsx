import { useContext, useEffect, useState } from "react";
import SwitchListSecondary from "./citeList";
import ResponsiveAppBar from "./panel";
import Tags from "./Tags";
import  AddTags  from "./addTags";
import { useParams } from "react-router-dom";

export function Users () {
    const [page, setPage] = useState(0)
    const [tagsClosed, setTagsClosed] = useState([])
    const [sites, setSites ] = useState([])

    const  {id}  = useParams();

    useEffect(() => {
        reqSite()
    },[])
    
    const reqSite = async()=> {
        try {
            const res = await fetch(`http://localhost:4000/api/sitesUser/${id}`);
            const data = await res.json();
            setSites(data);
            console.log(data);
          } catch (e) {
            console.log(e);
          }
    }
    const addSite = async(url, name)=> {
        try {
            const res = await fetch(`http://localhost:4000/api/sitesUser/${id}`, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ url : url, name: name}),
              });
            const data = await res.json();
            reqSite()
            // setSites(data);
            // console.log(data);
          } catch (e) {
            console.log(e);
            alert("אירעה שגיאה נסה שוב")
          }
    }

    console.log(page);
    return (
        <div>
            <ResponsiveAppBar setPage={setPage}/>
            {page === 0 && <SwitchListSecondary sites={sites} addSite={addSite} tagsClosed={tagsClosed}/>}
            {page === 1 && <> <p>תיוגים </p> <Tags setTagsClosed={setTagsClosed} tagsClosed={tagsClosed}/></>}
            {page === 2 && <> <p>הצעות לתיוג</p> <AddTags /></>}

            {/* <SwitchListSecondary /> */}
        </div>
    )
}