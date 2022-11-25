import { CardsStateType } from '../features/cards/cards-reduser'
import { PacksStateType } from '../features/packs/packs-reducer'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('app-state')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: { packs: PacksStateType; cards: CardsStateType }) => {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem('app-state', serializedState)
  } catch {
    return undefined
  }
}
