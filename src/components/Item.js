import React, { Component } from 'react';
import ItemNameInput from './ItemNameInput';
import '../assets/main.scss';

import { faCheck, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editedName: props.name, // Initialize the editedName state with the initial name
    };
  }

  componentDidMount() {
    // Check if the ref exists before accessing it
    if (this.refs.item) {
      const height = this.refs.item.getBoundingClientRect().height;
      this.props.setItemHeight(this.props.id, height);
    }
  }

  componentDidUpdate() {
    // Check if the ref exists before accessing it
    if (this.refs.item) {
      const height = this.refs.item.getBoundingClientRect().height;
      if (height !== this.props.height) {
        this.props.setItemHeight(this.props.id, height);
      }
    }
  }

  toggleEdit = () => {
    // Toggle the editing state and reset editedName when entering editing mode
    if (!this.state.isEditing) {
      this.setState({ isEditing: true, editedName: this.props.name });
    } else {
      this.props.editItem(this.props.id, this.state.editedName); // Pass id and editedName
      this.setState({ isEditing: false }); // Reset editing state
    }
  };

  handleNameChange = (editedName) => {
    this.setState({ editedName });
  };

  render() {
    const { name, isCompleted, toggleItem, deleteItem, editItem } = this.props; // Add editItem to the destructuring
    const { isEditing, editedName } = this.state;
    let classes = isCompleted ? 'item completed' : 'item';

    classes = isEditing ? `${classes} editing` : classes;

    const itemName = isEditing ? (
      <ItemNameInput
        name={editedName} // Use editedName in the input field
        handleNameChange={this.handleNameChange}
        toggleEdit={this.toggleEdit}
        editItem={editItem} // Pass the editItem function
      />
    ) : (
      <div className="item-name" onDoubleClick={!isCompleted ? this.toggleEdit : null}>
        <h1>{name}</h1>
      </div>
    );

    return (
      <div className={classes}>
        <div className="item-icon" onClick={toggleItem}>
          <FontAwesomeIcon icon={farCircle} className="far fa-circle uncompleted" />
          <FontAwesomeIcon icon={faCheck} className="fas fa-check completed" />
        </div>
        {itemName}
        <div className="item-edit" onClick={this.toggleEdit}>
          <FontAwesomeIcon icon={faPen} className="fas fa-pen" />
        </div>
        <div className="item-delete" onClick={deleteItem}>
          <FontAwesomeIcon icon={faTimesCircle} className="fas fa-times-circle" />
        </div>
      </div>
    );
  }
}

export default Item;
