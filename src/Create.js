import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Board from './Board';

const useStyles = makeStyles((theme) => ({
  page: {
    paddingTop: '3%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
    alignSelf: 'flex-end',
  },
  input: {
   fontSize: '50px',
   color: '#595959',
    '& input': {
      textAlign: 'center',
    },
  }
}));

function Create(props) {
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState(null);
  const defaultUserId = "kricheso@google.com";
  const classes = useStyles();

  async function saveGrid(e) {
    e.preventDefault();
    let fields = e.target.elements;
    let title = fields['title'].value;
    let email = props.user ? props.user.id : defaultUserId;
    const createdGrid = await Firestore.add.grid(email, title, grid, solution);
    if (!createdGrid) {
      // Todo: Surface errors from Firestore.add.grid.
      // Todo: Check if user has made any moves (that also gives an error since Firestore.add.grid checks for start and end).
       alert("You already have a board with that name!");
    } else {
      alert("Grid saved!");
      console.log(createdGrid);
      return false;  // Form onSubmit must return false.
    }
  }

  return (
    <div className={classes.page}>
    <form onSubmit={saveGrid} className={classes.form}>
    <InputBase className={classes.input}
        defaultValue="Click To Edit Title"
        name="title"
        inputProps={{ 'aria-label': 'naked', 'font-family': 'cursive'}}
      />
    <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
    </Button>
    </form>
    <Board setGrid={setGrid} setSolution={setSolution} />
    </div>
  );
}

export default Create;
