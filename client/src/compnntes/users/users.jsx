import { useState } from "react";
import SwitchListSecondary from "./citeList";
import ResponsiveAppBar from "./panel";
import Tags from "./Tags";

export function Users () {
    const [page, setPage] = useState(0)
    console.log(page);
    return (
        <div>
            <ResponsiveAppBar setPage={setPage}/>
            {page === 0 && <SwitchListSecondary />}
            {page === 1 && <> <p>תיוגים </p> <Tags /></>}
            {page === 2 && <p>הצעות לתיוג</p>}

            {/* <SwitchListSecondary /> */}
        </div>
    )
}