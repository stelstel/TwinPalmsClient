// Server Routes
//export const API_URL = 'https://localhost:44306/api/FbReports/';
// Gets list of all Outlets
export const API_OUTLET_URL = 'https://localhost:44306/api/Outlets';
//Gets all FbReports for many outlets between fromDate and toDate, including toDate
export const API_URL =
  "https://localhost:44306/outlets/fbReports?outletIds=1&fromDate=2021-01-01&toDate=2021-06-27";

// Gets yesterdays, monthly, yearly revenue for all outlets
export const API_URL_OUTLETS_REVENUE =
  "http://localhost:5000/outlets/overview";

/*
export const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${}&query=`;
export const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${}`;
*/
