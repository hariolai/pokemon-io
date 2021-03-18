import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        image
        name
      }
    }
  }
`;
export const gqlGetPokemonVariables = (offset) => ({ limit: 10, offset: offset });

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
    	name
    	abilities{
        ability{
          name
        }
      }
    	moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }
`;
export const gqlGetPokemonVariable = (name) => ({ name: name });