'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
  FormControl,
  FormLabel,
} from '@mui/material';

const simplesNacionalOptions = [
  'Declaração simples nacional',
  'DAS',
  'ISS',
  'Sintegra',
  'Fechamento de declaração na prefeitura',
  'Produtos importados 4%',
  'Diferencial de alíquota',
];

export default function RegisterTaxRegimeForm() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [departmentsByOption, setDepartmentsByOption] = useState<{ [key: string]: string[] }>({});

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );

    // Remove departamentos se desmarcado
    if (selectedOptions.includes(option)) {
      setDepartmentsByOption((prev) => {
        const newDepartments = { ...prev };
        delete newDepartments[option];
        return newDepartments;
      });
    }
  };

  const handleDepartmentCheckboxChange = (option: string, department: string) => {
    setDepartmentsByOption((prev) => {
      const current = prev[option] || [];
      const updated = current.includes(department)
        ? current.filter((d) => d !== department)
        : [...current, department];
      return {
        ...prev,
        [option]: updated,
      };
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Cadastro de Obrigações
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardHeader title="Simples Nacional" />
        <CardContent>
          <Stack spacing={2}>
            {simplesNacionalOptions.map((option) => (
              <Box key={option}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                  }
                  label={option}
                />

                {selectedOptions.includes(option) && (
                  <FormControl component="fieldset" sx={{ ml: 4, mt: 1 }}>
                    <FormLabel component="legend">
                      Essa visualização deseja que seja visível a qual departamento?
                    </FormLabel>
                    <Stack direction="row">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={departmentsByOption[option]?.includes('Fiscal') || false}
                            onChange={() => handleDepartmentCheckboxChange(option, 'Fiscal')}
                          />
                        }
                        label="Departamento Fiscal"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={departmentsByOption[option]?.includes('Contábil') || false}
                            onChange={() => handleDepartmentCheckboxChange(option, 'Contábil')}
                          />
                        }
                        label="Departamento Contábil"
                      />
                    </Stack>
                  </FormControl>
                )}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
