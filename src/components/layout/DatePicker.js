import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function TimePickers() {

  const [firstTime, setFirstTime] = useState('08:00');
  console.log(firstTime)
  const [secondTime, setSecondTime] = useState(firstTime+1);
  const classes = useStyles();

  const handleSecondTime = (e) => {
    e.preventDefault();
    if(e.target.value < firstTime){
      console.log('Second hour should be greater than the first one')
      return;
    }else{
      setSecondTime(e.target.value)
    }
  }

  const handleFirstTime = (e) => {
    e.preventDefault();
    if(e.target.value > secondTime){
      console.log('First hour should be smaller than the second one');
      return;
    }else{
      setFirstTime(e.target.value)
    }
  }

  return (
    <div className={classes.container}  onSubmit={(e) => (console.log)}>
      <TextField
        id="time1"
        label="from"
        type="time"
        onChange={(e) => handleFirstTime(e)}
        value={firstTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 3600, // 1 hour
        }}
      />
      <TextField
        id="time2"
        label="to"
        type="time"
        value={secondTime}
        onChange = {(e) => handleSecondTime(e)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 3600, // 1 hour
        }}
      />
    </div>
  );
}