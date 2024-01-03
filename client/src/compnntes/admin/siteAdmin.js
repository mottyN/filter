import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Key } from '@mui/icons-material';

import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

export default function SiteAdmin (props) {
    const [checked, setChecked] = React.useState([props.siteClosed]);
    // console.log(props.siteClosed);
      const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value.url);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value.url);
          props.setsiteClosed(value.id, 0)
        } else {
          newChecked.splice(currentIndex, 1);
          props.setsiteClosed(value.id, 1)

        }
    
        setChecked(newChecked);
        
        console.log(newChecked);
      };
      React.useEffect(() => {
        setChecked(props.siteClosed)
      }, [props.siteClosed])
  return (
    <>
    <Box sx={{ marginX: 'auto', display: 'flex', justifyContent: 'center'}}>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>רשימת אתרים</ListSubheader>}
    >
     
      {props.categories.map((c) => {
        return <div key={c.id}> 
        <ListItem>
        {/* <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon> */}
        {/* <Button variant="outlined">הצג </Button> */}
        <ListItemText id={c.id} primary={c.name} />
        <ListItemText id={c.id} primary={c.url} />
        <Switch
          edge="end"
          onChange={handleToggle(c)}
          checked={checked.indexOf(c.url) !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>
      </div>
      })}
    </List>
    </Box>
    {/* <DataTable data={props.categories} siteClosed={props.siteClosed}/> */}
    {/* <EnhancedTable /> */}
    </>
  );
}


// // import * as React from 'react';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'name', headerName: 'name', width: 130 },
//   { field: 'url', headerName: 'url', width: 130 },
//   {
//     field: 'status',
//     headerName: 'status',
//     type: 'number',
//     width: 90,
//   },

// ];

// // const rows = [
// //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
// //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
// //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
// //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
// //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
// //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
// //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
// //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
// //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// // ];

//  function DataTable(props) {
//   // const DataTable = () => {
//     console.log(props.siteClosed);
//     const [selectedRows, setSelectedRows] = React.useState([]);
//   console.log(selectedRows);
//     const handleSelectionChange = (e) => {
//       console.log(e);
//       setSelectedRows(e);
//     };
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={props.data}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         onClick={()=>console.log("sdtgrhtrgt")}
//         // onCellConCellDoubleClick={()=>console.log("sdtgrhtrgt")}
//         checkboxSelection
//         // onchk={handleSelectionChange}
//         // selectionModel={selectedRows}
//         rowSelectionModel={selectedRows}
//         // onSelectionModelChange={handleSelectionChange}
//         onRowSelectionModelChange={handleSelectionChange}
//       />
  
//     </div>
//   );
// }
