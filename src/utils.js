import { UT } from "./config";

export const filterData = (data, payload) => {
  /**
 * Helper function to filter data based on selected goal and year
 *
 * @param {Array} data Complete data to be filtered
 * @param {Object} payload Object with goal and year values
 * @returns Filtered data in the original json format
  */
  let codeToSDG={};

  let requiredData= data[payload.year].map((stateWiseData) => {
    /*Filtering data based on goal, year and toggle value*/

    let filteredChartData = stateWiseData.chartdata.filter((charVal) => {
      return payload['goal'].includes(charVal.name) //Get score
    })[0]['value'];   

    let stateCode = parseInt(stateWiseData.area_code >= 10 ?
      stateWiseData.area_code.slice(-2) :   //For mapping code to geoJSON
      stateWiseData.area_code.slice(-3));
    codeToSDG[stateCode] = filteredChartData;
    
    if (
      (payload.toggleUT && !UT.includes(stateWiseData['area_code'])) ||
      (!payload.toggleUT && UT.includes(stateWiseData['area_code']))
     ) {
      return null; //Return null for data that fails toggle condition
    }
    return {
      area_name: stateWiseData.area_name,
      chartdata: filteredChartData  //Return score which satisfies all conditions
    }
  });
  requiredData = requiredData.filter((data) => data != null);
  return [requiredData,codeToSDG];
}