import { useMemo } from 'react';
import { getHeroesByPublisher } from "../../selectors/getHeroeByPublisher"
import HeroCard from "./HeroCard";


const HeroesList = ({ publisher }) => {

  // Para cuando ocurra un cambio, no se tenga que obtener de nuevo la lista de súper héroes de nuevo
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="d-flex justify-content-center flex-wrap animate__animated animate__fadeIn">
      {
        heroes.map((hero) =>
          <HeroCard key={ hero.id }  { ...hero } />
        )
      }
    </div>
  )
}

export default HeroesList
