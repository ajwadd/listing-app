import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  inputContainer: { width: "222.4px" },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const initialData = {
    createdDate: "",
    status: "",
    firstName: "",
    lastName: "",
    userName: "",
    registrationNumber: 0,
  };
  const [data, setData] = React.useState(initialData);

  const statusOptions = ["En Validation", "Validé", "Rejeté"];

  const [users, setUsers] = React.useState([
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
    },
    {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
    },
    {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
    },
  ]);

  const handleChange = ({ target }) => {
    console.log("change");
    setData({ ...data, [target.name]: target.value });
  };

  const handleChangeStatus = (e, value) => {
    setData({ ...data, status: value });
  };

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteUser = (id) => {
    console.log("Delete");
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    console.log("add");
    let user = {
      ...data,
    };
    const id = Math.floor(Math.random() * 1000000000) + 1;
    const newUser = { id, ...user };
    users.push(newUser);
    setData(initialData);
    setOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Validé":
        return "#5BE881";
      case "Rejeté":
        return "#FF0000";
      case "En validation":
        return "#FDB64D";
      default:
        break;
    }
  };

  return (
    <Grid item container style={{ padding: "100px 100px" }} alignItems="center">
      {/* Table */}
      <Paper
        component={Grid}
        container
        justifyContent="center"
        style={{ marginBottom: "1em", padding: "2em" }}
        elevation={3}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#E2E3F3" }}>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>createdDate</TableCell>
              <TableCell>status</TableCell>
              <TableCell>firstName</TableCell>
              <TableCell>lastName</TableCell>
              <TableCell>userName</TableCell>
              <TableCell>registrationNumber</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.createdDate}</TableCell>
                <TableCell>
                  <div
                    style={{
                      backgroundColor: getStatusColor(user.status),
                      color: "white",
                      borderRadius: "11px",
                      padding: "5px 0px 5px 0px",
                      textAlign: "center",
                    }}
                  >
                    {user.status}
                  </div>
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.registrationNumber}</TableCell>
                <TableCell>
                  <DeleteIcon onClick={() => handleDeleteUser(user.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Button */}
      <Paper
        component={Grid}
        item
        container
        justifyContent="flex-end"
        elevation={3}
        style={{ padding: "1em" }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{ backgroundColor: "#FFAA0A", color: "grey" }}
        >
          Ajouter Utilisateur
        </Button>
      </Paper>
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <Grid item container>
            <Typography style={{fontWeight:"bold", fontSize: '30px', marginBottom:'10px'}}>Ajout d'utilisateurs</Typography>

            </Grid>
            <Grid item container spacing={5}>
              <Grid item container direction="column" xs>
                <Typography style={{color:'grey'}}>Nom</Typography>
                <TextField
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  size="small"
                  
                />
              </Grid>
              <Grid item container direction="column" xs>
                <Typography style={{color:'grey'}}>Prenom</Typography>
                <TextField
                  size="small"
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                />
              </Grid>

              {/* <TextField
                label="Etat"
                size="small"
                type="text"
                value={data.status}
                name="status"
                onChange={handleChange}
              /> */}
              <Grid item container direction="column" xs>
                <Typography style={{color:'grey'}}>Etat</Typography>
                <Autocomplete
                  size="small"
                  type="text"
                  value={data.status}
                  onChange={handleChangeStatus}
                  options={statusOptions}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              style={{marginTop:'15px'}}              
            >
              <Grid item>
                <Typography style={{color:'grey'}}>Nom d'utilisateur</Typography>
                <TextField
                style={{width:'240px'}}
                  size="small"
                  type="text"
                  value={data.userName}
                  name="userName"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item > 
                <Typography style={{marginLeft:'40px',color:'grey'}}>Date de creation</Typography>
                <TextField
                                style={{width:'240px', marginLeft:'40px'}}

                  size="small"
                  type="date"
                  value={data.createdDate}
                  name="createdDate"
                  onChange={handleChange}
                />
              </Grid>

           
            </Grid>
            <Grid item container direction="column" xs style={{width:'240px',marginTop:'15px'}}>
                <Typography style={{color:'grey'}}>Matricule</Typography>
                <TextField
                                                

                  size="small"
                  type="text"
                  value={data.registrationNumber}
                  name="registrationNumber"
                  onChange={handleChange}
                />
              </Grid>
          </form>
          <Grid item container justifyContent='flex-end' style={{marginTop: "2em",}}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FFAA0A",
              color: "grey",
            }}
            onClick={handleAddUser}
          >
            Enregistrer
          </Button>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}

export default App;
