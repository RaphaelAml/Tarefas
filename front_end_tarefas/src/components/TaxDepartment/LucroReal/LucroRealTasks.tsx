'use client';

import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Stack, Tabs, Tab, Typography } from '@mui/material';
import RulesIss from '../SimplesNacional/RulesIss';
import RulesDiferencialAliquotas from '../SimplesNacional/RulesDiferencialAliquotas';
import RulesFechamentoPrefeitura from '../SimplesNacional/RulesFechamentoPrefeitura';
import RulesPadraoComVencimento from './RulesPadraoComVencimento';

const lucroRealTasks = [
  'Guia: Iss',
  'Guia: Icms',
  'Guia: Icms-St',
  'Guia: Fcp',
  'Guia: Pis',
  'Guia: Cofins',
  'Guia: Ipi',
  'Guia: Diferencial de alíquota',
  'Guia: Funrural',
  'Guia: Difal',
  'Declaração: Sped Fiscal',
  'Declaração: Sped Contribuições',
  'Declaração: Mit',
  'Declaração: Dctf-web',
  'Declaração: Gia St',
  'Declaração: Fechamento de declaração na prefeitura',
];

export default function LucroRealTasks() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [deliveryRule, setDeliveryRule] = useState<{ [key: string]: string }>({});
  const [jurisdiction, setJurisdiction] = useState<{ [key: string]: string }>({});
  const [vencimentoDia, setVencimentoDia] = useState<{ [key: string]: string }>({});
  const [issDueDate, setIssDueDate] = useState('');
  const [issCity, setIssCity] = useState('');
  const [prefeituraDueDate, setPrefeituraDueDate] = useState('');
  const [prefeituraDeliveryRule, setPrefeituraDeliveryRule] = useState('');
  const [prefeituraAnteciparPara, setPrefeituraAnteciparPara] = useState('');
  const [prefeituraProrrogarPara, setPrefeituraProrrogarPara] = useState('');

  useEffect(() => {
    if (activeTab >= selectedOptions.length) {
      setActiveTab(0);
    }
  }, [selectedOptions, activeTab]);

  const handleSelectOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    setSelectedOptions((prev) =>
      isSelected ? prev.filter((item) => item !== option) : [...prev, option]
    );

    if (isSelected) {
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

      setVencimentoDia((prev) => {
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

  const renderTabContent = (option?: string) => {
    if (!option) return null;

    if (option === 'Guia: Iss') {
      return (
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
      );
    }

    if (option === 'Guia: Diferencial de alíquota') {
      return (
        <RulesDiferencialAliquotas
          option={option}
          deliveryRule={deliveryRule[option] || ''}
          jurisdiction={jurisdiction[option] || ''}
          onChangeDelivery={(val) => setDeliveryRule({ ...deliveryRule, [option]: val })}
          onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
        />
      );
    }

    if (option === 'Declaração: Fechamento de declaração na prefeitura') {
      return (
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
      );
    }

    return (
      <RulesPadraoComVencimento
        option={option}
        vencimentoDia={vencimentoDia[option] || ''}
        deliveryRule={deliveryRule[option] || ''}
        jurisdiction={jurisdiction[option] || ''}
        onChangeVencimentoDia={(val) => setVencimentoDia({ ...vencimentoDia, [option]: val })}
        onChangeDelivery={(val) => setDeliveryRule({ ...deliveryRule, [option]: val })}
        onChangeJurisdiction={(val) => setJurisdiction({ ...jurisdiction, [option]: val })}
      />
    );
  };

  return (
    <Box>
      <Stack spacing={1} sx={{ mb: 3 }}>
        {lucroRealTasks.map((option) => (
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
