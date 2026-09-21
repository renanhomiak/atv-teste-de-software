import { test, expect } from '@playwright/test';

test.describe('frete funcional', () => {
  const casos = [
    { nome: 'CEP iniciado por 8 e pedido abaixo de R$ 200', cep: '80000000', valor: '199,99', esperado: 'Frete: R$ 15,00', classe: 'CEP com frete de R$ 15 e valor abaixo do frete grátis' },
    { nome: 'CEP iniciado por outro dígito e pedido abaixo de R$ 200', cep: '70000000', valor: '199,99', esperado: 'Frete: R$ 25,00', classe: 'CEP com frete de R$ 25 e valor abaixo do frete grátis' },
    { nome: 'pedido no limite do frete grátis', cep: '80000000', valor: '200,00', esperado: 'Frete grátis', classe: 'limite de R$ 200,00' },
    { nome: 'pedido acima do limite do frete grátis', cep: '70000000', valor: '200,01', esperado: 'Frete grátis', classe: 'acima de R$ 200,00' },

    { nome: 'CEP com 7 dígitos', cep: '8000000', valor: '100,00', esperado: 'Dados inválidos', classe: 'CEP abaixo de 8 dígitos' },
    { nome: 'CEP com 9 dígitos', cep: '800000000', valor: '100,00', esperado: 'Dados inválidos', classe: 'CEP acima de 8 dígitos' },
    { nome: 'CEP com letras', cep: '8000000A', valor: '100,00', esperado: 'Dados inválidos', classe: 'CEP com tipo inválido' },
    { nome: 'CEP vazio', cep: '', valor: '100,00', esperado: 'Dados inválidos', classe: 'CEP vazio' },

    { nome: 'valor zero', cep: '80000000', valor: '0', esperado: 'Dados inválidos', classe: 'valor igual a zero' },
    { nome: 'valor negativo', cep: '80000000', valor: '-1', esperado: 'Dados inválidos', classe: 'valor negativo' },
    { nome: 'valor com letras', cep: '80000000', valor: 'abc', esperado: 'Dados inválidos', classe: 'valor com tipo inválido' },
    { nome: 'valor com mais de duas casas decimais', cep: '80000000', valor: '10,123', esperado: 'Dados inválidos', classe: 'mais de duas casas decimais' },
    { nome: 'valor vazio', cep: '80000000', valor: '', esperado: 'Dados inválidos', classe: 'valor vazio' },
  ];

  for (const caso of casos) {
    test(`${caso.nome} — ${caso.classe}`, async ({ page }) => {
      await page.goto('/frete');

      await page.getByLabel('CEP').fill(caso.cep);
      await page.getByLabel('Valor do pedido').fill(caso.valor);
      await page.getByRole('button', { name: 'Calcular frete' }).click();

      const resultado = page.locator('#resultado');
      await expect(resultado).toBeVisible();
      await expect(resultado).toHaveText(caso.esperado);
      await expect(resultado).toHaveAttribute(
        'role',
        caso.esperado === 'Dados inválidos' ? 'alert' : 'status',
      );
    });
  }
});
