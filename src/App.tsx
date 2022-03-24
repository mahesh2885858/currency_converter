import axios from "axios";
import { useEffect, useReducer } from "react";
import currencies from "./countries";
import "./app.scss";
import Reducer, { State } from "./Reducer";
import { v4 as uuid } from "uuid";
import { HiSwitchVertical } from "react-icons/hi";
function App() {
  const keys = Object.keys(currencies);
  const [state, dispatch] = useReducer(Reducer, State);
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;

  const formattedArray = keys.map((item) => {
    return { countryCode: item, countryName: currencies[item], id: uuid() };
  });

  useEffect(() => {
    const getRates = async () => {
      const rates = await axios.get(url + `/${state.from}/${state.to}.json`);
      dispatch({ type: "FIRST_LOAD", payload: rates.data[state.to] });
    };
    getRates();
  }, [state.rate, state.from, state.to]);
  const chnageCountry = (country: string, option: string) => {
    dispatch({ type: "CHANGE_COUNTRY", payload: country, optional: option });
  };
  const evaluate = (input: string) => {
    dispatch({ type: "CHANGE_INPUT", payload: input });
    dispatch({ type: "EVALUATE", payload: input });
  };
  const switchrates = () => {
    dispatch({ type: "SWITCH_RATES", payload: "" });
  };

  return (
    <div className="App">
      <h1>Converter</h1>
      <div className="converter-container">
        <div>
          <div className="from-container">
            <span>From :</span>
            <select
              onChange={(e) => {
                chnageCountry(e.target.value, "from");
              }}
              value={state.from}
            >
              {formattedArray.map((item) => {
                return (
                  <option key={item.id} value={item.countryCode}>
                    {item.countryName}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              pattern="[0-9]"
              onChange={(e) => evaluate(e.target.value)}
              value={state.numToConvert}
            />
          </div>
          <div className="to-container">
            <span>To :</span>
            <select
              onChange={(e) => {
                chnageCountry(e.target.value, "to");
              }}
              value={state.to}
            >
              {formattedArray.map((item) => {
                return (
                  <option key={item.id} value={item.countryCode}>
                    {item.countryName}
                  </option>
                );
              })}
            </select>
            <input value={state.convertedAmount} type="number" />
          </div>
        </div>
        <div className="switch">
          <HiSwitchVertical
            onClick={switchrates}
            style={{ cursor: "pointer", transform: "scale(1.5)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
