import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

  
  
const Kyc = (props) => {
    let token = sessionStorage.getItem('token');
    if(!token){ props.history.push('/login')}


    const [files, setFiles] = useState({});



    const classes = useStyles();

    onsubmit = async (e) => {
        try{
         let data = await props.mutate({
            variables: {file : files}
        });

        if(data.data.singleUpload.filename){
            alert("upload successful");
            props.history.push('/home');

        }

        if(data.errors){
            alert(data.errors[0].message);
        }

        }catch(e){
            alert("file upload failed")
        }
    }
    
    return (
        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {setFiles(e.target.files[0])}}
          />
          <p>{files.name}</p>
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              SELECT FILE
            </Button>
          </label>

          <button variant="contained" color="primary" type="submit" onClick={onsubmit}>Upload </button>
        </div>
      );
}

const mutation = gql`
    mutation($file : Upload! ){
        singleUpload(file: $file){
      filename
      mimetype
      encoding
    }
  }

`;


export default graphql(mutation)(Kyc);