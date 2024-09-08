import React, { useState, useEffect } from 'react';
import { fetchCities } from '../api/api';
import { City } from '../types/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import '../styles/CitiesTable.css';


const CitiesTable = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchMoreCities();
  }, []);

  const fetchMoreCities = async () => {
    const newCities = await fetchCities(page, 50);
    if (newCities.length === 0) setHasMore(false);
    setCities([...cities, ...newCities]);
    setPage(page + 50);
  };

  const filteredCities = cities.filter((city) =>
    city.fields.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InfiniteScroll
        dataLength={filteredCities.length}
        next={fetchMoreCities}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table>
          <thead>
            <tr>
              <th>City Name</th>
              <th>Country</th>
              <th>Timezone</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/weather/${city.fields.name}`}>
                    {city.fields.name}
                  </Link>
                </td>
                <td>{city.fields.country}</td>
                <td>{city.fields.timezone}</td>
                <td>{city.fields.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </>
  );
};

export default CitiesTable;
