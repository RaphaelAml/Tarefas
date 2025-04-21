'use client';

import React from 'react';
import { Box, Card, CardContent, CardHeader, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import FiscalDepartment from '@/components/TaxDepartment/FiscalDepartment';

export default function DepartmentsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Cadastro de Tarefas por Departamento
      </Typography>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ mt: 4 }}
      >
        {/* Card: Departamento Fiscal */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            flex: 1,
            minWidth: 350,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" align="center">
                Departamento Fiscal
              </Typography>
            }
          />
          <CardContent>
            <FiscalDepartment />
          </CardContent>
        </Card>

        {/* Card: Departamento Contábil */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            flex: 1,
            minWidth: 350,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" align="center">
                Departamento Contábil
              </Typography>
            }
          />
          <CardContent>
            <Typography align="center" sx={{ mt: 2 }}>
              Em breve: tarefas para o Departamento Contábil.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
