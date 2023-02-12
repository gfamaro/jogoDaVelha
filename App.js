import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu')
  const [jogadorAtual, setJogadorAtual] = useState('')
  const [tabuleiro, setTabuleiro] = useState([])
  const [jogadasRestantes, setJogadasRestantes] = useState(0)
  const [ganhador, setGanhador] = useState('')

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador)
    setJogadasRestantes(9)
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setTela('jogo')
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual
    setTabuleiro([...tabuleiro])
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')
    verificarGanhador(tabuleiro, linha, coluna)
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    // LINHAS
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0])
    }

    // COLUNAS
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna])
    }

    // DIAGONAL 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0])
    }

    // DIAGONAL 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2])
    }

    // NENHUM GANHADOR
    if ((jogadasRestantes - 1) === 0) {
      return finalizarJogo('')
    }

    // JOGO NÃO FINALIZADO
    setJogadasRestantes((jogadasRestantes - 1))
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador)
    setTela('ganhador')
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>JOGO DA VELHA</Text>

        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

        <View style={styles.viewInline}>
          <TouchableOpacity
            style={styles.botaoJogador}
            onPress={() => iniciarJogo('X')}>
            <Text style={[styles.jogador, { color: 'blue' }]}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoJogador}
            onPress={() => iniciarJogo('O')}>
            <Text style={[styles.jogador, { color: 'red' }]}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={styles.textoVoltarAoMenu}>‹ Voltar ao menu</Text>
        </TouchableOpacity>

        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.viewInline}>

                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity
                        key={numeroColuna}
                        style={styles.botaoJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)}
                        disabled={coluna !== ''}>
                        <Text style={coluna === 'O' ?
                          [styles.jogador, { color: 'red' }] :
                          [styles.jogador, { color: 'blue' }]}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }

              </View>
            )
          })
        }

      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>JOGO DA VELHA</Text>
        <Text style={styles.subtitulo}>Resultado final: </Text>

        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum ganhador</Text>
        }

        {
          ganhador !== '' &&
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View style={styles.botaoJogador}>
              <Text style={ganhador === 'O' ?
                [styles.jogador, { color: 'red' }] :
                [styles.jogador, { color: 'blue' }]}>{ganhador}</Text>
            </View>
          </>
        }

        <TouchableOpacity
          onPress={() => setTela('menu')}
          style={styles.botaoJogarNovamente}
        >
          <Text style={styles.textoBotaoJogarNovamente}>Jogar novamente</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    margin: 30
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    margin: 30
  },
  viewInline: {
    flexDirection: 'row',
  },
  botaoJogador: {
    width: 90,
    height: 90,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECE9E8'
  },
  jogador: {
    fontSize: 80
  },
  botaoMenu: {
    width: '100%',
    paddingHorizontal: 40,
    top: -120
  },
  textoVoltarAoMenu: {
    fontSize: 16,
    fontWeight: '600',
  },
  botaoJogarNovamente: {
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCFF',
    bottom: '-15%',
    borderWidth: 1,
    borderRadius: 10
  },
  textoBotaoJogarNovamente: {
    fontSize: 18,
    fontWeight: '600'
  },
  ganhador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  }
});
