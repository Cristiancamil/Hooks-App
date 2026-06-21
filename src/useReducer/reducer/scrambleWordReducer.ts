
/**
 * Estado global gestionado por el reducer.
 *
 * Este objeto contiene toda la información necesaria
 * para controlar una partida del juego de palabras.
 *
 * Propiedades:
 * - currentWord: palabra correcta que debe adivinar el jugador.
 * - errorCounter: cantidad de respuestas incorrectas.
 * - guess: respuesta ingresada por el jugador.
 * - isGameOver: indica si la partida ha finalizado.
 * - maxAllowErrors: número máximo de errores permitidos.
 * - maxSkips: número máximo de palabras que pueden saltarse.
 * - points: puntuación acumulada.
 * - scrambledWord: palabra mezclada que se muestra al usuario.
 * - skipCounter: cantidad de palabras saltadas.
 * - words: palabras restantes por jugar.
 * - totalWords: cantidad total de palabras de la partida.
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

/**
 * Catálogo de palabras disponibles
 * para una partida.
 *
 * Cada nueva partida utiliza estas palabras
 * como base para generar el juego.
 */
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

/**
 * Mezcla aleatoriamente un arreglo.
 *
 * Nota:
 * Este enfoque es suficiente para juegos simples,
 * aunque no genera una distribución completamente
 * uniforme de los elementos.
 */
const suffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Mezcla aleatoriamente las letras
 * de una palabra.
 *
 * Ejemplo:
 *
 * REACT
 * ↓
 * TACER
 */
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Genera el estado inicial de una nueva partida.
 *
 * Flujo:
 * 1. Mezcla aleatoriamente el catálogo de palabras.
 * 2. Selecciona la primera palabra.
 * 3. Genera su versión desordenada.
 * 4. Inicializa las estadísticas del juego.
 *
 * Esta función se utiliza cuando:
 * - Se carga la aplicación.
 * - Se inicia una nueva partida.
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
 * Acciones soportadas por el reducer.
 *
 * SET_GUESS:
 * - Actualiza la respuesta ingresada por el usuario.
 *
 * CHECK_ANSWER:
 * - Verifica si la respuesta es correcta.
 *
 * SKIP_WORD:
 * - Salta la palabra actual.
 *
 * START_NEW_GAME:
 * - Reinicia completamente la partida.
 */
export type scrambleWordsActions = 
| {type: 'SET_GUESS', payload: string}
| {type: 'CHECK_ANSWER'}
| {type: 'SKIP_WORD'}
| {type: 'START_NEW_GAME', payload: ScrambleWordsStates}


/**
 * Reducer encargado de gestionar
 * toda la lógica del juego.
 *
 * Responsabilidades:
 * - Actualizar respuestas.
 * - Validar palabras.
 * - Asignar puntos.
 * - Controlar errores.
 * - Controlar saltos.
 * - Reiniciar partidas.
 *
 * Regla importante:
 * Nunca modifica el estado original.
 * Siempre retorna un nuevo estado.
 */
export const scrambleWordsReducer = ( 
  state: ScrambleWordsStates,
  action: scrambleWordsActions
): ScrambleWordsStates => {

  switch(action.type) {

    /**
     * Actualiza la respuesta actual.
     *
     * Se normaliza el texto para evitar
     * problemas de comparación.
     */
    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload.trim().toUpperCase()
      }

      /**
       * Valida la respuesta ingresada.
       *
       * Si la respuesta es correcta:
       * - Incrementa la puntuación.
       * - Avanza a la siguiente palabra.
       *
       * Si la respuesta es incorrecta:
       * - Incrementa el contador de errores.
       * - Verifica si el juego terminó.
       */
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

    /**
     * Reinicia completamente la partida.
     *
     * El nuevo estado es generado
     * mediante getInitialState().
     */
    case 'START_NEW_GAME': 
      return action.payload
    
    
    default:
      state
  }

  return state

}