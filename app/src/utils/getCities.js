
import citiesData from './cities.json';

cities = null

export default function getCities() {
    if(cities) {
        return cities;
    } else {
        let cityData = Object.values(citiesData);
        cities = cityData.map( (city) => {
            return {
                label: city,
                value: city,
            }
        } );
        return cities;
    }
}