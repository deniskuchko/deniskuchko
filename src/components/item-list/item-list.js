import React, { Component } from "react";

//import SwapiService from "../../services/swapi-service";

import "./item-list.css";

class ItemList extends Component {
  //swapiService = new SwapiService();

  state = {
    items: [],
  };

  renderItems(arr) {
    return arr.map((elem) => {
      return (
        <li
          className="list-group-item"
          key={elem.id}
          onClick={() => this.props.onSelectedItem(elem.id)}
        >
          {this.props.children(elem)}
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.getData().then((data) => {
      this.setState({
        items: data,
      });
    });
  }

  render() {
    const { items } = this.state;
    const { onSelectedItem } = this.props;

    return (
      <ul className="item-list list-group">
        {/* <li className="list-group-item">Luke Skywalker</li>
        <li className="list-group-item">Darth Vader</li>
        <li className="list-group-item">R2-D2</li> */}
        {this.renderItems(items)}
      </ul>
    );
  }
}

const f = (Wrapped) => {
  return class extends React.Component {
    componentDidMount() {
      console.log(this.props);
    }
    render() {
      return <Wrapped {...this.props} />;
    }
  };
};
export default f(ItemList);
