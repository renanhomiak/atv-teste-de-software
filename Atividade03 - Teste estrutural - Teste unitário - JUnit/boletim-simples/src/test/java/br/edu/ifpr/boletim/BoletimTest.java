package br.edu.ifpr.boletim;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BoletimTest {

    @Test
    void deveAprovarAlunoComMediaOito() {
        // Preparar: criar o objeto que será testado.
        Boletim boletim = new Boletim();

        // Executar: chamar um único método com uma entrada conhecida.
        String resultado = boletim.verificarSituacao(8);

        // Verificar: comparar o resultado esperado com o resultado obtido.
        assertEquals("APROVADO", resultado);
    }

    @Test
    void deveCalcularMediaCorretamente() {
        Boletim boletim = new Boletim();

        double resultado = boletim.calcularMedia(8, 6);

        assertEquals(7.0, resultado, 0.0001);
    }

    @Test
    void deveCalcularMediaComResultadoDecimal() {
        Boletim boletim = new Boletim();

        double resultado = boletim.calcularMedia(8, 7);

        assertEquals(7.5, resultado, 0.0001);
    }

    @Test
    void deveAprovarAlunoComMediaSete() {
        Boletim boletim = new Boletim();

        String resultado = boletim.verificarSituacao(7);

        assertEquals("APROVADO", resultado);
    }

    @Test
    void deveColocarAlunoEmRecuperacaoComMediaQuatro() {
        Boletim boletim = new Boletim();

        String resultado = boletim.verificarSituacao(4);

        assertEquals("RECUPERACAO", resultado);
    }

    @Test
    void deveColocarAlunoEmRecuperacaoComMediaSeis() {
        Boletim boletim = new Boletim();

        String resultado = boletim.verificarSituacao(6);

        assertEquals("RECUPERACAO", resultado);
    }

    @Test
    void deveReprovarAlunoComMediaAbaixoDeQuatro() {
        Boletim boletim = new Boletim();

        String resultado = boletim.verificarSituacao(3.9);

        assertEquals("REPROVADO", resultado);
    }

    @Test
    void deveRetornarZeroQuandoArrayDeMediasEstiverVazio() {
        Boletim boletim = new Boletim();

        int resultado = boletim.contarAprovados(new double[] {});

        assertEquals(0, resultado);
    }

    @Test
    void deveContarTodosOsAprovados() {
        Boletim boletim = new Boletim();

        int resultado = boletim.contarAprovados(
                new double[] {7, 8, 9}
        );

        assertEquals(3, resultado);
    }

    @Test
    void deveContarApenasAsMediasAprovadas() {
        Boletim boletim = new Boletim();

        int resultado = boletim.contarAprovados(
                new double[] {8, 5, 7, 3, 6}
        );

        assertEquals(2, resultado);
    }

    @Test
    void deveRetornarZeroQuandoNenhumAlunoEstiverAprovado() {
        Boletim boletim = new Boletim();

        int resultado = boletim.contarAprovados(
                new double[] {6.9, 5, 4}
        );

        assertEquals(0, resultado);
    }

}
