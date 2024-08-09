import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Country = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data[0]);
        generateChartData();
      });
  }, [name]);

  const generateChartData = () => {
    const data = Array.from({ length: 12 }, (_, index) => ({
      month: `Month ${index + 1}`,
      expenses: Math.floor(Math.random() * 1000) + 500, 
    }));
    setChartData(data);
  };

  if (!country) {
    return <div>Loading...</div>;
  }

  const { flags, name: countryName, population, currencies } = country;
  const currencyNames = currencies
    ? Object.values(currencies)
        .map((cur) => cur.name)
        .join(", ")
    : "N/A";

  return (
    <div className="flex flex-wrap lg:flex-nowrap p-6">
      <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-lg">
        <img
          src={flags.svg}
          alt={countryName.common}
          className="w-full h-40 object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{countryName.common}</h2>
        <p>
          <strong>Currency:</strong> {currencyNames}
        </p>
        <p>
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
      </div>
      <div className="w-full lg:w-2/3 bg-white shadow-md p-6 rounded-lg mt-6 lg:mt-0 lg:ml-6">
        <h3 className="text-xl font-semibold mb-4">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#0ea5e9"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Country;
