import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";



const AddClientModal = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  // // Use ADD_CLIENT mutation
  // const [addClient] = useMutation(ADD_CLIENT, {
  //   variables: {name, email, phone},
  //   //update cache to render newly added client on page
  //   update(cache, {data: {addClient}}) {
  //     // read the cache which query is GET_CLIENTS mutation and destructure to grab clients
  //     const {clients} = cache.readQuery({ query: GET_CLIENTS});

  //     cache.writeQuery({
  //       query: GET_CLIENTS,
  //       data: { clients: [...clients, addClient]},
  //     })
  //   }
  // })


  const onSubmit = (e) => {
    e.preventDefault();

    //validate that inputs have name email and phone by checking if states are empty
    if(name === '' || description === '' || status === '') {
      return alert('Please fill in all 3 fields to continue');
    }
    

    //clear states therefore clear inputs
    setName("");
    setDescription("");
    setStatus("new");
    

  }

	return (
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
									<label className="form-label">Phone</label>
									<select className="form-select"  id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
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
	);
};

export default AddClientModal;
