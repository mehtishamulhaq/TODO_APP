import React, { useState } from 'react';
import './../scss/App.css';
import TodoList from './TodoList';
import Grid from '@material-ui/core/Grid';
import Input from './../components/Input/Input';
import Label from './../components/Label/Label';
import Button from './../components/Button/Button';
// import dummyData from './../constants/dummyData.json';
import dummyData from './../constants/dummyDataV2.json';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';

function App() {
  const [list, updateList] = useState(dummyData['list']);
  // const [list, updateList] = useState(dummyData);
  const [title, updateTitle] = useState('');

  const handleUpdateList = (newList) => {
    updateList(newList);
    console.log(newList);
  }

  const addNewItem = () => {
    if (title && title !== '') {
      const newItem = {
        id: uuidv4(),
        title: title,
        status: false,
        createdAt: new Date().toISOString(),
        Tasks: []
      }
      // handleUpdateList(newItem);
      const duplicateList = cloneDeep(list);
      duplicateList.push(newItem);
      updateList(duplicateList);
      updateTitle('');
    }
  }

  return (
    <div className="App">
      <Grid container className='container-grid'>
        <Grid item xs={12} sm={4} m={4} className='center-item-grid'>
          <div className='header-container'>
            <Label className='header-label'>Todo App</Label>
          </div>

          <div className='add-description-container'>
            <div className='description-field-wrapper'>
              <Input
                placeholder='What to do ?'
                value={title}
                onChange={(event) => updateTitle(event.target.value)}
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

          <TodoList list={list} onListChange={handleUpdateList} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
