import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

type Props = {
  option: string;
  vencimento: string;
  deliveryRule: string;
  anteciparPara: string;
  prorrogarPara: string;
  jurisdiction: string;
  onChangeVencimento: (value: string) => void;
  onChangeDelivery: (value: string) => void;
  onChangeAnteciparPara: (value: string) => void;
  onChangeProrrogarPara: (value: string) => void;
  onChangeJurisdiction: (value: string) => void;
};

export default function RulesFechamentoPrefeitura({
  option,
  vencimento,
  deliveryRule,
  anteciparPara,
  prorrogarPara,
  jurisdiction,
  onChangeVencimento,
  onChangeDelivery,
  onChangeAnteciparPara,
  onChangeProrrogarPara,
  onChangeJurisdiction,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* Data de vencimento */}
      <TextField
        label="Qual a data de vencimento para fechamento dessa declaração?"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={vencimento}
        onChange={(e) => onChangeVencimento(e.target.value)}
      />

      {/* Antecipar ou Prorrogar */}
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Essa declaração antecipa ou prorroga quando o dia cair em feriado/final de semana?
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

      {/* Campo para inserir o novo dia manualmente */}
      {deliveryRule === 'antecipar' && (
        <TextField
          label="Antecipar para qual dia?"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={anteciparPara}
          onChange={(e) => onChangeAnteciparPara(e.target.value)}
        />
      )}

      {deliveryRule === 'prorrogar' && (
        <TextField
          label="Prorrogar para qual dia?"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={prorrogarPara}
          onChange={(e) => onChangeProrrogarPara(e.target.value)}
        />
      )}

      {/* Jurisdição */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Essa declaração é de qual jurisdição?</FormLabel>
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
