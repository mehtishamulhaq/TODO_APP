import './../scss/App.css';
import TodoList from './TodoList';
import Grid from '@material-ui/core/Grid';
import Input from './../components/Input/Input';
import Label from './../components/Label/Label';
import Button from './../components/Button/Button'

function App() {
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
                placeholder='What to do ?'
              />
            </div>
            <div className='add-button-wrapper'>
              <Button className='add-button'>New List</Button>
            </div>
          </div>

          <TodoList />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
