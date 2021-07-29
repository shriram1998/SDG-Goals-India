import { UT } from "./config";
export const filterData = (data, payload) => {
  /**
 * Helper function to filter data based on selected goal and year
 *
 * @param {Array} data Complete data to be filtered
 * @param {Object} payload Object with goal and year values
 * @returns Filtered data in the original json format
  */
  let filteredData;
  if (payload.toggleUT) {
    filteredData = data[payload.year].filter((stateWiseData) => {
      return UT.includes(stateWiseData['area_code']);
    });
  }
  else {
    filteredData=data[payload.year].filter((stateWiseData) => {
      return !UT.includes(stateWiseData['area_code']);
    });
  }
  return filteredData.map((stateWiseData) => {
    let filteredCharData = stateWiseData.chartdata.filter((charVal) => {
      return payload['goal'].includes(charVal.name)
    })[0]['value'];
    return {
      area_name: stateWiseData.area_name,
      chartdata: filteredCharData
    }
  });
}