import { Slice as RTKSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

type WrappedSlicedMethods<S extends RTKSlice> = {
  [ActionName in keyof S['actions']]: (
    ...args: Parameters<S['actions'][ActionName]>
  ) => void
}

export const useSliceWrapper = <Slice extends RTKSlice>(slice: Slice) => {
  const dispatch = useDispatch()

  type SliceName = Slice['name']
  type SliceState = ReturnType<Slice['getInitialState']>

  const sliceName = slice.name as SliceName

  // This only works if the slice name matches the store reducer name
  const data = useSelector(
    (s: Record<SliceName, unknown>) => s[sliceName]
  ) as SliceState
  const { actions } = slice

  const dataOutput = { [sliceName]: data } as Record<SliceName, typeof data>

  const methods = Object.keys(actions).reduce((acc, k) => {
    const actionName = k as keyof typeof actions
    type Method = Slice['actions'][typeof actionName]

    if (actions[actionName]) {
      return {
        ...acc,
        [actionName]: (input: Parameters<Method>) => {
          dispatch(actions[actionName](input))
        }
      }
    }
    return acc
  }, {} as WrappedSlicedMethods<Slice>)

  return { ...methods, ...dataOutput }
}

export default useSliceWrapper
