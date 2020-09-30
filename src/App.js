import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Contents from "./Contents.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCity: 89,
      cityRestaurant: [],
    };
  }

  showRestaurant = (restaurantsToBeShowed) => {
    // const oldRestaurants = [...this.state.Contents];
  };
  componentDidMount() {
    this.fetchCities(this.state.selectedCity);
  }
  fetchCities = (cityId) => {
    axios({
      method: "GET",
      url: "https://developers.zomato.com/api/v2.1/search",
      dataResponse: "json",
      headers: {
        "user-key": "3b0e9e63572bbbf8a8c2943707d0366e",
      },
      params: {
        format: "json",
        entity_type: "city",
        entity_id: cityId,
        count: 20,
        sort: "rating",
        order: "desc",
      },
    }).then((res) => {
      const restroName = res.data.restaurants;
      this.setState({
        selectedCity: this.state.selectedCity,
        cityRestaurant: restroName,
      });
    });
  };
  handleChange = (event) => {
    this.setState({
      selectedCity: event.target.value,
      cityRestaurant: this.state.cityRestaurant,
    });
    this.fetchCities(event.target.value);
  };

  handlePriceChange = (event) => {
    this.setState({
      ...this.state,
      priceSelected: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Food Barn</h1>
        </header>
        <main>
          <div className="wrapper quote">
            <h2>Food Barn</h2>
            <q>
              If more of us valued food and cheer above hoards of gold it would
              be a merrier world.
            </q>
            <p>J.R.R. Tolkien</p>
          </div>
          <form className="wrapper">
            <fieldset
              onChange={this.handleChange}
              value={this.state.selectedCity}
            >
              <p>
                <label>Select City: </label>
                <select id="city">
                  <option value="89">Toronto</option>
                  <option value="280">New York City</option>
                  <option value="61">London</option>
                  <option value="257">Rome</option>
                  <option value="4">Bengalore</option>
                  <option value="52">Singapore</option>
                  <option value="74">Jakarta</option>
                  <option value="51">Dubai</option>
                  <option value="260">Sydney</option>
                  <option value="84">Prague</option>
                  <option value="59">Istanbul</option>
                </select>
              </p>
            </fieldset>
            <fieldset className="priceOption">
              <input type="radio" value="lowCost" id="radio1" onChange={this.handlePriceChange} checked={this.state.priceSelected === "lowCost"}/>
              <label for="radio1"><span role="img" aria-label="a single dollar sign">💰</span></label>
              <input type="radio" value="mediumCost" id="radio2" onChange={this.handlePriceChange} checked={this.state.priceSelected === "mediumCost"}/>
              <label for="radio2"><span role="img" aria-label="a double dollar sign">💰💰</span></label>
              <input type="radio" value="highCost" id="radio3" onChange={this.handlePriceChange} checked={this.state.priceSelected === "highCost"}/>
              <label for="radio3"><span role="img" aria-label="a triple dollar sign">💰💰💰</span></label>
            </fieldset>
          </form>

          <div className="displayRestaurants wrapper">
            {this.state.cityRestaurant.filter((restro) => {
              if (restro.restaurant.price_range <= 2 && this.state.priceSelected === "lowCost") {
                return true;
              } else if (restro.restaurant.price_range === 3 && this.state.priceSelected === "mediumCost") {
                return true;
              } else if(restro.restaurant.price_range >= 4  && this.state.priceSelected === "highCost"){
                return true;
              } else if (!this.state.priceSelected) {
                return true;
              } else {
                return false;
              }
            }).map((restro, index) => {
              return (
                <Contents
                  showRestaurant={() => {
                    this.showRestaurant(index);
                  }}
                  restro={restro.restaurant}
                />
              );
            })}
          </div>
        </main>
        <footer>
          <h2>©Copyright 2020 <a href="https://junocollege.com/" target="blank">Juno College</a></h2>
          </footer>
      </div>
    );
  }
}

export default App;
