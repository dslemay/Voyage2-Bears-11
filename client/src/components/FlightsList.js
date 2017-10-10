import React from 'react';
import axios from 'axios';

function getFlights() {
    const dest = "SFO";
    const url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCqLj6JPkZgBK8E9QZtgWBAO9OcVYaQrKc';
    const data = {
        "request": {
          "slice": [
            {
              "origin": "LAS",
              "destination": dest,
              "date": "2017-10-30"
            }
          ],
          "passengers": {
            "adultCount": 1,
            "infantInLapCount": 0,
            "infantInSeatCount": 0,
            "childCount": 0,
            "seniorCount": 0
          },
          "solutions": 1,
          "maxPrice": "USD100.00",
          "refundable": false
        }
    };

    axios.post(url, data)
    .then(data => console.log(data));
}

function FlightsList() {
  getFlights();
  return <p>hello</p>
}

export default FlightsList;
