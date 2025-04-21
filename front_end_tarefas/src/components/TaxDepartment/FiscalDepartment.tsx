'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import SimplesNacionalTasks from './SimplesNacional/SimplesNacionalTasks';
import LucroRealTasks from './LucroReal/LucroRealTasks';

export default function FiscalDepartment() {
  const regimes = ['Simples Nacional', 'Lucro Real', 'Lucro Presumido'];
  const [selectedRegime, setSelectedRegime] = useState(0);

  const renderRegimeContent = () => {
    const regime = regimes[selectedRegime];

    if (regime === 'Simples Nacional') {
      return <SimplesNacionalTasks />;
    }

    if (regime === 'Lucro Real') {
      return <LucroRealTasks />;
    }

    if (regime === 'Lucro Presumido') {
      return (
        <Typography variant="body1" sx={{ mt: 3 }}>
          Em breve: tarefas para Lucro Presumido
        </Typography>
      );
    }

    return null;
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Tarefas do Departamento Fiscal
      </Typography>

      <Tabs
        value={selectedRegime}
        onChange={(_, newValue) => setSelectedRegime(newValue)}
        centered
        sx={{ mb: 3 }}
      >
        {regimes.map((regime, index) => (
          <Tab key={index} label={regime} />
        ))}
      </Tabs>

      {renderRegimeContent()}
    </Box>
  );
}
