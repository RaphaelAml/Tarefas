import { Box, TextField, FormControlLabel, Checkbox, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

export default function RegisterUserForm() {
  return (
    <form method="POST" action="/api/register-user">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome"
          name="fullName"
          required
        />

        <FormControl fullWidth required>
          <InputLabel id="gender-label">Gênero</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            defaultValue=""
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Email"
          name="email"
          type="email"
          required
        />
        <TextField
          label="Número de Celular"
          name="phone"
          required
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          required
        />
        <TextField
          label="Confirmar Senha"
          name="confirmPassword"
          type="password"
          required
        />

        <FormControlLabel
          control={<Checkbox name="isAdmin" />}
          label="Usuário Administrador"
          sx={{ mb: -3 }}
        />
        <FormControlLabel
          control={<Checkbox name="isCollaborator" />}
          label="Usuário Colaborador"
          sx={{ mb: -3 }}
        />
        <FormControlLabel
          control={<Checkbox name="isClient" />}
          label="Usuário Cliente"
        />

        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">Cadastrar</Button>
          <Button variant="contained" color="success">Editar</Button>
          <Button variant="contained" color="success">Voltar</Button>
        </Stack>
      </Box>
    </form>
  );
}
