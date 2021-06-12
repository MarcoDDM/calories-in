import { createContext, useContext } from 'react'
import { FoodsByIdMap, Food } from 'core/types'

type State = FoodsByIdMap

type Action =
  | { type: 'addFood'; food: Food }
  | { type: 'removeFood'; foodId: number }
  | { type: 'replaceFood'; foodId: number; food: Food }

type Dispatch = (action: Action) => void

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

function useFoodsByIdDispatch() {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing dispatch context provider')
  }

  return dispatch
}

function useFoodsByIdState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing state context provider')
  }

  return state
}

export type { State, Action }

export {
  StateContext,
  DispatchContext,
  useFoodsByIdDispatch,
  useFoodsByIdState,
}