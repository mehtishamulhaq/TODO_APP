import React, { useState, useRef } from 'react';
import './../scss/App.css';
import TodoList from './TodoList';
import Grid from '@material-ui/core/Grid';
import Input from './../components/Input/Input';
import Label from './../components/Label/Label';
import Button from './../components/Button/Button';
import dummyData from './../constants/dummyData.json'

function App() {
  const [list, updateList] = useState(dummyData['list']);
  const [description, updateDescription] = useState('Bakwasiayat');
  const inputRef = useRef(null);

  const handleUpdateList = (newItem) => {
    const duplicateList = [...list];
    duplicateList.push(newItem);
    updateList(duplicateList);
    updateDescription('');
  }

  const addNewItem = () => {
    // let description = inputRef.current.value;
    if (description && description !== '') {
      const newItem = {
        description: description,
        type: "ITEM",
        isComplete: false,
        steps: []
      }
      handleUpdateList(newItem);
    }
  }

  return (
    <div className="App">
      <Grid container className='container-grid'>
        <Grid item xs={12} sm={6} m={4} className='center-item-grid'>
          <div className='header-container'>
            <Label className='header-label'>TODO APP</Label>
          </div>

          <div className='add-description-container'>
            <div className='description-field-wrapper'>
              <Input
                ref={inputRef}
                placeholder='What to do ?'
                value={description}
                onChange={(event) => updateDescription(event.target.value)}
              />
            </div>
            <div className='add-button-wrapper'>
              <Button
                className='add-button'
                onClick={(event) => addNewItem(event)}
              >
                New List
              </Button>
            </div>
          </div>

          <TodoList list={list} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
