import { screen } from '@testing-library/react'
import Header from '..'

import { renderizaComProvider } from '../../../utils/tests'

describe('Teste para o componente header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carrinho', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['playstation'],
              preco: 150.9,
              precoAntigo: 199.99,
              titulo: 'Dark Souls III'
            },
            {
              id: 1,
              categoria: 'RPG de turno',
              imagem: '',
              plataformas: ['nintendo'],
              preco: 350.99,
              precoAntigo: 420.85,
              titulo: 'Pókemon'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
