import { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type Form = {
  username: string;
  password: string;
};

const Login = () => {
  const USER: Form = { username: "admin", password: "1234" };

  const [form, setForm] = useState<Form>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.username === USER.username && form.password === USER.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", form.username);
      localStorage.setItem("pass", form.password);

      navigate("/pokemonView");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container maxWidth="xs">
      <h1>Romeo Lisandro Ruiz Alvarado</h1>
      <h2>Prueba Tecnica: Podedex</h2>
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Box
          className="loginForm"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            sx={{ mb: 2 }}
            required
            id="outlined-basic"
            label="Correo electronico"
            variant="outlined"
            name="username"
            //type="email"
            onChange={handleChange}
          />
          <TextField
            sx={{ mb: 2 }}
            required
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            sx={{ mt: 1 }}
            className="loginbutton"
            variant="contained"
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
