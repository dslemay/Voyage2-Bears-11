import React, { Component } from 'react';
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
              "date": "2017-09-30"
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

class FlightsList extends Component {

}

export default FlightsList;
