import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";



const AddClientModal = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Use ADD_CLIENT mutation
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {name, email, phone},
    //update cache to render newly added client on page
    update(cache, {data: {addClient}}) {
      // read the cache which query is GET_CLIENTS mutation and destructure to grab clients
      const {clients} = cache.readQuery({ query: GET_CLIENTS});

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient]},
      })
    }
  })


  const onSubmit = (e) => {
    e.preventDefault();

    //validate that inputs have name email and phone by checking if states are empty
    if(name === '' || email === '' || phone === '') {
      return alert('Please fill in all 3 fields to continue');
    }
    
    //add new client by passing state values
    addClient(name, email, phone)

    //clear states therefore clear inputs
    setName("");
    setEmail("");
    setPhone("");
    

  }

	return (
		<>
			<button
				type="button"
				className="btn btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#addClientModal"
			>
				<div className="d-flex align-items-center">
					<FaUser className="icon" />
					<div>Add Client</div>
				</div>
			</button>

			<div
				className="modal fade"
				id="addClientModal"
				aria-labelledby="addClientModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addClientModalLabel">
								Add Client
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
                {/* EMAIL */}
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input
										type="email"
										className="form-control"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
                {/* PHONE */}
								<div className="mb-3">
									<label className="form-label">Phone</label>
									<input
										type="text"
										className="form-control"
										id="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>

                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" >
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
