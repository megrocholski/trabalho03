import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import theme from "../theme";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    console.log(name + username + phone + email + password);
    if (
      (name != null) &
      (name != "") &
      (username != null) &
      (username != "") &
      (phone != null) &
      (phone != "") &
      (email != null) &
      (email != "") &
      (password != null) &
      (password != "")
    ) {
      console.log("Login");
      await axios
        .post("http://localhost:8080/api/user", {
          email: email,
          username: username,
          password: password,
          name: name,
          phone: phone,
        })
        .then(
          (data) => (
            //   data.status == 200
            console.log(data.data),
            localStorage.clear(),
            localStorage.setItem("user", data.data.id),
            setTimeout(() => {
              navigate("/list");
            }, 500)
          )
          // : setError("Ocorreu um erro, tente novamente.")
        )
        .catch(() => setError("Ocorreu um erro, tente novamente."))
        .finally(setError(""));
    } else {
      setError("Todos os campos devem ser preenchidos!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        backgroundColor: theme.main,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <h1>Cadastro</h1>
        {error != "" ? (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {error}
          </Alert>
        ) : null}

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
            onChange={(event) => {
              setName(event.target.value);
            }}
            sx={{ width: "45%" }}
          />
          <TextField
            id="fullWidth"
            label="Nome de Usuário"
            variant="outlined"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            sx={{ width: "45%", marginBottom: 5 }}
          />
          <TextField
            id="fullWidth"
            label="Email"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            sx={{ width: "45%" }}
          />
          <TextField
            id="fullWidth"
            label="Telefone"
            variant="outlined"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            sx={{ width: "45%", marginBottom: 5 }}
          />
          <TextField
            id="fullWidth"
            label="Senha"
            type="password"
            variant="outlined"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            sx={{ width: "45%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            width: "90%",
          }}
        >
          <Button variant="contained" onClick={() => handleSignUp()}>
            Cadastrar
          </Button>
        </div>
        <Typography>Já possui conta?</Typography>
        <Link to="/">
          <Typography>Realizar login</Typography>
        </Link>
      </Paper>
    </div>
  );
}

export default SignUp;
