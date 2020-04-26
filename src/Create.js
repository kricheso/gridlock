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
  const classes = useStyles();

  async function saveGrid(e) {
    e.preventDefault();
    let fields = e.target.elements;
    let email = "azeezah@google.com";
    let title = fields['title'].value;
    console.log(title);
    console.log(email);
    const createdGrid = await Firestore.add.grid(email, title, grid,[[1,0],[1,1]] );
    if (createdGrid === null) {
       alert("You already have a board with that name!");
    }
    console.log(createdGrid);
    return false;
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
    <Board setGrid={setGrid} />
    </div>
  );
}

export default Create;
