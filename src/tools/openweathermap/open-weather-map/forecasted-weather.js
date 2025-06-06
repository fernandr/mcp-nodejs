/**
 * Function to get the forecasted weather data from OpenWeatherMap.
 *
 * @param {Object} args - Arguments for the weather forecast.
 * @param {string} [args.appid] - Your OpenWeatherMap API key.
 * @param {string} [args.q] - City name for the weather forecast.
 * @param {number} [args.id] - City ID for the weather forecast.
 * @param {number} [args.lat] - Latitude of the location.
 * @param {number} [args.lon] - Longitude of the location.
 * @param {string} [args.zip] - Zip code for the weather forecast.
 * @param {string} [args.units] - Units for the temperature (metric, imperial).
 * @param {string} [args.lang] - Language for the response.
 * @param {string} [args.Mode] - Format of the response (xml, html).
 * @returns {Promise<Object>} - The forecasted weather data.
 */
const executeFunction = async ({ appid, q, id, lat, lon, zip, units, lang, Mode }) => {
  const baseUrl = 'http://api.openweathermap.org/data/2.5/';
  const token = process.env.OPENWEATHERMAP_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/forecast`);
    if (appid) url.searchParams.append('appid', appid);
    if (q) url.searchParams.append('q', q);
    if (id) url.searchParams.append('id', id);
    if (lat) url.searchParams.append('lat', lat);
    if (lon) url.searchParams.append('lon', lon);
    if (zip) url.searchParams.append('zip', zip);
    if (units) url.searchParams.append('units', units);
    if (lang) url.searchParams.append('lang', lang);
    if (Mode) url.searchParams.append('Mode', Mode);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET'
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecasted weather data:', error);
    return { error: 'An error occurred while fetching forecasted weather data.' };
  }
};

/**
 * Tool configuration for fetching forecasted weather data from OpenWeatherMap.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'forecast_weather',
      description: 'Get the forecasted weather data for a specific location.',
      parameters: {
        type: 'object',
        properties: {
          appid: {
            type: 'string',
            description: 'Your OpenWeatherMap API key.'
          },
          q: {
            type: 'string',
            description: 'City name for the weather forecast.'
          },
          id: {
            type: 'integer',
            description: 'City ID for the weather forecast.'
          },
          lat: {
            type: 'number',
            description: 'Latitude of the location.'
          },
          lon: {
            type: 'number',
            description: 'Longitude of the location.'
          },
          zip: {
            type: 'string',
            description: 'Zip code for the weather forecast.'
          },
          units: {
            type: 'string',
            description: 'Units for the temperature (metric, imperial).'
          },
          lang: {
            type: 'string',
            description: 'Language for the response.'
          },
          Mode: {
            type: 'string',
            description: 'Format of the response (xml, html).'
          }
        }
      }
    }
  }
};

export { apiTool };