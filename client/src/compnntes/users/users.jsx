import { useContext, useState } from "react";
import SwitchListSecondary from "./citeList";
import ResponsiveAppBar from "./panel";
import Tags from "./Tags";
import  AddTags  from "./addTags";

export function Users () {
    const [page, setPage] = useState(0)
    const [tagsClosed, setTagsClosed] = useState([])
    const MyContext = useContext("ftyf");
    console.log(page);
    return (
        <div>
            <ResponsiveAppBar setPage={setPage}/>
            {page === 0 && <SwitchListSecondary tagsClosed={tagsClosed}/>}
            {page === 1 && <> <p>תיוגים </p> <Tags setTagsClosed={setTagsClosed} tagsClosed={tagsClosed}/></>}
            {page === 2 && <> <p>הצעות לתיוג</p> <AddTags /></>}

            {/* <SwitchListSecondary /> */}
        </div>
    )
}