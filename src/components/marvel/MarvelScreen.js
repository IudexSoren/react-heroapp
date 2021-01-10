import HeroesList from "../heroes/HeroesList"


const MarvelScreen = () => {
  return (
    <div>
      <h1>Marvel Heroes</h1>
      <hr/>
      <HeroesList publisher={ "Marvel Comics" } />
    </div>
  )
}

export default MarvelScreen
