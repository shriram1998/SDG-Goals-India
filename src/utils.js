import { UT } from "./config";

export const filterData = (data, payload) => {
  /*Helper function to filter data based on selected goal,
  year and state/ut toggle and add score to geoJSON for map*/
  let codeToSDG={};

  let requiredData= data[payload.year].map((stateWiseData) => {
    let filteredChartData = stateWiseData.chartdata.filter((charVal) => {
      return payload['goal'].includes(charVal.name) //Get score
    })[0]['value'];   

    let stateCode = parseInt(stateWiseData.area_code >= 10 ?
      stateWiseData.area_code.slice(-2) :   //For pushing score to geoJSON using state code
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