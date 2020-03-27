import React from 'react';
import {print} from 'graphql';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import {render, cleanup, fireEvent, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom';

import {MockedProvider} from '@apollo/react-testing';

import Login, {mutation} from '../components/signIn';

describe('Login Page', () => {
    afterEach(cleanup);

    it('renders without error', () => {
        let {getByText, getAllByPlaceholderText, container} = render(
        <MockedProvider mocks={[]}>    
        <Login email="michgboxy3@gmail.com" password="password"/>
        </MockedProvider>
        );

        getByText(/Login/);
        
    });

    // it('fires login mutation and updates cache after done', async () => {
    //     const cache = new InMemoryCache();

    //     const mocks = [
    //         {
    //             request: {query: mutation, variables: {email: "michgboxy3@gmail.com", password: "password" }},
    //             result: {
    //                 data: {
    //                     "signIn": {
    //                         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTg1MzE1OTA4LCJleHAiOjE1ODUzMjMxMDh9.qd84c7ZBU1TRut-Wr3FZ4JIODKse2nODd4fPhX3F9Es"
    //                       }
                        
    //                 }
    //             }
    //         }
    //     ];

    //     let {getByText, container} = render(
    //         <MockedProvider mocks={[]}>    
    //         <Login email="michgboxy3@gmail.com" password="password"/>
    //         </MockedProvider>
    //         , {
    //             mocks,
    //             cache
    //         });

    //          const email = container.querySelector('input[name="email"]');
    //          const password = container.querySelector('input[name="password"]');

    //         fireEvent.change(email, {
    //             target: {
    //              value: 'michgboxy3@gmail.com'
    //            }
    //        });

    //        fireEvent.change(password, {
    //         target: {
    //          value: 'password'
    //        }
    //    });

    //    fireEvent.click(getByText(/Primary/));

    //    await waitForElement(() => getByText(/Primary/));

    //    const { me } = cache.readQuery({
    //        query: gql`
    //        query{
    //         me{
    //           name
    //           email
    //           phoneNumber
    //           zipCode
    //           address
    //         }
    //       }
    //        `
    //    });

    //    expect(me).toBeTruthy();

    // });
})