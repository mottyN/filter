import { useEffect, useState } from "react";
import { Panel } from "./panel";
import { Admin } from "./admin";
import { AdminUsers } from "./adminUsers";
import AdminTags from "./adminTags";

export function Adiminm(){
    const [page, setPage] = useState(0)
    const [ tags, settags] = useState([])
    // console.log(page);
    useEffect(() => {
        reqTags()
    },[])
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

    return (
        <div>
            <Panel setPage={setPage}/>
            {page === 0 && <Admin />}
            {page === 1 && <AdminTags tags={tags}/>}

            {page === 3 && <AdminUsers />}


        </div>
    )
}