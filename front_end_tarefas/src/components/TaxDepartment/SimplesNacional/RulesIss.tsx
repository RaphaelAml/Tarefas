import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

type Props = {
  option: string;
  deliveryRule: string;
  jurisdiction: string;
  issDueDate: string;
  issCity: string;
  onChangeDelivery: (value: string) => void;
  onChangeJurisdiction: (value: string) => void;
  onChangeIssDueDate: (value: string) => void;
  onChangeIssCity: (value: string) => void;
};

export default function RulesIss({
  deliveryRule,
  jurisdiction,
  issDueDate,
  issCity,
  onChangeDelivery,
  onChangeJurisdiction,
  onChangeIssDueDate,
  onChangeIssCity,
}: Props) {
  return (
    <>
      <TextField
        label="Qual a data de vencimento do ISS?"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={issDueDate}
        onChange={(e) => onChangeIssDueDate(e.target.value)}
      />

      <FormControl>
        <FormLabel>
          O ISS deve ser antecipado ou prorrogado quando cair em feriado/final de semana?
        </FormLabel>
        <RadioGroup row value={deliveryRule} onChange={(e) => onChangeDelivery(e.target.value)}>
          <FormControlLabel value="antecipar" control={<Radio />} label="Antecipar" />
          <FormControlLabel value="prorrogar" control={<Radio />} label="Prorrogar" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="De qual cidade é esse ISS?"
        fullWidth
        value={issCity}
        onChange={(e) => onChangeIssCity(e.target.value)}
      />

      <FormControl>
        <FormLabel>Esse imposto é de qual jurisdição?</FormLabel>
        <RadioGroup row value={jurisdiction} onChange={(e) => onChangeJurisdiction(e.target.value)}>
          <FormControlLabel value="Federal" control={<Radio />} label="Federal" />
          <FormControlLabel value="Estadual" control={<Radio />} label="Estadual" />
          <FormControlLabel value="Municipal" control={<Radio />} label="Municipal" />
        </RadioGroup>
      </FormControl>
    </>
  );
}
