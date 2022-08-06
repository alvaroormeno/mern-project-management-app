import React from 'react'
import {FaTrash} from 'react-icons/fa'
import { InMemoryCache, useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations.js'
import { GET_CLIENTS } from '../queries/clientQueries.js'


const ClientRow = ({ client }) => {

  

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // when clicking delete button, client is deleted in backend but not rendered so we need to refresh page. 2 options - refetch queries by calling get clients again or update cache so we dont have to make a complete request again.

    // OPTION 1 - refetch queries
    // refetchQueries: [{query: GET_CLIENTS}],

    // OPTION 2 - update the cache
    // function update where we pass cache, and we are setting data to the response of deleteClient where we get all info od id, name, email, phone.
    update(cache, {data: {deleteClient}}) {
      // Destructure GET_CLIENTS we read from the cache to obtain clients. It is better to get it from cache so we dont need to make a new query request
      const {clients} = cache.readQuery({ query: GET_CLIENTS});
      // We write to the cache using GET_CLIENTS
      cache.writeQuery({
        query: GET_CLIENTS,
        // set data to clients which equals to filter out the clients from the one we want to delete
        data: {clients: clients.filter(client => client.id !== deleteClient.id)},
      })
    }
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm'
        onClick={deleteClient}>
          <FaTrash/>
        </button>
      </td>
    </tr>
  )
}

export default ClientRow