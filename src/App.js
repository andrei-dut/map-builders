import "./App.css";
import MapLegend from "./views/MapLegend";
import ObjectSelector from "./views/ObjectSelector";
import MapContainer from "./views/Ymaps";
import { locationsArray } from "./locations";

function App() {
  // console.log(locationsArray);

  // const countries = {};

  // locationsArray.forEach((item) => {
  //   const { country, address } = item;
  //   if (!countries[country]) {
  //     countries[country] = [address];
  //   } else {
  //     countries[country].push(address);
  //   }
  // });

  console.log(locationsArray.map(el => ({...el, id: el.status + Math.random() * 0.1})));

  const countries = locationsArray.reduce((prev, current) => {
    const isCountry = prev.find((_) => _.name === current.country);

    if (isCountry) {
      isCountry.elems = [...isCountry.elems, current];
    } else {
      return [...prev, { name: current.country, elems: [current] }];
    }
    return prev;
  }, []);

  // console.log(countries);

  // let c2 = 0

  // Object.keys(countries).forEach((el) => {
  //   const count = countries[el]?.length;
  //   c2 += count
  //   console.log(count, c2);
  // })

  // console.log(c2);
  return (
    <div className="App">
      <ObjectSelector countries={countries} />
      <MapContainer countries={countries} />
      <MapLegend />
    </div>
  );
}

export default App;
