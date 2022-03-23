import axios from "axios";
import { useEffect, useReducer } from "react";
import currencies from "./countries";
import Reducer, { State } from "./Reducer";
function App() {
  const keys = Object.keys(currencies);
  const [state, dispatch] = useReducer(Reducer, State);
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;

  useEffect(() => {
    const getRates = async () => {
      const rates = await axios.get(url + `/${state.from}/${state.to}.json`);
      dispatch({ type: "FIRST_LOAD", payload: rates.data[state.to] });
    };
    getRates();
  }, []);

  return (
    <div className="App">
      <h1>Converter</h1>
      <div className="convereter-container">
        <div className="from-container">
          <span>From :</span>
          <input type="number" value={state.numToConvert} />
          <select value={state.from}>
            {keys.map((item) => {
              return <option value={item}>{currencies[item]}</option>;
            })}
          </select>
        </div>
        <div className="to-container">
          <span>To :</span>
          <input value={state.convertedAmount} type="number" />
          <select value={state.to}>
            {keys.map((item) => {
              return <option value={item}>{currencies[item]}</option>;
            })}
          </select>
        </div>
      </div>
      <button>click</button>
    </div>
  );
}

export default App;
