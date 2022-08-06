import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { GET_PROJECTS } from '../queries/projectQueries'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutations/projectMutations'

const DeleteProjectButton = ({projectId}) => {

  //initilaize useNavigate to be able to redirect
  const navigate = useNavigate();

  // call deleteProject function with uses/calls DELETE_PROJECT mutation and we pass to it a variable containing the id which equals to projectId we receive from parent component.
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {id: projectId},
    // when complete lets return to home page
    onCompleted: () => navigate('/'),
    // this time instead of updating cache we are just refetching GET_PROJECTS query to update home page to render all projects without the deleted one.
    refetchQueries: [{query: GET_PROJECTS}],

  })

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className='icon'  /> Delete Project
      </button>

    </div>
  )
}

export default DeleteProjectButton