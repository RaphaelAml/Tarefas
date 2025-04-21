'use server';

import { redirect } from 'next/navigation';

function isPasswordStrong(password: string): { valid: boolean; message?: string } {
  const errors = [];
  if (password.length < 8) errors.push('A senha deve ter pelo menos 8 caracteres.');
  if (!/[A-Z]/.test(password)) errors.push('A senha deve conter pelo menos uma letra maiúscula.');
  if (!/[0-9]/.test(password)) errors.push('A senha deve conter pelo menos um número.');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('A senha deve conter pelo menos um caractere especial.');

  return {
    valid: errors.length === 0,
    message: errors.join(' '),
  };
}

export async function handleRegisterUser(formData: FormData) {
  const fullName = formData.get('fullName')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const gender = formData.get('gender')?.toString() || '';
  const phone = formData.get('phone')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const confirmPassword = formData.get('confirmPassword')?.toString() || '';

  const isAdmin = formData.get('isAdmin') === 'on';
  const isCollaborator = formData.get('isCollaborator') === 'on';
  const isClient = formData.get('isClient') === 'on';

  // Validação de senha
  if (password !== confirmPassword) {
    throw new Error('As senhas não coincidem.');
  }

  const strength = isPasswordStrong(password);
  if (!strength.valid) {
    throw new Error(strength.message);
  }

  console.log('Usuário registrado com sucesso:', {
    fullName, email, gender, phone, password,
    isAdmin, isCollaborator, isClient,
  });

  redirect('/sucesso');
}
