import React, { Component } from 'react';
import _ from 'lodash'; 
import AddItemInput from './AddItemInput'; 
import Item from './Item'; 
import '../assets/main.scss'; 

import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        height: 60 // Initial height for items
      },
      items: [] // Initialize items as an empty array
    };
  }

  componentDidMount() {
    // Populate initial items when the component mounts
    this.setState({
      items: [
        { id: 1, name: 'Go to the store', isCompleted: false }, 
        { id: 2, name: 'Walk the dog', isCompleted: false }, 
        { id: 3, name: 'Hit the gym', isCompleted: false },
      ],
    });
  }

  getMeta() {
    const { items } = this.state;
    const completed = items.filter(item => item.isCompleted); // Filter completed items
    const uncompleted = items.filter(item => !item.isCompleted); // Filter uncompleted items

    return {
      completed: {
        items: completed,
        height: completed.length > 0 ? _.sumBy(completed, 'height') : 0, // Calculate total height of completed items
      },
      uncompleted: {
        items: uncompleted,
        height: uncompleted.length > 0 ? _.sumBy(uncompleted, 'height') : 0, // Calculate total height of uncompleted items
      },
    };
  }

  toggleItem(id) {
    // Toggle the completion status of an item
    const updatedItems = this.state.items.map(item => ({
      ...item,
      isCompleted: item.id === id ? !item.isCompleted : item.isCompleted,
    }));
    this.setState({ items: updatedItems });
  }

  addItem = (name) => {
    // Add a new item to the list
    let updatedItems = [...this.state.items];
    updatedItems.push({ id: 0, name, isCompleted: false });
    updatedItems = updatedItems.map((item, index) => {
      const newItem = { ...item, id: index + 1 };
      return newItem;
    });
    this.setState({ items: updatedItems });
  }

  editItem(id, name) {
    // Edit the name of an item
    const updatedItems = this.state.items.map(item => ({
      ...item,
      name: item.id === id ? name : item.name,
    }));
    this.setState({ items: updatedItems });
  }

  deleteItem(id) {
    // Delete an item from the list
    let updatedItems = [...this.state.items].filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  }

  setItemHeight(id, height) {
    // Set the height of an item
    const updatedItems = this.state.items.map(item => {
      if (item.id === id) {
        item.height = height;
      }
      return item;
    });
    this.setState({ items: updatedItems });
  }

  getItemCountText() {
    // get text for completed list
    const meta = this.getMeta();
    let itemCountText = '';

    if (meta.completed.items.length === 0) {
      itemCountText = 'No completed items';
    } else if (meta.completed.items.length >= 1) {
      const pluralText = meta.completed.items.length === 1 ? 'item' : 'items';
      itemCountText = `${meta.completed.items.length} completed ${pluralText}`;
    }
    return itemCountText;
  }

  render() {
    const meta = this.getMeta(); // Get metadata about completed and uncompleted items

    let uInd = 0,
      cInd = 0;

    // Create arrays of React components for uncompleted and completed items
    const uncompletedItems = this.state.items
      .filter(item => !item.isCompleted) // Filter uncompleted items
      .map((item, index) => (
        <Item
          key={item.id}
          id={item.id}
          index={uInd++}
          height={item.height}
          name={item.name}
          meta={meta}
          isCompleted={item.isCompleted}
          toggleItem={() => this.toggleItem(item.id)}
          editItem={(name) => this.editItem(item.id, name)} // Pass only the name to editItem
          deleteItem={() => this.deleteItem(item.id)}
          setItemHeight={this.setItemHeight}
        />
      ));

    const completedItems = this.state.items
      .filter(item => item.isCompleted) // Filter completed items
      .map((item, index) => (
        <Item
          key={item.id}
          id={item.id}
          index={cInd++}
          height={item.height}
          name={item.name}
          meta={meta}
          isCompleted={item.isCompleted}
          toggleItem={() => this.toggleItem(item.id)}
          deleteItem={() => this.deleteItem(item.id)}
          setItemHeight={this.setItemHeight}
        />
      ));

    const itemCountText = this.getItemCountText(); // Generate text for the number of completed items

    return (
      <div id="app">
        <div id="items-outer-container">
          <div id="items-container" className="scroll-bar">
            {/* Pass the addItem function as a prop */}
            <AddItemInput addItem={this.addItem} />
            <div id="items">
              <div
                id="items-uncompleted__spacer"
                style={{ height: `${meta.uncompleted.height}px` }}
              />
              {uncompletedItems}
              <div id="items-completed__header">
                <h1>{itemCountText}</h1>
              </div>
              <div
                id="items-completed__spacer"
                style={{ height: `${meta.completed.height}px` }}
              />
              <div className='items-completed'>
                {completedItems}
              </div>
            </div>
          </div>
        </div>
        <div id="app__background-accent" />
        <div id="hints">
          <div id="hint-title">
            <h1>Hints</h1>
          </div>
          <div className="hint">
            <FontAwesomeIcon icon={faArrowRight} />
            <h1>Hit enter to add a new todo</h1>
          </div>
          <div className="hint">
            <FontAwesomeIcon icon={faArrowRight} />
            <h1>Double-click todo text to edit</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;
