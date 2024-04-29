import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['playstation'],
    preco: 150,
    precoAntigo: 199,
    titulo: 'Dark Souls'
  },
  {
    id: 2,
    categoria: 'RPG de turno',
    imagem: '',
    plataformas: ['nintendo switch'],
    preco: 350,
    precoAntigo: 420,
    titulo: 'Pókemon'
  },
  {
    id: 3,
    categoria: 'Acao',
    imagem: '',
    plataformas: ['playstation'],
    preco: 150.9,
    precoAntigo: 199.99,
    titulo: 'Oncharted'
  },
  {
    id: 4,
    categoria: 'MMO',
    imagem: '',
    plataformas: ['windows'],
    preco: 350.99,
    precoAntigo: 420.85,
    titulo: 'WOW'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Teste para o container Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a lsitagem de jogos', async () => {
    renderizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Dark Souls')).toBeInTheDocument()
    })
  })
})
