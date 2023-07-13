import React from "react";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/appBar";
import axios from "axios";

import {
  Button,
  Divider,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleChangePassword = async () => {
    if (editPassword) {
      if (
        (newPassword != null) &
        (newPassword != "") &
        (confirmPassword != null) &
        (confirmPassword != "")
      ) {
        if (newPassword === confirmPassword) {
          try {
            const res = await axios.put(
              `http://localhost:8080/api/user/${localStorage.getItem("user")}`,
              {
                email: email,
                username: username,
                name: name,
                phone: phone,
                password: newPassword,
              }
            );
            console.log("SALVAR");
            setEditPassword(false);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      setEditPassword(true);
    }
  };

  const handleClickButton = async () => {
    if (editMode) {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/user/${localStorage.getItem("user")}`,
          {
            email: email,
            username: username,
            name: name,
            phone: phone,
          }
        );
        console.log("SALVAR");
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setUsername(res.data.username);
        setEditMode(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEditMode(true);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const profileData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/${localStorage.getItem("user")}`
      );
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setUsername(res.data.username);
      console.log(name + email + phone + username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8080/api/user/${localStorage.getItem("user")}`)
  //       .then((data) => (setUser(data.data), console.log(user)))
  //       .catch(
  //         () => (setMessage("Ocorreu um erro ao carregar os dados"), handleClick)
  //       );
  //   }, [user]);
  return (
    <div>
      <PrimarySearchAppBar />
      <h1>Profile</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "95vw",
          justifyContent: "right",
          padding: 5,
          margin: 5,
        }}
      >
        <Button variant="contained" onClick={() => handleClickButton()}>
          {editMode ? "Salvar" : "Editar"}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "normal",
          padding: "5%",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "90%",
        }}
      >
        <TextField
          id="fullWidth"
          label="Nome Completo"
          variant="outlined"
          value={name}
          disabled={!editMode}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setName(event.target.value);
          }}
          sx={{ width: "45%" }}
        />
        <TextField
          id="fullWidth"
          label="Nome de Usuário"
          variant="outlined"
          value={username}
          disabled={!editMode}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          sx={{ width: "45%", marginBottom: 5 }}
        />
        <TextField
          id="fullWidth"
          label="Email"
          variant="outlined"
          value={email}
          disabled={!editMode}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          sx={{ width: "45%" }}
        />
        <TextField
          id="fullWidth"
          label="Telefone"
          variant="outlined"
          value={phone}
          disabled={!editMode}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          sx={{ width: "45%" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "95vw",
          justifyContent: "right",
          padding: 5,
          margin: 5,
        }}
      >
        <Button variant="contained" onClick={() => handleChangePassword()}>
          {editPassword ? "Salvar" : "Editar"}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "normal",
          padding: "5%",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "90%",
        }}
      >
        <TextField
          id="fullWidth"
          label="Nova Senha"
          variant="outlined"
          disabled={!editPassword}
        //   InputLabelProps={{ shrink: true }}
          type="password"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
          sx={{ width: "45%" }}
        />
        <TextField
          id="fullWidth"
          label="Confirme a nova senha"
          variant="outlined"
          disabled={!editPassword}
        //   InputLabelProps={{ shrink: true }}
          type="password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          sx={{ width: "45%", marginBottom: 5 }}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}

export default Profile;
