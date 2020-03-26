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

const signInSchema = yup.object().shape({
    email: yup.string().email('enter email'),
    password: yup.string().required()

  });
  
  

const Signin = (props) => {
    const handleSubmit = async ({name, email, phoneNumber, address, zipCode, password}) => {
        
       try{
        let data = await props.mutate({
            variables: {name, email, phoneNumber, address, zipCode, password}
        });

        sessionStorage.setItem("token", (data.data.signIn.token));

        if(data){
            if(data.data.signIn.verified === 'false'){
                props.history.push('/kyc')
            }else {
                props.history.push('/home')
            }
        }
       }catch(e){
           console.log(e);
           alert('Incorrect credentials');
       }
    };


    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signInSchema}
                >
                {({dirty, isValid}) => {
                    return (
                        <Form>
                            <FormikField label="Email" name="email"/>

                            <FormikField label="password" name="password" type="password"/>
                            
                             <Button variant="contained" color="primary" disabled={!dirty} type="submit">Primary </Button>

                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

const mutation = gql`
        mutation SignUp($email : String!, $password : String!){
                signIn(email: $email, password: $password){
                   token
                   verified
                  }
        }
`;

export default graphql(mutation)(Signin);

