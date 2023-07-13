import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../theme";

function Login(setUser) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(username);
    console.log(password);
    if (
      username != "" &&
      password != "" &&
      username != null &&
      password != null
    ) {
      console.log("Login");
      axios
        .get(
          `http://localhost:8080/api/login?username=${username}&password=${password}`
        )
        .then((data) =>
          data.status == 200
            ? (console.log(data.data),
              localStorage.clear(),
              localStorage.setItem("user", data.data.id),
              setTimeout(() => {
                navigate("/list");
              }, 500))
            : setError(true)
        )
        .catch(() => setError(true))
        .finally(setError(false));
    } else {
      setError(true);
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
        <h3>Para continuar realize o login</h3>
        {error ? (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            Senha ou Username incorreto!
          </Alert>
        ) : null}
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ marginBottom: 3, backgroundColor: theme.white }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          type="password"
          sx={{ marginBottom: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleLogin()}>
          Entrar
        </Button>
        <br />
        <br />
        <Typography>Não possui conta?</Typography>
        <Link to="/signup">
          <Typography> Realizar cadastro</Typography>
        </Link>
      </Paper>
    </div>
  );
}

export default Login;
