const reducer = (state, action) => {
    switch(action.type){
        case "EDIT_NAV":
            return {
                ...state,
                displayNav: action.payload
            };
        case "ADD_POKEMON":
            return {
                ...state,
                pokemonData: [...state.pokemonData.concat(action.payload)]
            };
        case "EDIT_POKEMON":
            const updatedPokemon = action.payload;
            const updatedPokemons = state.pokemonData.map(pokemon => {
                if (pokemon.id === updatedPokemon.id) {
                    return updatedPokemon;
                }
                return pokemon;
              });
              return {
                ...state,
                pokemonData: updatedPokemons
            };
        default:
            return state;
    }
};
export default reducer;
