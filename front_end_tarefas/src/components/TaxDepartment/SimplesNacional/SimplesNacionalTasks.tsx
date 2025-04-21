'use client';

import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Stack, Tabs, Tab, Typography, } from '@mui/material';
import SelectDepartmentVisibility from './SelectDepartmentVisibility';
import RulesIss from './RulesIss';
import RulesProdutosImportados from './RulesProdutosImportados';
import RulesDas from './RulesDas';
import RulesDiferencialAliquotas from './RulesDiferencialAliquotas';
import RulesFechamentoPrefeitura from './RulesFechamentoPrefeitura';





const simplesNacionalTasks = [
  'Guia: Das',
  'Guia: Iss',
  'Declaração: Fechamento de declaração na prefeitura',
  'Guia: Produtos importados 4%',
  'Guia: Diferencial de alíquota',
];

export default function SimplesNacionalTasks() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [departmentsByOption, setDepartmentsByOption] = useState<{ [key: string]: string[] }>({});
  const [deliveryRule, setDeliveryRule] = useState<{ [key: string]: string }>({});
  const [jurisdiction, setJurisdiction] = useState<{ [key: string]: string }>({});
  const [issDueDate, setIssDueDate] = useState('');
  const [issCity, setIssCity] = useState('');
  const [prefeituraDueDate, setPrefeituraDueDate] = useState('');
  const [prefeituraDeliveryRule, setPrefeituraDeliveryRule] = useState('');
  const [prefeituraAnteciparPara, setPrefeituraAnteciparPara] = useState('');
  const [prefeituraProrrogarPara, setPrefeituraProrrogarPara] = useState('');

  useEffect(() => {
    if (activeTab >= selectedOptions.length) {
      setActiveTab(0); // Corrige índice inválido quando uma aba é desmarcada
    }
  }, [selectedOptions, activeTab]);





  const handleSelectOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    setSelectedOptions((prev) =>
      isSelected ? prev.filter((item) => item !== option) : [...prev, option]
    );

    if (isSelected) {
      setDepartmentsByOption((prev) => {
        const updated = { ...prev };
        delete updated[option];
        return updated;
      });

      setDeliveryRule((prev) => {
        const updated = { ...prev };
        delete updated[option];
        return updated;
      });

      setJurisdiction((prev) => {
        const updated = { ...prev };
        delete updated[option];
        return updated;
      });

      if (option.toLowerCase().includes('iss')) {
        setIssDueDate('');
        setIssCity('');
      }
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

  const renderTabContent = (option?: string) => {
    if (!option) return null;

    return (
      <Stack spacing={2} sx={{ mt: 3 }}>
        <SelectDepartmentVisibility
          option={option}
          selected={departmentsByOption[option] || []}
          onChange={handleDepartmentCheckboxChange}
        />

        {option.toLowerCase().includes('iss') && (
          <RulesIss
            option={option}
            deliveryRule={deliveryRule[option] || ''}
            jurisdiction={jurisdiction[option] || ''}
            issDueDate={issDueDate}
            issCity={issCity}
            onChangeDelivery={(val) => setDeliveryRule({ ...deliveryRule, [option]: val })}
            onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
            onChangeIssDueDate={(val) => setIssDueDate(val)}
            onChangeIssCity={(val) => setIssCity(val)}
          />
        )}

        {option === 'Guia: Produtos importados 4%' && (
          <RulesProdutosImportados
            option={option}
            deliveryRule={deliveryRule[option] || ''}
            jurisdiction={jurisdiction[option] || ''}
            onChangeDelivery={(val) => setDeliveryRule({ ...deliveryRule, [option]: val })}
            onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
          />
        )}

        {option.toLowerCase().includes('das') && (
          <RulesDas
            option={option}
            deliveryRule={deliveryRule[option] || ''}
            jurisdiction={jurisdiction[option] || ''}
            onChangeDelivery={(val) => setDeliveryRule({ ...deliveryRule, [option]: val })}
            onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
          />
        )}

        {option === 'Guia: Diferencial de alíquota' && (
          <RulesDiferencialAliquotas
            option={option}
            deliveryRule={deliveryRule[option] || ''}
            jurisdiction={jurisdiction[option] || ''}
            onChangeDelivery={(val) => setDeliveryRule({ ...deliveryRule, [option]: val })}
            onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
          />
        )}

        {option === 'Declaração: Fechamento de declaração na prefeitura' && (
          <RulesFechamentoPrefeitura
            option={option}
            vencimento={prefeituraDueDate}
            deliveryRule={prefeituraDeliveryRule}
            anteciparPara={prefeituraAnteciparPara}
            prorrogarPara={prefeituraProrrogarPara}
            jurisdiction={jurisdiction[option] || ''}
            onChangeVencimento={(val) => setPrefeituraDueDate(val)}
            onChangeDelivery={(val) => setPrefeituraDeliveryRule(val)}
            onChangeAnteciparPara={(val) => setPrefeituraAnteciparPara(val)}
            onChangeProrrogarPara={(val) => setPrefeituraProrrogarPara(val)}
            onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
          />
        )}


      </Stack>
    );
  };

  return (
    <Box>
      <Stack spacing={1} sx={{ mb: 3 }}>
        {simplesNacionalTasks.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedOptions.includes(option)}
                onChange={() => handleSelectOption(option)}
              />
            }
            label={option}
          />
        ))}
      </Stack>

      {selectedOptions.length > 0 ? (
        <>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {selectedOptions.map((option, index) => (
              <Tab key={index} label={option} />
            ))}
          </Tabs>

          <Box sx={{ p: 2 }}>
            {selectedOptions[activeTab] && renderTabContent(selectedOptions[activeTab])}
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 3 }}>
          Selecione uma tarefa acima para configurar.
        </Typography>
      )}
    </Box>
  );
}
