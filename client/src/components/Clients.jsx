import React from 'react'
import {gql, useQuery} from '@apollo/client'
import ClientRow from './ClientRow.jsx'
import Spinner from './Spinner.jsx'
//import queries from clientqueries.js
import { GET_CLIENTS } from '../queries/clientQueries.js'



const Clients = () => {

  const { loading, error, data } = useQuery(GET_CLIENTS)
  console.log(data)

  if(loading) return <Spinner/>
  if(error) return <p>Something Went Wrong</p>

  return (
    <>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* map for each client from data to render a clientrow component wich we are passing the key and the client data. */}
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client}/>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Clients