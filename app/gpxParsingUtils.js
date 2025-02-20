const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export function getStartCoordinates(xml) {
  return { lat: xml.getElementsByTagName('trkpt')[0].attributes.lat, lon: xml.getElementsByTagName('trkpt')[0].attributes.lon }
}

export function calculateDistances(xml) {
  const R = 6371; // Earth's radius in km
  const calculatedDistances = [];
  let total = 0;

  for (let index = 0; index < xml.getElementsByTagName('trkpt').length - 1; index++) {
    const lat1 = xml.getElementsByTagName('trkpt')[index].attributes.lat;
    const lon1 = xml.getElementsByTagName('trkpt')[index].attributes.lon;

    const lat2 = xml.getElementsByTagName('trkpt')[index + 1].attributes.lat;
    const lon2 = xml.getElementsByTagName('trkpt')[index + 1].attributes.lon;

    if (lat1 === '' || lon1 === '' || lat2 === '' || lon2 === '') {
      calculatedDistances.push(NaN);
      continue; // Skip calculation if any input is missing
    }

    const lat1Rad = toRadians(parseFloat(lat1));
    const lon1Rad = toRadians(parseFloat(lon1));
    const lat2Rad = toRadians(parseFloat(lat2));
    const lon2Rad = toRadians(parseFloat(lon2));

    const dlon = lon2Rad - lon1Rad;
    const dlat = lat2Rad - lat1Rad;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    calculatedDistances.push(distance.toFixed(2));
    total += distance;
  }

  return total;
}

