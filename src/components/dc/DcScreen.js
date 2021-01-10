import HeroesList from "../heroes/HeroesList";


const DcScreen = () => {
  return (
    <div>
      <h1>DC Heroes</h1>
      <hr/>
      <HeroesList publisher={ "DC Comics" } />
    </div>
  )
}

export default DcScreen;
