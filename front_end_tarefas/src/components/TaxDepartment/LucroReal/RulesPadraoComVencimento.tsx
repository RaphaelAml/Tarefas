import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

type Props = {
  option: string;
  vencimentoDia: string;
  deliveryRule: string;
  jurisdiction: string;
  onChangeVencimentoDia: (value: string) => void;
  onChangeDelivery: (value: string) => void;
  onChangeJurisdiction: (value: string) => void;
};

export default function RulesPadraoComVencimento({
  option,
  vencimentoDia,
  deliveryRule,
  jurisdiction,
  onChangeVencimentoDia,
  onChangeDelivery,
  onChangeJurisdiction,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Qual o dia padrão de vencimento (ex: 15)?"
        type="number"
        InputProps={{ inputProps: { min: 1, max: 31 } }}
        value={vencimentoDia}
        onChange={(e) => onChangeVencimentoDia(e.target.value)}
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">
          Esse imposto deve ser antecipado ou prorrogado quando o vencimento cair em feriado/final de semana?
        </FormLabel>
        <RadioGroup
          row
          value={deliveryRule}
          onChange={(e) => onChangeDelivery(e.target.value)}
        >
          <FormControlLabel value="antecipar" control={<Radio />} label="Antecipar" />
          <FormControlLabel value="prorrogar" control={<Radio />} label="Prorrogar" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Esse imposto é de qual jurisdição?</FormLabel>
        <RadioGroup
          row
          value={jurisdiction}
          onChange={(e) => onChangeJurisdiction(e.target.value)}
        >
          <FormControlLabel value="Federal" control={<Radio />} label="Federal" />
          <FormControlLabel value="Estadual" control={<Radio />} label="Estadual" />
          <FormControlLabel value="Municipal" control={<Radio />} label="Municipal" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
