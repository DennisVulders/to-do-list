import React, { Component } from 'react';
import '../assets/main.scss'; // Import the main SCSS file

class ItemNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.name, // Initialize the input value with the provided name prop
    };
  }

  componentDidMount() {
    this.inputRef.focus(); // Automatically focus on the textarea when the component mounts
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value }); // Handle changes in the textarea's value
  };

  handleKeyDown = (e) => {
    const { editedName } = this.state;
    if (editedName && e.key === 'Enter') {
      this.props.toggleEdit();
      this.props.editItem(this.props.id, editedName); // Pass id and editedName
    }
  };

  toggleEdit = () => {
    this.props.toggleEdit(); // Toggle editing mode when the textarea loses focus
    this.props.editItem(this.state.value); // Call the editItem function with the current value
  };

  render() {
    return (
      <div className="item-name-input">
        <textarea
          ref={(ref) => (this.inputRef = ref)} // Create a ref for the textarea
          value={this.state.value} // Set the textarea's value based on component state
          onChange={this.handleChange} // Handle changes in the textarea's value
          onKeyDown={this.handleKeyDown} // Handle keydown events in the textarea
          onBlur={this.toggleEdit} // Handle blur (loss of focus) events in the textarea
        />
      </div>
    );
  }
}

export default ItemNameInput;
