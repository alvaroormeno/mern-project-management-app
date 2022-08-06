import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
	mutation AddProject(
		$name: String!
		$description: String!
		$status: ProjectStatus!
		$clientId: ID!
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clientId: $clientId
		) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;

// creating DeleteProject mutation which takes in an id and then ww call deleteProject query where we pass the id and then just return the id

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;


const UPDATE_PROJECT = gql`
	mutation updateProject(
    $id: ID!
		$name: String!
		$description: String!
		$status: ProjectStatusUpdate!
	) {
		updateProject(
      id: $id
			name: $name
			description: $description
			status: $status
		) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
