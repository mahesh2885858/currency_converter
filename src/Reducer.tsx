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
  optional?: string;
};
const Reducer = (state: typeof State, action: actionType): typeof State => {
  switch (action.type) {
    case "FIRST_LOAD":
      const compute = state.numToConvert * state.rate;
      console.log(compute);
      return {
        ...state,
        numToConvert: 1,
        rate: action.payload,
        convertedAmount: compute,
      };
    case "CHANGE_COUNTRY":
      if (action.optional === "from") {
        return {
          ...state,
          from: action.payload,
        };
      } else {
        return {
          ...state,
          to: action.payload,
        };
      }
    case "CHANGE_INPUT":
      return {
        ...state,
        numToConvert: action.payload,
      };
    case "EVALUATE":
      return {
        ...state,
        convertedAmount: state.numToConvert * state.rate,
      };
    case "SWITCH_RATES":
      return {
        ...state,
        from: state.to,
        to: state.from,
      };
    default:
      return state;
  }
};
export default Reducer;
