import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Button from "@material-ui/core/Button";
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import FormikField from './formikField'; 

sessionStorage.removeItem('token');

const initialValues= {
    name: '', 
    email: '', 
    address: '', 
    password: '',
    zipCode: '',
    phoneNumber: '', 
}

const signupSchema = yup.object().shape({
    name: yup.string().required(),
    phoneNumber: yup
      .number('only numbers are allowed')
      .required('required')
      .positive()
      .integer(),
    email: yup.string().email('enter email'),
    address: yup.string().required(),
    zipCode: yup
      .number()
      .required()
      .positive()
      .integer(),
    password: yup.string().required()

  });
  
  

const Signup = (props) => {
    const handleSubmit = async ({name, email, phoneNumber, address, zipCode, password}) => {
        try{
            let data = await props.mutate({
                variables: {name, email, phoneNumber, address, zipCode, password}
            });
    
            sessionStorage.setItem("token", (data.data.signUp.token));
    
            if(data){
                if(data.data.signUp.verified === 'false'){
                    props.history.push('/kyc')
                }else {
                    props.history.push('/home')
                }
            }

        }catch(e){
            alert("Agent registration failed")
        }
    };


    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signupSchema}
                >
                {({dirty, isValid}) => {
                    return (
                        <Form>
                           
                            <FormikField label="Name" name="name"/>

                            <FormikField label="Email" name="email"/>

                            <FormikField label="Address" name="address"/>

                            <FormikField label="Phone Number" name="phoneNumber"/>

                            <FormikField label="Zip Code" name="zipCode"/>

                            <FormikField label="password" name="password" type="password"/>

                        

                            {/* <button disabled={!dirty} type="submit">submit</button> */}
                             <Button variant="contained" color="primary" disabled={!dirty} type="submit">Register </Button>

                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

const mutation = gql`
        mutation SignUp($email : String!, $password : String!, $name: String!,$zipCode : String!, $address : String!, $phoneNumber: String!){
                signUp(name: $name, email: $email, password: $password, phoneNumber: $phoneNumber, address: $address, zipCode: $zipCode){
                   token
                   verified
                  }
        }
`;

export default graphql(mutation)(Signup);
// graphql(mutation)(Signup);
