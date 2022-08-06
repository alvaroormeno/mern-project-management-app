import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import Home from './pages/Home';

// created so cache data maybe be lost warning stops appearing. Merging old with new cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache,
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
    </>
  );
}

export default App;
