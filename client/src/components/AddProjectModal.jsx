import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import Spinner from "./Spinner";



const AddClientModal = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  // // Use ADD_PROJECT mutation
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {name, description, clientId, status},
    //update cache to render newly added project on page
    update(cache, {data: {addProject}}) {
      // read the cache which query is GET_PROJECT mutation and destructure to grab projects
      const {projects} = cache.readQuery({ query: GET_PROJECTS});

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject]},
      })
    }
  })

  // Get client for selecting client
  const {loading, error, data} = useQuery(GET_CLIENTS);



  const onSubmit = (e) => {
    e.preventDefault();
    //validate that inputs have name email and phone by checking if states are empty
    if(name === '' || description === '' || status === '') {
      return alert('Please fill in all 3 fields to continue');
    };
    //call addProject function and pass input state values to use for ADD_PROJECT mutation
    addProject(name, description, clientId, status)
    //clear states therefore clear inputs
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("")
  };

  if(loading) return null;
  if (error) return 'somethign went wrong!'

	return ( 
		<>
    {/* only if its not loading and no error we want to render the modal, because we want the GET_CLIENTS query to load first to have clients info available before modal renders. */}
    {!loading && !error && (
       <>
       <button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#addProjectModal"
			>
				<div className="d-flex align-items-center">
					<FaList className="icon" />
					<div>New Project</div>
				</div>
			</button>

			<div 
				className="modal fade"
				id="addProjectModal"
				aria-labelledby="addProjectModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addProjectModalLabel">
								New Project
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={onSubmit}>
                {/* NAME */}
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input
										type="text"
										className="form-control"
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
                {/* DESCRIPTION */}
								<div className="mb-3">
									<label className="form-label">Description</label>
									<textarea
										type="email"
										className="form-control"
										id="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>
                {/* STATUS */}
								<div className="mb-3">
									<label className="form-label">Status</label>
									<select className="form-select"  id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
								</div>
                {/* CLIENT SELECT */}
                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select id="client" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                    <option value="">SelectClient</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option> ))}
                  </select>
                  
                  

                </div>

                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >
                  Submit
                </button>
							</form>
						</div>
					</div>
				</div>
			</div>
       </>
    )}
			
		</>
	);
};

export default AddClientModal;
