import React, { useEffect,useRef } from 'react';
import { connect } from "react-redux";
import L from "leaflet";

const INDIA_GEOJSON = require("../../data/states_india.json");
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2hyaXJhbTE5OTgiLCJhIjoiY2txeG4zcmFyMGF1bDJ1cDZ1NHFvdHBsNSJ9.MYJmMpgXl7Z2J7yUmNOFeA';

const Map=(props)=> {
  const chartRef = useRef(null);
  let geojson, map;
  let info = L.control();
  let legend = L.control({ position: 'bottomright' });
  
  /*Functions to color chart*/
  function getColor(d) {
  /*Generate color based on the sdg score*/
    return  d > 80 ? '#005a32' :
            d > 70 ? '#238443' :
            d > 60 ? '#41ab5d' :
            d > 50 ? '#78c679' :
            d > 40 ? '#addd8e' :
            d > 30 ? '#d9f0a3' :
                      '#ffffe5';
  }
  function style(feature) {
    return {
      fillColor: getColor(feature.properties.sdgdata),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  /*Functions to handle chart events*/
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }
  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    info.update(layer.feature.properties);
  }
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
      mouseout: resetHighlight,
        click:zoomToFeature
    });
  }

  /*Tooltip*/
  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };
  // Tooltip update
  info.update = function (properties) {
      this._div.innerHTML = `<h4>${props.goal} - ${props.year}</h4>` +  (properties ?
          '<b>' + properties.st_nm + '</b><br />' + properties.sdgdata
          : 'Select inputs and hover over a State/UT for more details');
  };

  /*Legend*/
  legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 30, 40, 50, 60, 70, 80, 100];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<p class="item"><i style="background:' + getColor(grades[i] + 1) + '"></i><span class="legendText">' +
        ' - '+grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</span></p>' : '');
    }
    return div;
  };

  /* eslint-disable */
  useEffect(() => {
    // create a leafet map with India as center
    map=L.map(chartRef.current, {
      center: [23, 82],
      zoom: 5,
      layers: [
        L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`, {
          attribution:
            '<a href="http://mapbox.com/about/maps" class="mapbox-logo" target="_blank">Mapbox</a>',
        }),
      ]
    });
    let modifiedFeatures = [];
    if (props.codeToSDG) {
      /*Map sdg scores to geojson data when required inputs are available*/
      INDIA_GEOJSON.features.forEach((geoRow)=>{
        if(geoRow.properties.state_code in props.codeToSDG){
          geoRow.properties.sdgdata=props.codeToSDG[geoRow.properties.state_code];
          }
        modifiedFeatures.push(geoRow);
      });
      let finalFeatures={type: "FeatureCollection", features:modifiedFeatures};
      geojson = L.geoJson(finalFeatures, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);
      info.addTo(map); //Info about hover or selection
      legend.addTo(map); //Legend about color to score mapping
      map.fitBounds([
      [23, 68],
      [23,96]
      ]);
      }
    return () => {
      /*Map cleanup*/
      map.off();
      map.remove();
    }
  }, [props.goal,props.year]);
  /* eslint-enable */

  return <div className="map-container" ref={ chartRef}></div>
}

const mapStateToProps = (state) => {
  return {codeToSDG:state.sdg.codeToSDG,goal:state.sdg.goal,year:state.sdg.year};
}
export default connect(mapStateToProps,{})(Map);