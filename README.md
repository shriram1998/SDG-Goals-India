# SDG India

React application to display Sustainable Development Goals (SDGs) data for Indian states using bar chart and map for the years 2018-2020.

## Install

Install the dependencies with the following command:

```shell
npm install
```

## Launch with Development Server

To run a development build and launch the development server, execute:

```shell
npm start
```

Once completed, the app should be avialable from http://localhost:3000/

## Application UI

<div align="center">
   <br/>
   <img src="public/assets/SDG.png" alt="Home screen with effects" width="1000" height="600">
   <br/>
   <br/>
</div>

## Extending SDG data

Add JSON of new data in `src/data/` and add the year in YEARS variable in `src/config/index.js`

## GeoJSON path

Updated GeoJSON can be loaded in `public/assets/` with the same name in future
