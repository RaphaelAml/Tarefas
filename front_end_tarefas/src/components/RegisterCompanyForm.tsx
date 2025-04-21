'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

const taxOptions = ['Simples Nacional', 'Lucro Real', 'Lucro Presumido'];

const initialFormState = {
  corporateName: '',
  tradeName: '',
  cnpj: '',
  stateRegistration: '',
  street: '',
  neighborhood: '',
  cep: '',
  state: '',
  country: '',
  complement: '',
  email: '',
  landline: '',
  mobile: '',
  responsibleName: '',
  taxRegime: '',
};

export default function RegisterCompanyForm() {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', p: 3 }}
    >
      <Typography variant="h5" gutterBottom>Cadastrar Empresa</Typography>
  
      <TextField label="Razão Social *" name="corporateName" fullWidth required value={formData.corporateName} onChange={handleChange} />
      <TextField label="Nome Fantasia" name="tradeName" fullWidth value={formData.tradeName} onChange={handleChange} />
      <TextField label="CNPJ *" name="cnpj" fullWidth required value={formData.cnpj} onChange={handleChange} />
      <TextField label="Inscrição Estadual" name="stateRegistration" fullWidth value={formData.stateRegistration} onChange={handleChange} />
  
      <TextField label="Logradouro *" name="street" fullWidth required value={formData.street} onChange={handleChange} />
      <TextField label="Bairro *" name="neighborhood" fullWidth required value={formData.neighborhood} onChange={handleChange} />
      <TextField label="CEP *" name="cep" fullWidth required value={formData.cep} onChange={handleChange} />
      <TextField label="Estado *" name="state" fullWidth required value={formData.state} onChange={handleChange} />
      <TextField label="País" name="country" fullWidth value={formData.country} onChange={handleChange} />
  
      <TextField label="Complemento" name="complement" fullWidth value={formData.complement} onChange={handleChange} />
      <TextField label="Email *" name="email" type="email" fullWidth required value={formData.email} onChange={handleChange} />
      <TextField label="Telefone Fixo *" name="landline" fullWidth required value={formData.landline} onChange={handleChange} />
      <TextField label="Celular *" name="mobile" fullWidth required value={formData.mobile} onChange={handleChange} />
  
      <TextField label="Nome do Responsável *" name="responsibleName" fullWidth required value={formData.responsibleName} onChange={handleChange} />
  
      <FormControl fullWidth required>
        <InputLabel id="taxRegime-label">Regime Tributário *</InputLabel>
        <Select
          labelId="taxRegime-label"
          name="taxRegime"
          value={formData.taxRegime}
          onChange={handleChange}
          label="Regime Tributário *"
        >
          {taxOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
  
      <Stack spacing={2} direction="row">
        <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
        <Button type="submit" variant="contained" color="primary">Editar</Button>
        <Button variant="outlined" color="secondary">Cancelar</Button>
      </Stack>
    </Box>
  );
  
}
