import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header/>
      <div className="Container">
        <h1>hello world</h1>
      </div>
    </ApolloProvider>
    </>
  );
}

export default App;
