import React from 'react';
import RegisterCompanyForm from '@/components/RegisterCompanyForm';
import { Box, Typography } from '@mui/material';

export default function RegisterCompanyPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Empresa
      </Typography>
      <RegisterCompanyForm />
    </Box>
  );
}
