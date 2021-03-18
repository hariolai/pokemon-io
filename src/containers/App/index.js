import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from '../Home';
import MainMenu from '../MainMenu';
import PokemonList from '../PokemonList';
import PokemonDetail from '../PokemonDetail';
import MyPokemon from '../MyPokemon';
import { GlobalProvider } from '../../config/Context';
import CatchPokemon from '../CatchPokemon';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache()
});

function App(){
    return (
        <Router>
            <GlobalProvider>
                <ApolloProvider client={client}>
                    <Home/>
                    <Switch>
                        <Route path="/" exact component={MainMenu}/>
                        <Route path="/list" exact component={PokemonList}/>
                        <Route path="/detail/:pokemonName" component={PokemonDetail}/>
                        <Route path="/catch/:pokemonName" component={CatchPokemon}/>
                        <Route path="/myList" component={MyPokemon}/>
                    </Switch>
                </ApolloProvider>
            </GlobalProvider>
        </Router>
    );
}
export default App;