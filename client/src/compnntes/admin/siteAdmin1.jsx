import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "name", width: 130 },
  { field: "url", headerName: "url", width: 130 },
];

export default function DataTable(props) {
  const [selectedRows, setSelectedRows] = React.useState(props.siteClosed);
  const handleSelectionChange = (e, c) => {
    const uniqueNumber = findUniqueNumber(selectedRows, e);

    if (selectedRows.includes(uniqueNumber)) {
      props.setsiteClosed(uniqueNumber, 1);
    } else {
      props.setsiteClosed(uniqueNumber, 0);
    }
    //   console.log(e,c);
    setSelectedRows(e);
  };

  React.useEffect(() => {
    setSelectedRows(props.siteClosed);
  }, [props.siteClosed]);
  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        //   sx={{height:'1000'}}
        rows={props.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        onClick={() => console.log("sdtgrhtrgt")}
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
}
function findUniqueNumber(arr1, arr2) {
  // מחיקת המספרים המשותפים בין שני המערכים
  const combinedArray = arr1.concat(arr2);

  // עבור כל מספר במערך
  for (let i = 0; i < combinedArray.length; i++) {
    const currentNumber = combinedArray[i];

    // בדיקה אם המספר מופיע רק פעם אחת
    if (
      combinedArray.indexOf(currentNumber) ===
      combinedArray.lastIndexOf(currentNumber)
    ) {
      return currentNumber; // המספר שנמצא רק באחד מהמערכים
    }
  }

  return null; // אם לא נמצא מספר כזה
}
