import { fireEvent, screen } from '@testing-library/react'

import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 1,
  categoria: 'RPG de turno',
  imagem: '',
  plataformas: ['nintendo'],
  preco: 350.99,
  precoAntigo: 420.85,
  titulo: 'Pókemon'
}

describe('Teste para o componente produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Pókemon')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
