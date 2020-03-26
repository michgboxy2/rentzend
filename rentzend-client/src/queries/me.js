import gql from 'graphql-tag';

export default gql`
    {
        me{
            name
            email
            phoneNumber
            zipCode
            address
          }
    }
`;