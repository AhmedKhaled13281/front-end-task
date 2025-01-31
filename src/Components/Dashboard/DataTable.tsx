import { useState, useEffect, useCallback  , useRef} from "react";
import {Box , Table , TableBody , TableCell , TableContainer , TableHead , TableRow , TablePagination} from '@mui/material'
import ImageSlideShow from "./ImageSlideShow";
import TableToolbar from "./TableToolbar";
import { useSelector} from 'react-redux';


type Data = {
  _id : string,
  for_sale : boolean,
  photos : string[],
  unit_id : string,
  total_price : string,
  unit_type : string,
  bua : number,
  useSelector : () => void;
}

const Style = {
  fontSize : '16px',
  fontWeight : 700,
  textAlign : 'center'
}

function EnhancedTableHead() {

  return (
    <TableHead>
          <TableRow>
            <TableCell sx={Style} >Unit ID</TableCell>
            <TableCell sx={Style} >Unit Type</TableCell>
            <TableCell sx={Style} >Price</TableCell>
            <TableCell sx={Style} >Building up area</TableCell>
            <TableCell sx={Style} >For sale</TableCell>
            <TableCell sx={Style} >Gallery</TableCell>
          </TableRow>
    </TableHead>
  );
}

type State = {
  data : Data[]
}


export default function DataTable() {
  const [img , setImages] = useState<string[]>([])
  let rows : Data[] = useSelector((state : State) => state.data)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 const array =  useCallback((images : Data) => {
    rows?.map((item) => {
        if(item._id == images._id)
            {
              console.log(item.photos);
              setImages(item.photos)
            }
    })
  } , [rows])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
     setRowsPerPage(parseInt(event.target.value, 10));
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', mb: 2 , backgroundColor : '#fff'}}>

        <TableToolbar  />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead />

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {

                  return (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.unit_id}
                      </TableCell>
                      <TableCell align="center">{row.unit_type}</TableCell>
                      <TableCell align="center">{row.total_price} EGP</TableCell>
                      <TableCell align="center">{row.bua}</TableCell>
                      <TableCell align="center">
                        {row.for_sale ? (
                          <span
                            style={{
                              padding: "4px",
                              backgroundColor: "#2419BE",
                              color: "white",
                              borderRadius: "6px",
                            }}
                          >
                            For Sale
                          </span>
                        ) : (
                          <span
                            style={{
                              padding: "4px",
                              backgroundColor: "#616161",
                              color: "white",
                              borderRadius: "6px",
                            }}
                          >
                            Not For Sale
                          </span>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <div style={{ width: "100%" }}>
                          <img
                            onClick={() => {
                              handleOpen(), array(row);
                            }}
                            src={row.photos[0]}
                            alt={row.unit_type}
                            style={{ width: "50px", height: "50px"  , cursor : 'pointer'}}
                          />
                          {open && (
                            <ImageSlideShow
                              images={img}
                              open={open}
                              handleClose={handleClose}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}


