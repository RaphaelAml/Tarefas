import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';


export default function LoginForm() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login enviado:', formData);
    // Aqui você pode fazer o fetch ou axios para autenticar
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>

      <TextField
        label="Email ou Celular"
        name="identifier"
        required
        fullWidth
        value={formData.identifier}
        onChange={handleChange}
      />

      <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="password">Senha</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
              >
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button type="button" variant="outlined" color="secondary">
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}
