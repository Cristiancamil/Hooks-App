import * as z from "zod";


/**
 * Representa una tarea dentro de la aplicación
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Estado gestionado por el reducer de tareas.
 *
 * Este objeto representa toda la información que el reducer
 * necesita para calcular el siguiente estado de la aplicación.
 *
 * Propiedades:
 * - todos: lista de tareas registradas.
 * - total: número total de tareas.
 * - completed: número de tareas completadas.
 * - pending: número de tareas pendientes.
 */
interface TaskState {
  todos: Todo[]
  total: number
  completed: number
  pending: number
}

/**
 * Acciones que pueden modificar el estado.
 *
 * ADD_TODO:
 * - Agrega una nueva tarea.
 * - payload: texto de la tarea.
 *
 * TOGGLE_TODO:
 * - Cambia el estado completed de una tarea.
 * - payload: id de la tarea.
 *
 * DELETE_TODO:
 * - Elimina una tarea.
 * - payload: id de la tarea.
 */
export type TaskAction = 
| {type: 'ADD_TODO', payload: string}
| {type: 'TOGGLE_TODO', payload: number}
| {type: 'DELETE_TODO', payload: number}

const todoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean()
}) 

const taskStateSchema = z.object({
  todos: z.array(todoSchema),
  total: z.number(),
  completed: z.number(),
  pending: z.number()
})






/**
 * Obtiene el estado inicial de la aplicación.
 *
 * Flujo:
 * 1. Intenta recuperar el estado almacenado en localStorage.
 * 2. Si no existe información, retorna un estado vacío.
 * 3. Si existe información, la valida con Zod.
 * 4. Si la validación falla, retorna un estado vacío.
 * 5. Si la validación es correcta, retorna el estado recuperado.
 *
 * Esto permite:
 * - Persistir tareas entre recargas de página.
 * - Evitar errores causados por datos corruptos.
 */
export const getTaskInitialState = (): TaskState => {

    /**
   * Recupera el estado almacenado previamente
   * en el navegador.
   */
  const localStorageState = localStorage.getItem('tasks-state')

  /**
   * Si no existe información almacenada,
   * inicializamos la aplicación con un estado vacío.
   */
  if(!localStorageState){
    return {
      todos: [],
      total: 0,
      completed: 0,
      pending: 0
    }
  }

  /**
   * Valida la estructura de los datos recuperados.
   *
   * safeParse:
   * - No lanza excepciones.
   * - Retorna un objeto indicando si la validación
   *   fue exitosa o no.
   */
  const result = taskStateSchema.safeParse(JSON.parse(localStorageState))

  /**
   * Si la validación falla, ignoramos los datos
   * almacenados y retornamos un estado limpio.
   *
   * Esto evita errores provocados por:
   * - Datos corruptos.
   * - Modificaciones manuales del localStorage.
   * - Cambios futuros en la estructura del estado.
   */
  if( result.error ) {
    console.log(result.error)
    return {
      todos: [],
      total: 0,
      completed: 0,
      pending: 0
    }
  }

  /**
   * Los datos son válidos.
   *
   * Retornamos el estado recuperado
   * desde localStorage.
   */
  return result.data 
}


/**
 * Reducer encargado de gestionar el estado de las tareas.
 *
 * Flujo:
 * 1. Recibe el estado actual.
 * 2. Recibe una acción.
 * 3. Evalúa el tipo de acción.
 * 4. Calcula un nuevo estado.
 * 5. Retorna el nuevo estado.
 *
 * Importante:
 * - Nunca modifica el estado original.
 * - Siempre retorna un nuevo objeto.
 */
export const taskReducer = (
  state: TaskState, 
  action: TaskAction
):TaskState => {

  switch (action.type) {

    /**
     * ADD_TODO
     *
     * Responsabilidad:
     * - Crear una nueva tarea.
     * - Agregarla al arreglo de tareas.
     * - Actualizar las métricas del estado.
     * - Retornar el nuevo estado.
     *
     * payload:
     * - Texto de la nueva tarea.
     */
    case 'ADD_TODO':{

       // Construye el nuevo objeto Todo.
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false
      }

      /**
       * Importante:
       * Nunca modificamos state.todos directamente.
       *
       * Creamos un nuevo arreglo utilizando
       * el operador spread (...).
       */
      return {
        ...state,

        // Agrega la nueva tarea al final del arreglo.
        todos: [...state.todos, newTodo],

        // Actualiza las estadísticas.
        total: state.todos.length + 1,
        pending: state.pending + 1
      }
    }

    /**
     * DELETE_TODO
     *
     * Responsabilidad:
     * - Eliminar una tarea por id.
     * - Recalcular las métricas del estado.
     * - Retornal el nuevo estado.
     * 
     * payload:
     * - Id de la tarea a eliminar.
     */
    case 'DELETE_TODO': {

      /**
       * filter() crea un nuevo arreglo
       * excluyendo la tarea seleccionada.
       */
      const currentTodos = state.todos.filter(
        todo => todo.id !== action.payload
      )

      /**
     * Recalcular estadísticas.
     *
     * completedTodos:
     * - Cantidad de tareas completadas.
     *
     * pendingTodos:
     * - Cantidad de tareas pendientes.
     */
      const completedTodos = currentTodos.filter(todo => todo.completed).length
      const pendingTodos = currentTodos.length - completedTodos

      return {
        ...state,
        todos: currentTodos,
        total: currentTodos.length,
        completed: completedTodos,
        pending: pendingTodos
      }
    }

    /**
     * TOGGLE_TODO
     * 
     * Responsabilidad:
     * - Cambiar el estado completed de una tarea.
     * 
     * Payload: 
     * - Id de la tarea a actualizar.
     */
    case 'TOGGLE_TODO': {

      /**
       * map() crea un nuevo arreglo.
       * 
       * Si encuentra la tarea indicada,
       * invierte el valor del completed.
       */
      const updatedTodos = state.todos.map(todo => {

        if(todo.id === action.payload) {
          return {
            ...todo, 

            // true -> false
            // false -> true
            completed: !todo.completed}
        }

        return todo
      })

      /**
       * Recalcular estadísticas.
       */
      const completedTodos = updatedTodos.filter(todo => todo.completed).length
      const pendingTodos = updatedTodos.length - completedTodos

      return {
        ...state,
        todos: updatedTodos,
        completed: completedTodos,
        pending: pendingTodos
      }
    }

    default:
      break;
  }

  return state
}