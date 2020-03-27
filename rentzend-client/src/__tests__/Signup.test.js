import React from 'react';

import {render, cleanup, fireEvent, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom';

import {MockedProvider} from '@apollo/react-testing';

import Signup, {mutation} from '../components/signUp';

describe('Signup Page', () => {
    afterEach(cleanup);

    it('renders without error', () => {
        let {getByText} = render(
        <MockedProvider mocks={[]}>    
        <Signup />
        </MockedProvider>
        );

        getByText(/Signup/);
        
    });

    it('activates the register button after the fields have been fixed', () => {
            let {getByText, container} = render(
            <MockedProvider mocks={[]}>    
            <Signup email="michgboxy3@gmail.com" password="password"/>
            </MockedProvider>);

            const name = container.querySelector('input[name="name"]'); 
            const email = container.querySelector('input[name="email"]');
            const address = container.querySelector('input[name="address"]');
            const phoneNumber = container.querySelector('input[name="phoneNumber"]');
            const zipCode = container.querySelector('input[name="zipCode"]');
             const password = container.querySelector('input[name="password"]');

            fireEvent.change(email, {
                target: {
                 value: 'michgboxy3@gmail.com'
               }
           });

           fireEvent.change(name, {
            target: {
             value: 'Michael'
           }
            });

            fireEvent.change(address, {
                target: {
                value: 'Lagos, Nigeria'
                }
            });

   fireEvent.change(phoneNumber, {
    target: {
     value: '08123232323'
   }
});

fireEvent.change(zipCode, {
    target: {
     value: '2341'
   }
});
           

           fireEvent.change(password, {
            target: {
             value: 'password'
           }
       });

       getByText(/Register/);

       
    });

});