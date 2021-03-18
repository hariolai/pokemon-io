import React, { createContext, useReducer } from 'react';
import reducer from '../Context/reducer';

const updatedData = JSON.parse(localStorage.getItem('pokemonData')) === null ? [] : JSON.parse(localStorage.getItem('pokemonData'));
const initialState = {
    displayNav: 'block',
    pokemonData: updatedData
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    function editNav(display){
        dispatch({
            type: "EDIT_NAV",
            payload: display
        });
    };
    function addPokemon(pokemon){
        dispatch({
            type: "ADD_POKEMON",
            payload: pokemon
        });
    };
    function editPokemon(pokemon){
        dispatch({
            type: "EDIT_POKEMON",
            payload: pokemon
        });
    };
    function addCollection(pokemon){
        dispatch({
            type: "ADD_POKEMON_COLLECTION",
            payload: pokemon
        });
    };
    function removePokemon(pokemon){
        dispatch({
            type: "REMOVE_POKEMON",
            payload: pokemon
        });
    };
    return (
        <GlobalContext.Provider value={{
            displayNav: state.displayNav,
            pokemonData: state.pokemonData,
            editNav,
            addPokemon,
            editPokemon,
            addCollection,
            removePokemon
        }}>
            {children}
        </GlobalContext.Provider>
    );
};