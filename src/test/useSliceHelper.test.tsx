import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import useSliceHelper from "../useSliceHelper";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";

const initialState = {
    val1: "",
}
const testSlice = createSlice({
    name: 'testSlice', initialState, reducers: {
        changeVal1: (state) => {
            state.val1 = "newVal1";
        },
        changeVal1ByAmount: (state, action: PayloadAction<string>) => {
            state.val1 = action.payload;
        }
    }
})

const testStore = configureStore({
    reducer: { [testSlice.name]: testSlice.reducer }
});

const wrapper = ({ children }: { children: JSX.Element }) => (
    <Provider store={testStore}>{children}</Provider>
);

describe('useSliceHelper', () => {


    it('should return', () => {

        const { result } = renderHook(() => useSliceHelper(testSlice), { wrapper })

        act(() => {
            result.current.changeVal1()
        })
        
        expect(result.current.testSlice.val1).toBe('newVal1')

        act(() => {
            result.current.changeVal1ByAmount('world')
        })

        expect(result.current.testSlice.val1).toBe('world')
    })
})