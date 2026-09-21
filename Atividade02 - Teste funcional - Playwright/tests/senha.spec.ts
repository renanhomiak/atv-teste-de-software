import { test, expect } from '@playwright/test';

test.describe('senha funcional', () => {
  const casos = [
    { nome: 'senha no limite mínimo', senha: 'Abcdef1!', confirmacao: 'Abcdef1!', esperado: 'Senha cadastrada', classe: '8 caracteres' },
    { nome: 'senha acima do mínimo', senha: 'Abcdefg1!', confirmacao: 'Abcdefg1!', esperado: 'Senha cadastrada', classe: '9 caracteres' },
    { nome: 'senha no limite máximo', senha: 'Abcdefghijklmnopqr1!', confirmacao: 'Abcdefghijklmnopqr1!', esperado: 'Senha cadastrada', classe: '20 caracteres' },
    { nome: 'senha abaixo do mínimo', senha: 'Abcde1!', confirmacao: 'Abcde1!', esperado: 'Senha fora do padrão', classe: '7 caracteres' },
    { nome: 'senha acima do máximo', senha: 'Abcdefghijklmnopqr1!X', confirmacao: 'Abcdefghijklmnopqr1!X', esperado: 'Senha fora do padrão', classe: '21 caracteres' },

    { nome: 'sem letra maiúscula', senha: 'abcdefg1!', confirmacao: 'abcdefg1!', esperado: 'Senha fora do padrão', classe: 'ausência de maiúscula' },
    { nome: 'sem letra minúscula', senha: 'ABCDEFG1!', confirmacao: 'ABCDEFG1!', esperado: 'Senha fora do padrão', classe: 'ausência de minúscula' },
    { nome: 'sem número', senha: 'Abcdefgh!', confirmacao: 'Abcdefgh!', esperado: 'Senha fora do padrão', classe: 'ausência de número' },
    { nome: 'com espaço', senha: 'Abc def1!', confirmacao: 'Abc def1!', esperado: 'Senha fora do padrão', classe: 'presença de espaço' },
    { nome: 'senha vazia', senha: '', confirmacao: '', esperado: 'Senha fora do padrão', classe: 'vazia' },

    { nome: 'confirmação diferente', senha: 'Abcdef1!', confirmacao: 'Abcdef2!', esperado: 'As senhas não coincidem', classe: 'senhas diferentes' },
  ];

  for (const caso of casos) {
    test(`${caso.nome} — ${caso.classe}`, async ({ page }) => {
      await page.goto('/senha');

      await page.getByLabel('Nova senha').fill(caso.senha);
      await page.getByLabel('Confirmar senha').fill(caso.confirmacao);
      await page.getByRole('button', { name: 'Cadastrar senha' }).click();

      const resultado = page.locator('#resultado');
      await expect(resultado).toBeVisible();
      await expect(resultado).toHaveText(caso.esperado);
      await expect(resultado).toHaveAttribute(
        'role',
        caso.esperado === 'Senha cadastrada' ? 'status' : 'alert',
      );
    });
  }
});
