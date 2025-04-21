import { Checkbox, FormControl, FormControlLabel, FormLabel, Stack } from '@mui/material';

type Props = {
  option: string;
  selected: string[];
  onChange: (option: string, department: string) => void;
};

export default function SelectDepartmentVisibility({ option, selected, onChange }: Props) {
  return (
    <FormControl component="fieldset">
      <FormLabel>Essa tarefa será visível para quais departamentos?</FormLabel>
      <Stack direction="row">
        <FormControlLabel
          control={
            <Checkbox
              checked={selected.includes('Fiscal')}
              onChange={() => onChange(option, 'Fiscal')}
            />
          }
          label="Fiscal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selected.includes('Contábil')}
              onChange={() => onChange(option, 'Contábil')}
            />
          }
          label="Contábil"
        />
      </Stack>
    </FormControl>
  );
}
