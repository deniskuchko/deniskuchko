import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";

import "./app.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    error: false,
    selectedItem: null,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  onSelectedItem = (id) => {
    this.setState({
      selectedItem: id,
    });
    /* console.log(numb); */
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const {
      getPersonImage,
      getAllPeople,
      getPerson,
      getAllPlanets,
      getPlanetImage,
      getPlanet,
    } = this.swapiService;
    const peopleItem = (
      <ItemList onSelectedItem={this.onSelectedItem} getData={getAllPeople}>
        {(item) => <button>{`${item.name} | ${item.gender}`}</button>}
      </ItemList>
    );
    const personDetails = (
      <ErrorBoundry>
        <ItemDetails
          selectedItem={this.state.selectedItem}
          getImage={getPersonImage}
          getData={getPerson}
        >
          <Record label="Name " field="name" />
          <Record label="Gender " field="gender" />
          <Record label="Birth Year " field="birthYear" />
          <Record label="Eye Color " field="eyeColor" />
        </ItemDetails>
      </ErrorBoundry>
    );
    const planetsItem = (
      <ItemList onSelectedItem={this.onSelectedItem} getData={getAllPlanets}>
        {(item) => (
          <button>{`${item.name} | ${item.population}| ${item.rotation_period}`}</button>
        )}
      </ItemList>
    );
    const planetsDetails = (
      <ErrorBoundry>
        <ItemDetails
          selectedItem={this.state.selectedItem}
          getImage={getPlanetImage}
          getData={getPlanet}
        >
          <Record label="Name " field="name" />
          <Record label="Population " field="population" />
          <Record label="Rotation period " field="rotation_period" />
          <Record label="Diameter " field="diameter" />
        </ItemDetails>
      </ErrorBoundry>
    );

    if (this.state.error) {
      return <ErrorIndicator />;
    }
    /* if (planetsItem) {
      elementItem = planetsDetails;
    } else if (peopleItem) {
      elementItem = personDetails;
    } */
    return (
      <div className="stardb-app">
        <Header />
        {planet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <Row left={peopleItem} right={personDetails} />
        <Row left={planetsItem} right={planetsDetails} />
      </div>
    );
  }
}
