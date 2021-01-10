import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm";
import HeroCard from "../heroes/HeroCard";
import { getHeroesByName } from '../../selectors/getHeroesByName';


const SearchScreen = ({ history }) => {

  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q
  });

  const { searchText } = formValues;
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    //Establecer parámetro en el URL
    history.push(`?q=${ searchText }`);
  }

  return (
    <div>
      <h1>Search a hero</h1>
      <hr/>
      <div className="row">
        <div className="col-5">
          <form onSubmit={ handleSearch }>
            <input
              type="text"
              autoComplete="off"
              placeholder="Find a hero"
              className="form-control"
              name="searchText"
              value={ searchText }
              onChange={ handleInputChange }
            />
            <button
              className="btn btn-outline-success btn-block mt-3 w-100"
              type="submit"
            >Search</button>
          </form>
        </div>
        <div className="col-7 d-flex justify-content-center flex-wrap">
          <h4 className="text-center w-100">Results</h4>
          <hr className="w-100"/>
          { (q === '') &&
            <div className="alert alert-info w-75">
              Search a hero
            </div>
          }
          { (q !== '' && heroesFiltered.length === 0) &&
            <div className="alert alert-warning w-75">
              No results for { q }
            </div>
          }
          {
            heroesFiltered.map((hero) =>
              <HeroCard key={ hero.id } { ...hero } />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchScreen
