import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RegisterForm from '@/components/RegisterForm';



export default function Regiter() {
    return (
        <div>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Cadastro de Usuário
                </Typography>
                <RegisterForm />
            </Container>

        </div>
    )
}