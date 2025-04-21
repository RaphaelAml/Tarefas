
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const fullName = formData.get('fullName');
  const gender = formData.get('gender');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const isAdmin = formData.get('isAdmin') === 'on';
  const isClient = formData.get('isClient') === 'on';
  const isCollaborator = formData.get('isCollaborator') === 'on';

  // Simples validação de senha no backend
  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Senhas não coincidem' }, { status: 400 });
  }

  // Aqui você pode salvar no banco, chamar um serviço, etc.
  console.log('Usuário recebido:', {
    fullName,
    gender,
    email,
    phone,
    password,
    isAdmin,
    isClient,
    isCollaborator,
  });

  return NextResponse.redirect('/success'); // ou alguma página de sucesso
}
