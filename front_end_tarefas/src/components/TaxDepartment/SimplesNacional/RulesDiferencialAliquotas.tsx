import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

type Props = {
  option: string;
  deliveryRule: string;
  jurisdiction: string;
  onChangeDelivery: (value: string) => void;
  onChangeJurisdiction: (value: string) => void;
};

export default function RulesDiferencialAliquotas({
  option,
  deliveryRule,
  jurisdiction,
  onChangeDelivery,
  onChangeJurisdiction,
}: Props) {
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Esse imposto deve ser antecipado ou prorrogado quando o dia 03 cair em feriado/final de semana?
        </FormLabel>
        <RadioGroup
          row
          value={deliveryRule}
          onChange={(e) => onChangeDelivery(e.target.value)}
        >
          <FormControlLabel value="antecipar" control={<Radio />} label="Antecipar (dia 02)" />
          <FormControlLabel value="prorrogar" control={<Radio />} label="Prorrogar (dia 04)" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
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
    </>
  );
}
