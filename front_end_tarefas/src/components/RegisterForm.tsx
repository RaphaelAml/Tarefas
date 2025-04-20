'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    LinearProgress,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

function calculatePasswordStrength(password: string): { score: number; label: string; color: string } {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const strengthLabels = ['Fraca', 'Média', 'Boa', 'Forte'];
    const strengthColors = ['error', 'warning', 'info', 'success'];

    return {
        score,
        label: strengthLabels[score - 1] || 'Muito Fraca',
        color: strengthColors[score - 1] || 'error',
    };
}

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
        isClient: false,
        isCollaborator: false
    });

    const { score, label, color } = calculatePasswordStrength(formData.password);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        console.log('Formulário enviado:', formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                label="Nome Completo"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
            />

            <FormControl fullWidth required>
                <InputLabel id="gender-label">Gênero</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    label="Gênero"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                label="Número de Celular"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
            />
            <TextField
                label="Senha"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
            />


            {/* Barra de força da senha */}
            {formData.password && (
                <Box>
                    <Typography variant="body2" color={color} gutterBottom>
                        Força da senha: {label}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={(score / 4) * 100}
                        color={color as any}
                        sx={{ height: 10, borderRadius: 5 }}
                    />
                </Box>
            )}

            <TextField
                label="Confirmar Senha"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword}
                helperText={
                    formData.confirmPassword !== '' && formData.password !== formData.confirmPassword
                        ? 'As senhas não coincidem'
                        : ''
                }
            />

            <FormControlLabel
                control={<Checkbox checked={formData.isAdmin} onChange={handleChange} name="isAdmin" />}
                label="Usuário Administrador"
            />
            <FormControlLabel
                control={<Checkbox checked={formData.isCollaborator} onChange={handleChange} name="isCollaborator" />}
                label="Usuário Colaborador"
            />
             <FormControlLabel
                control={<Checkbox checked={formData.isClient} onChange={handleChange} name="isClient" />}
                label="Usuário Cliente"
            />

            <Button type="submit" variant="contained" color="primary">
                Cadastrar
            </Button>
        </Box>
    );
}
