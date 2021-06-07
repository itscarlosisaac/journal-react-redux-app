import { types } from "../types/types"

export const uiSetErrorAction = (error) => ({
  type: types.uiSetError,
  payload: error,
} )

export const uiRemoveErrorAction = () =>({
  type: types.uiRemoveError
})

export const uiStartLoadingAction = () => ({
  type: types.uiStartLoading
})

export const uiFinishLoadingAction = () => ({
  type: types.uiFinishLoading
})