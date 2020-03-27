import React from 'react';
import {graphql} from 'react-apollo';
import loggedOnUser from '../queries/me';



  
  

const Home = (props) => {
   
   let token = sessionStorage.getItem('token');

   const {loading, error, me} = props.data;

   props.data.refetch();


   if(!token){ props.history.push('/login')}

    if(me){
        return (
            <div>
                <h3>Welcome to RentZend</h3> <h2>{me.name}</h2>
    
                <p>Email: {me.email}</p>
                <p>PhoneNumber: {me.phoneNumber}</p>
                <p>Address: {me.address}</p>
    
                
            </div>
        )
    }else {
        return <div>Welcome to RentZend</div>
    }
}



export default graphql(loggedOnUser)(Home);

