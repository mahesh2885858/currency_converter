export const State = {
  from: "usd",
  to: "inr",
  numToConvert: 1,
  convertedAmount: 0,
  rate: 0,
};

export type actionType = {
  type: string;
  payload: any;
};
const Reducer = (state: typeof State, action: actionType): typeof State => {
  switch (action.type) {
    case "FIRST_LOAD":
      const compute = state.numToConvert * state.rate;
      return {
        ...state,
        numToConvert: 1,
        rate: action.payload,
        convertedAmount: compute,
      };

    default:
      return state;
  }
};
export default Reducer;
