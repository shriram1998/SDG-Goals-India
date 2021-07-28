export const filterData = (data,payload) => {
  /**
 * Helper function to filter data based on selected goal and year
 *
 * @param {Array} data Complete data to be filtered
 * @param {Object} payload Object with goal and year values
 * @returns Filtered data in the original json format
 */
  let yearWiseData=data[`_${payload.year}`]
  return yearWiseData.map((stateWiseData) => {
    let filteredCharData = stateWiseData.chartdata.filter((charVal) => {
      return payload['goal'].includes(charVal.name)
    })[0];
    return {
      area_name: stateWiseData.area_name,
      area_code: stateWiseData.area_code,
      chardata: filteredCharData
    }
  });
}