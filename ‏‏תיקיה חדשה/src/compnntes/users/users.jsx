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
    const [tags, settags ] = useState([])


    const  {id}  = useParams();

    useEffect(() => {
        reqSite()
        reqTags()
        reqTagsClosed()
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
    const deleteSite = async(users_sites_id) =>{
      try {
        const res = await fetch(`http://localhost:4000/api/sitesUser/${users_sites_id}`, {method: "delete", });
        // const data = await res.json();
        reqSite()
        // setSites(data);
        // console.log(data);
      } catch (e) {
        console.log(e);
        alert("אירעה שגיאה נסה שוב")
      }
    }

    const reqTags = async() => {
      try {
        const res = await fetch(`http://localhost:4000/api/tagsUser/`);
        const data = await res.json();
        settags(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    const reqTagsClosed = async() => {
      try {
        const res = await fetch(`http://localhost:4000/api/tagsUser/${id}`);
        const data = await res.json();
        let arr = [] 
        data.map((o) => {
          arr.push(o.name)
        })
        setTagsClosed(arr);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    const tagoeoe = async(tagId, bo) => {
      if(bo){

        try{
          const data = await fetch(`http://localhost:4000/api/tagsUser/${id}`,
          
           {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tagId : tagId}),
          })
        }
        catch(e){
          console.log(e);
        }
      }
      else{
        try{
          const data = await fetch(`http://localhost:4000/api/tagsUser/${id}/${tagId}`, { method: "delete" })
        }
        catch(e){
          console.log(e);
        }
      }
      reqTagsClosed()
    }

    // console.log(page);
    return (
        <div>
            <ResponsiveAppBar setPage={setPage}/>
            {page === 0 && <SwitchListSecondary sites={sites} addSite={addSite} deleteSite={deleteSite} tagsClosed={tagsClosed}/>}
            {page === 1 && <> <p>תיוגים </p> <Tags setTagsClosed={setTagsClosed} tagsClosed={tagsClosed} tags={tags} tagoeoe={tagoeoe}/></>}
            {page === 2 && <> <p>הצעות לתיוג</p> <AddTags /></>}

            {/* <SwitchListSecondary /> */}
        </div>
    )
}