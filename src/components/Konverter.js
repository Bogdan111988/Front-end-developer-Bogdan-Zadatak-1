import { useState, useEffect } from "react";

const Konverter = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyData(data);
      })
      .catch((e) => {
        setCurrencyData(null);
      });
  }, [fromCurrency]);

  const convert = () => {
    if (currencyData && currencyData.rates[toCurrency]) {
      return (amount * currencyData.rates[toCurrency]).toFixed(2);
    }
    return "N/A";
  };

  return (
    <div className="prozor">
      <h2 className="title">Currency Converter</h2>
      <br />
      <form>
        <label htmlFor="amount">Amount</label>
        <br />

        <input
          className="amount"
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </form>
      <br />
      <div className="from_to">
        <div className="from">
          <label htmlFor="from">From:</label>
          <br />
          <select
            id="from"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencyData &&
              Object.keys(currencyData.rates).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
          </select>
        </div>

        <div className="to">
          <label htmlFor="to">To:</label>
          <br />
          <select
            id="to"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencyData &&
              Object.keys(currencyData.rates).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
          </select>
        </div>
      </div>
      <br />
      <div className="converted_amount">
        <h3>Converted Amount:</h3>
        <p>
          {amount} {fromCurrency} = {convert()} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default Konverter;
