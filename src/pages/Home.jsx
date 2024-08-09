import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState(() => {
    const saved = localStorage.getItem("selectedCountries");
    return saved ? JSON.parse(saved) : [];
  });

  const countriesPerPage = 10;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleSelectCountry = (country) => {
    const isSelected = selectedCountries.some((c) => c.cca3 === country.cca3);
    const updatedSelected = isSelected
      ? selectedCountries.filter((c) => c.cca3 !== country.cca3)
      : [...selectedCountries, country];

    setSelectedCountries(updatedSelected);
    localStorage.setItem("selectedCountries", JSON.stringify(updatedSelected));
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  return (
    <div>
      <div className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl mb-4">Davlatlar Royxati</h2>
        <Carousel className="mb-8">
          {selectedCountries.map((country) => (
            <div key={country.cca3} className="flex flex-col items-center">
              <Link to={`/country/${country.name.common}`}>
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="w-24 h-16 object-cover mb-2"
                />
                <p className="text-lg">{country.name.common}</p>
                <p>Population: {country.population.toLocaleString()}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>

      <table className="w-full max-w-6xl mx-auto text-center border-collapse">
        <thead className="bg-[#0891b2] text-white">
          <tr>
            <th className="py-2">Nomi</th>
            <th className="py-2">Axolisi</th>
            <th className="py-2">Poytaxti</th>
            <th className="py-2">Bayrogi</th>
            <th className="py-2">Tanlash</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map((country) => (
            <tr key={country.cca3} className="border-t">
              <td>
                <Link
                  to={`/country/${country.name.common}`}
                  className="text-blue-500 hover:underline"
                >
                  {country.name.common}
                </Link>
              </td>
              <td>{country.region}</td>
              <td>{country.capital ? country.capital[0] : "N/A"}</td>
              <td>
                <button
                  className={`py-1 px-4 rounded ${
                    selectedCountries.some((c) => c.cca3 === country.cca3)
                      ? "bg-[#6ee7b7]"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handleSelectCountry(country)}
                >
                  Tanlash
                </button>
              </td>
              <td>
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  className="w-16 h-10 object-cover mx-auto"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            console.log(`Current page: ${page}`);
          }}
        />
      </div>

      <div className="w-full h-[70px] bg-gray-300 flex items-center justify-center relative mt-6">
        <img
          src="your-image-url" 
          alt="Decorative Image"
          className="w-[70px] h-[70px] object-cover"
        />
      </div>
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex space-x-2">
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number}
          className={`py-1 px-3 ${
            currentPage === number + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded`}
          onClick={() => onPageChange(number + 1)}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
};

export default Home;
