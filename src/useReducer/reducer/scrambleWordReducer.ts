
/**
 * Estado gestionado por el reducer de palabrasRevueltas.
 *
 * Este objeto representa toda la información que el reducer
 * necesita para calcular el siguiente estado de la aplicación.
 *
 * Propiedades:
 * - contadordeErrores: Conteo de número de errores.
 * - contadorDeSaltos: Conteo de número de saltos.
 * - erroresPermitidos: número de errores permitidos.
 * - palabras: Arreglo del juego de palbras.
 * - SaltosPermitidos: número de saltos permitidos.
 */
export interface ScrambleWordsStates {
  currentWord: string
  errorCounter: number
  guess: string
  isGameOver: boolean
  maxAllowErrors: number
  maxSkips: number
  points: number
  scrambledWord: string
  skipCounter: number
  words: string[]
  totalWolrds: number
}

// Arreglo de palabras para adivinar
const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
]

// Esta función mezcla el arreglo para que siempre sea aleatorio
const suffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
}

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Obtiene el estado inicial de la aplicación.
 * 
 * Flujo:
 * 1. Genera un nuevo arreglo aleatorio del arreglo de JUEGOS_DE_PALBRAS
 * 2. Retorna el estado.
 */
export const getInitialState = (): ScrambleWordsStates => {
  const suffleWords = suffleArray([...GAME_WORDS])
  return {
    currentWord: suffleWords[0],
    errorCounter: 0,
    guess: '',
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(suffleWords[0]),
    skipCounter: 0,
    words: suffleWords,
    totalWolrds: suffleWords.length
  }
}

/**
 * Acciones que pueden modificar los estados
*/
export type scrambleWordsActions = 
| {type: 'SET_GUESS', payload: string}
| {type: 'CHECK_ANSWER'}
| {type: 'SKIP_WORD'}
| {type: 'START_NEW_GAME', payload: ScrambleWordsStates}

/**
 * Reducer encargado de gestionar
 * 
 */
export const scrambleWordsReducer = ( 
  state: ScrambleWordsStates,
  action: scrambleWordsActions
): ScrambleWordsStates => {

  switch(action.type) {
    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload.trim().toUpperCase()
      }

    case 'CHECK_ANSWER':{
      if(state.currentWord === state.guess) {
        const newWords = state.words.slice(1)

        return{
          ...state,
          points: state.points + 1,
          guess: '',
          words: newWords,
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0])
        }
      }

      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        guess: '',
        isGameOver: (state.errorCounter + 1) >= state.maxAllowErrors,
      }
    }

    case 'SKIP_WORD': {
      if (state.skipCounter >= state.maxSkips) return state

      const updatedWord = state.words.slice(1)

      return{
        ...state,
        skipCounter: state.skipCounter + 1,
        words: updatedWord,
        currentWord: updatedWord[0],
        scrambledWord: scrambleWord(updatedWord[0]),
        guess: ''
      }
    }

    case 'START_NEW_GAME': 
      return action.payload
    
    
    default:
      state
  }

  return state

}