import React from 'react';
import {ErrorMessage, Field} from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import "./formikField.css";

const FormikField = ({name, label, type = "text"}) => {
    return (
        <div className="FormikField">
        <Field
            required
            autoComplete="off" 
            as={TextField}
            label={label}
            name={name}
            fullWidth
            type={type}
            helperText={<ErrorMessage name={name}/>}
        />
       </div>
    )
}

export default FormikField;