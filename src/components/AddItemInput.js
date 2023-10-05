import React, { Component } from 'react';
import '../assets/main.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


class AddItemInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', // Initialize the input value
    };
  }

  handleKeyDown = (e) => {
    const { value } = this.state;
    if (value && e.key === 'Enter') {
      this.props.addItem(value); // Call the addItem function from props
      this.setState({ value: '' }); // Clear the input value
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value }); // Update the input value
  }

  render() {
    return (
      <div id="add-item-input">
        <FontAwesomeIcon icon={faPlus} />
        <input
          type="text"
          placeholder="Add item"
          value={this.state.value} // Bind the input value to the component state
          onChange={this.handleChange} // Add an onChange event handler
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default AddItemInput;
