# rtk-slice-helper
Cut your RTK slice code in half

### How to install
```
npm i @lciii/rtk-slice-helper
```

Normally with RTK whenever you want to use your slice in a component, you have to import and use a lot of boilerplate code
- import useDispatch to dispatch reducer actions
- import useSelector to select from the store
- import RootState to safely type the state when selecting
- instantiate useDispatch and useSelector
- wrap every reducer action with dispatch
```
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "counterSlice";

export const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <>
      <div>{counter}</div>
      <button onClick={() => dispatch(increment())}>
        Increment the counter!
      </button>
      <button onClick={() => dispatch(decrement())}>
        Decrement the counter!
      </button>
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10!
      </button>
    </>
  );
};
```

### The Solution
Simply pass your slice to useSliceHelper and it returns all the needed data and properties for you!

The properties also all have dispatch() built into them:

```
import { counterSlice } from './counterSlice'
import { useSliceHelper } from '../useSliceHelper'

export const Counter = () => {
  const {
    counter: { value },
    increment, decrement, incrementByAmount
  } = useSliceHelper(counterSlice)

  return (
    <>
      <div>{counter}</div>
      <button onClick={increment)}>
        Increment the counter!
      </button>
      <button onClick={decrement)}>
        Decrement the counter!
      </button>
      <button onClick={() => incrementByAmount(10)}>
        Increment by 10!
      </button>
    </>
  );
};
```

### What gets returned?
An object with the following keys and values:
- [The name of the slice]: [the current state of that slice]
- ...[every reducer method of that slice with dispatch built in]:
```
  const {
    counter: { value }, // the name of the slice along with each state property for that slice
    increment, decrement, incrementByAmount // every reducer method for that slice. No need to dispatch!
  } = useSliceHelper(counterSlice)
```

