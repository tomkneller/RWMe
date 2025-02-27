/**
 * function for converting degrees into radians
 * @param {number} deg degrees represented as a number
 * @returns radian calculated from degrees
 */
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
* Function for calculating the distance between 2 sets of latititudes and longitudes
* @param lat1 latitude of users origin point
* @param lon1 longitude of users origin point
* @param lat2 latitude of event origin
* @param lon2 longitude of event origin
* @returns distance away of event start from the users location in kilometers
*/
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula for calculating distance between two coordinates
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};


/**
 * Function for filtering routes list by those less than passed in as distanceFilter parameter
 * @param {Array[{}]} routes routes array containing route data
 * @param {number} distanceFilter the user entered maxium amount of distance the route should cover
 * @returns routes filtered to those within the specified maximum distance, if the parameter is invalid the unfiltered routes are returned
 */
export const filterByRouteDistance = (routes, distanceFilter) => {
  const validDistanceFilter = distanceFilter !== '' && !isNaN(Number(distanceFilter)) && Number(distanceFilter) >= 0;

  if (validDistanceFilter) {
    return routes.filter(route => {
      const distance = route.distance;

      return distance <= distanceFilter;
    })
  }
  return routes;

}

/**
 * Function for filtering route list by route terrain type
 * @param {Array[{}]} routes routes array containing route data
 * @param {string} terrainFilter the terrain type to filter by (can be Trail, Road, Mixed or Any)
 */
export const filterByRouteTerrain = (routes, terrainFilter) => {
  if (terrainFilter != "any") {
    return routes.filter(route => {
      const terrain = route.terrainType;

      return terrain == terrainFilter;
    })
  }
  return routes;
}

/**
 * Filtering by a maximum pace
 * @param {Array[{}]} routes routes array containing route data
 */
export const filterByRoutePace = (routes, paceFilter) => {
  if (paceFilter != "00:00") {
    return routes.filter(route => {
      const pace = route.pace;

      return pace <= paceFilter;
    })
  }
  return routes;
}

/**
 * 
 * @param {Array[{}]} routes routes array containing route data
 * @param {object{latitude: number, longitude: number}} userLocation users current location obtained from gps as latitude and logitude object
 * @param {number} searchRadius the user defined search radius where they want to search for routes in KM
 * @returns routes filtered to those within the search radius parameter, if the parameter is invalid the unfiltered routes are returned
 */
export const filterByRouteLocation = (routes, userLocation, searchRadius) => {
  const validSearchRadius = searchRadius !== '' && !isNaN(Number(searchRadius)) && Number(searchRadius) >= 0;

  if (validSearchRadius) {
    const numRadius = searchRadius;
    return routes.filter(route => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        route.lat,
        route.longi
      );
      return distance <= numRadius;
    });
  }
  return routes;
}