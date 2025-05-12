import { useState } from "react";
import "./App.css";
import countryList from "./Code";
import { useEffect } from "react";
function App() {
  const [amount, Setamount] = useState(1);
  const [fromCurr, SetFromCurr] = useState("USD");
  const [ToCurr, SetToCurr] = useState("INR");
  const [ExchangeRate, SetexchangeRate] = useState(null);
  const [Countries, SetCountries] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const Base_Url =
    "https://v6.exchangerate-api.com/v6/3eef39da71cad55df45c0734/latest/";
  useEffect(() => {
    if (Array.isArray(countryList)) {
      SetCountries(countryList);
    } else {
      console.error("Countries not found in Array");
    }
  }, []);
  const fetchExchangeRate = async () => {
    //  setIsLoading(true); // Set loading state to true before fetching data
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/3eef39da71cad55df45c0734/latest/${fromCurr}`
      );

      const data = await response.json();

      if (data.result === "success") {
        const rate = data.conversion_rates[ToCurr];
        SetexchangeRate(rate);
      } else {
        console.error("Error fetching exchange rate:", data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Reset loading state after fetching
    }
  };
  const handleconversion = (e) => {
    e.preventDefault();
    fetchExchangeRate();
  };
  return (
    <>
      <div className="container">
        <h2>Currency Counter</h2>
        <form onSubmit={handleconversion}>
          <div className="amount">
            <label htmlFor="">Amount : </label>
            <input
              type="text"
              id="Amount"
              value={amount}
              onChange={(e) => Setamount(e.target.value)}
            />
          </div>
          <div className="dropdown">
            <div className="from">
              <label htmlFor="from">From</label>
              <div className="select-container">
                <img
                  src={`https://flagsapi.com/${fromCurr.slice(
                    0,
                    2
                  )}/flat/64.png`}
                  alt=""
                />
                <select
                  name="from"
                  value={fromCurr}
                  onChange={(e) => SetFromCurr(e.target.value)}
                >
                  {Countries.map((country) => (
                    <option
                      key={country.currencyCode}
                      value={country.currencyCode}
                    >
                      {country.currencyCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form">
              <label htmlFor="">To</label>
              <div className="select-container">
                <img
                  src={`https://flagsapi.com/${ToCurr.slice(0, 2)}/flat/64.png`}
                  alt=""
                />
                <select
                  name="To"
                  value={ToCurr}
                  onChange={(e) => SetToCurr(e.target.value)}
                >
                  {Countries.map((country) => (
                    <option
                      key={country.currencyCode}
                      value={country.currencyCode}
                    >
                      {country.currencyCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="msg">
            <p>
              {amount} {fromCurr} = {(amount * ExchangeRate).toFixed(2)}{" "}
              {ToCurr}
            </p>
          </div>
          <button type="submit">Get Exchange Rate</button>
        </form>
      </div>
    </>
  );
}

export default App;
