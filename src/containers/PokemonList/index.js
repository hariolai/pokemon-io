import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GET_POKEMONS, gqlGetPokemonVariables } from '../../utils/apollo';
import { useQuery } from '@apollo/client';
import List from '../../components/List';
import { GlobalContext } from '../../config/Context';
import bgInGameLandscape from '../../assets/images/bg/bgInGameLandscape.png';
import bgInGamePortrait from '../../assets/images/bg/bgInGamePortrait.jpg';
import { useHistory } from 'react-router';

const PokemonListWrapper = styled.div`
    background-image: url(${bgInGamePortrait});
    background-size: 100% 100%;
    height: 100vh;
    @media screen and (min-width: 1200px){
        background-image: url(${bgInGameLandscape});
    };
`;
const ScrollablePage = styled.div`
    background-color: transparent;
    width: 100%;
    height: 650px;
    overflow: scroll;
    position: relative;
    @media screen and (max-width: 375px){
        height: 550px;
    }
    @media screen and (min-width: 1200px){
        margin-top: 50px;
    };
`;

function PokemonList(){
    const [pageDown, setPageDown] = useState(false);
    const { pokemonData, addPokemon, editNav } = useContext(GlobalContext);
    const [offset, setOffset] = useState(pokemonData.length);
    const { data } = useQuery(GET_POKEMONS, { variables: gqlGetPokemonVariables(offset) });
    const history = useHistory();
    // if (loading) console.log("Loading");
    // if (error) console.log(`Error! ${error.message}`);
    useEffect(() => {
        editNav('block');
    }, []);
    useEffect( ()=> {
        if(data){
            const newPokemons = [];
            data.pokemons.results.map((pokemon) => newPokemons.push({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                move: [],
                type: [],
                total: 0,
                nickname: []
            }));
            addPokemon(newPokemons);
            localStorage.setItem('pokemonData', JSON.stringify(pokemonData.concat(newPokemons)));
        }
    }, [data]);
    useEffect( () => {
        if(pageDown){
            setOffset(pokemonData.length);
        }
        setPageDown(false);
    }, [pageDown]);
    const scrollCheck = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setPageDown(true);
        }
    }
    return (
        <PokemonListWrapper>
            <ScrollablePage onScroll={scrollCheck}>
            {
                pokemonData.map((pokemon,index) => <List onClick={() => history.push(`/detail/${pokemon.name}`)} pos={index} id={pokemon.id} key={pokemon.id} image={pokemon.image} name={pokemon.name} other={`owned: ${pokemon.total}`}></List>)
            }
            </ScrollablePage>
        </PokemonListWrapper>
        
    );
}
export default PokemonList;