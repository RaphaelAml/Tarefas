'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";

const JURISDICOES = ["Federal", "Estadual", "Municipal"];

type Task = {
  nome: string;
  tipo: string;
  descricao: string;
  departamento: string;
  jurisdicao: string;
  vencimento: string;
  prorrogada: boolean;
  antecipada: boolean;
  recorrente: boolean;
  regimeTributario: string;
};

const initialTask: Task = {
  nome: "",
  tipo: "",
  descricao: "",
  departamento: "",
  jurisdicao: "",
  vencimento: "",
  prorrogada: false,
  antecipada: false,
  recorrente: false,
  regimeTributario: ""
};

const REGIMES = [
  "Lucro Real",
  "Lucro Presumido",
  "Simples Nacional",
];

const ESTADOS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function TaskRegistration() {
  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState(true);
  const [search, setSearch] = useState("");
  // Novos estados para tipos de tarefa
  const [taskTypes, setTaskTypes] = useState(["Imposto", "Declaração", "Outro"]);
  const [selectedTaskType, setSelectedTaskType] = useState(task.tipo || "");
  const [newTaskType, setNewTaskType] = useState("");

  // Estados para departamentos dinâmicos
  const [departamentos, setDepartamentos] = useState([
    "Fiscal",
    "Contábil",
    "RH",
    "Outro"
  ]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(task.departamento || "");
  const [newDepartamento, setNewDepartamento] = useState("");

  // MUNICIPAL HOLIDAYS AGORA COM UF E MUNICÍPIO
  const [municipalHolidays, setMunicipalHolidays] = useState<
    { nome: string; data: string; estado: string; municipio: string }[]
  >([]);
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [municipio, setMunicipio] = useState("");

  function handleChange(field: keyof Task, value: any) {
    setTask((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    alert("Tarefa salva!\n\n" + JSON.stringify(task, null, 2));
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleDelete() {
    alert("Tarefa excluída!");
    setTask(initialTask);
    setSelectedTaskType("");
    setSelectedDepartamento("");
    setIsEditing(true);
  }

  function handleCancel() {
    setTask(initialTask);
    setSelectedTaskType("");
    setSelectedDepartamento("");
    setIsEditing(true);
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 900,
        m: "auto",
        borderRadius: 2,
        boxShadow: 3,
        background: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cadastro de Tarefa
      </Typography>

      {/* Campo de busca */}
      <TextField
        label="Pesquisar tarefas"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Nome da tarefa + Tipo da tarefa */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
        <TextField
          label="Nome da tarefa"
          value={task.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          required
          fullWidth
          disabled={!isEditing}
        />
        <FormControl fullWidth required disabled={!isEditing}>
          <InputLabel>Tipo da tarefa</InputLabel>
          <Select
            value={selectedTaskType}
            label="Tipo da tarefa"
            onChange={(e) => {
              const value = e.target.value as string;
              setSelectedTaskType(value);
              handleChange("tipo", value === "Outro" ? "" : value);
            }}
          >
            {taskTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {/* Novo tipo da tarefa, se "Outro" */}
      {selectedTaskType === "Outro" && (
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Novo tipo de tarefa"
            value={newTaskType}
            onChange={(e) => setNewTaskType(e.target.value)}
            fullWidth
            disabled={!isEditing}
          />
          <Button
            variant="outlined"
            disabled={!newTaskType}
            onClick={() => {
              if (newTaskType && !taskTypes.includes(newTaskType)) {
                setTaskTypes((prev) => [
                  ...prev.filter((t) => t !== "Outro"),
                  newTaskType,
                  "Outro"
                ]);
                setSelectedTaskType(newTaskType);
                handleChange("tipo", newTaskType);
                setNewTaskType("");
              }
            }}
          >
            Cadastrar novo tipo
          </Button>
        </Stack>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
        <FormControl fullWidth required disabled={!isEditing}>
          <InputLabel>Regime Tributário</InputLabel>
          <Select
            value={task.regimeTributario}
            label="Regime Tributário"
            onChange={(e) => handleChange("regimeTributario", e.target.value as string)}
          >
            {REGIMES.map((regime) => (
              <MenuItem key={regime} value={regime}>
                {regime}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Departamento e Jurisdição */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
        <FormControl fullWidth required disabled={!isEditing}>
          <InputLabel>Departamento</InputLabel>
          <Select
            value={selectedDepartamento}
            label="Departamento"
            onChange={(e) => {
              const value = e.target.value as string;
              setSelectedDepartamento(value);
              handleChange("departamento", value === "Outro" ? "" : value);
            }}
          >
            {departamentos.map((dep) => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required disabled={!isEditing}>
          <InputLabel>Jurisdição</InputLabel>
          <Select
            value={task.jurisdicao}
            label="Jurisdição"
            onChange={(e) =>
              handleChange("jurisdicao", e.target.value as string)
            }
          >
            {JURISDICOES.map((j) => (
              <MenuItem key={j} value={j}>
                {j}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {/* Campo para cadastrar novo departamento */}
      {selectedDepartamento === "Outro" && (
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Novo departamento"
            value={newDepartamento}
            onChange={(e) => setNewDepartamento(e.target.value)}
            fullWidth
            disabled={!isEditing}
          />
          <Button
            variant="outlined"
            disabled={!newDepartamento.trim()}
            onClick={() => {
              if (newDepartamento && !departamentos.includes(newDepartamento)) {
                setDepartamentos((prev) => [
                  ...prev.filter((d) => d !== "Outro"),
                  newDepartamento,
                  "Outro"
                ]);
                setSelectedDepartamento(newDepartamento);
                handleChange("departamento", newDepartamento);
                setNewDepartamento("");
              }
            }}
          >
            Cadastrar departamento
          </Button>
        </Stack>
      )}

      {/* Agrupamento visual do cadastro de feriado municipal SÓ quando jurisdição == "Municipal" */}
      {task.jurisdicao === "Municipal" && (
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 2,
            mb: 2,
            background: "#f8fafd",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
            Cadastro de Feriado Municipal
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
            <FormControl fullWidth required>
              <InputLabel>Estado (UF)</InputLabel>
              <Select
                value={selectedEstado}
                label="Estado (UF)"
                onChange={e => setSelectedEstado(e.target.value as string)}
              >
                {ESTADOS.map(uf => (
                  <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Município"
              value={municipio}
              onChange={e => setMunicipio(e.target.value)}
              fullWidth
              required
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
            <TextField
              label="Nome do feriado municipal"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Data do feriado"
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Button
              variant="outlined"
              disabled={
                !holidayName.trim() ||
                !holidayDate ||
                !selectedEstado ||
                !municipio.trim()
              }
              onClick={() => {
                if (
                  holidayName.trim() &&
                  holidayDate &&
                  selectedEstado &&
                  municipio.trim() &&
                  !municipalHolidays.some(
                    (h) =>
                      h.data === holidayDate &&
                      h.estado === selectedEstado &&
                      h.municipio.toLowerCase() === municipio.trim().toLowerCase()
                  )
                ) {
                  setMunicipalHolidays((prev) => [
                    ...prev,
                    {
                      nome: holidayName,
                      data: holidayDate,
                      estado: selectedEstado,
                      municipio: municipio.trim()
                    }
                  ]);
                  setHolidayName("");
                  setHolidayDate("");
                }
              }}
              sx={{ minWidth: 160 }}
            >
              Adicionar feriado
            </Button>
          </Stack>

          {municipalHolidays.length > 0 && (
            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Feriados municipais cadastrados:
              </Typography>
              <Stack spacing={1}>
                {municipalHolidays.map((holiday, idx) => (
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    key={holiday.data + holiday.estado + holiday.municipio}
                  >
                    <Typography>
                      <b>{holiday.nome}</b> –{" "}
                      {new Date(holiday.data).toLocaleDateString("pt-BR")}
                      {" | "}
                      <b>{holiday.estado}</b> – {holiday.municipio}
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() =>
                        setMunicipalHolidays((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                    >
                      Remover
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}

      <Stack direction="row" spacing={2} mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={task.recorrente}
              onChange={(e) => handleChange("recorrente", e.target.checked)}
              disabled={!isEditing}
            />
          }
          label="Tarefa Recorrente"
        />
      </Stack>

      {/* Botões modernos */}
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          color="primary"
        >
          Salvar
        </Button>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          color="secondary"
        >
          Cancelar
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          color="info"
          onClick={handleEdit}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          color="error"
        >
          Excluir
        </Button>
      </Stack>

    </Box>
  );
}
