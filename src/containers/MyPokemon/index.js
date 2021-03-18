import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import List from '../../components/List';
import { GlobalContext } from '../../config/Context';
import bgInGameLandscape from '../../assets/images/bg/bgInGameLandscape.png';
import bgInGamePortrait from '../../assets/images/bg/bgInGamePortrait.jpg';

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

function MyPokemon(){
    const { pokemonData, editPokemon, editNav } = useContext(GlobalContext);
    useEffect(() => {
        editNav('block');
    }, []);
    // useEffect( ()=> {
    //     if(data){
    //         const newPokemons = [];
    //         data.pokemons.results.map((pokemon) => newPokemons.push({
    //             id: pokemon.id,
    //             name: pokemon.name,
    //             image: pokemon.image,
    //             move: [],
    //             type: [],
    //             total: 0,
    //             nickname: []
    //         }));
    //         localStorage.setItem('pokemonData', JSON.stringify(pokemonData.concat(newPokemons)));
    //         addPokemon(newPokemons);
    //     }
    // }, [data]);
    const handleRemovePokemon = (e) => {
        const id = e.target.id.split(":::");
        const selectedPokemon = pokemonData.find(pokemon => pokemon.id === parseInt(id[0]));
        const updatedNickname = selectedPokemon.nickname.filter(nickname => nickname !== id[1]);
        console.log(selectedPokemon);
        const updatedPokemon = {
            id: selectedPokemon.id,
            name: selectedPokemon.name,
            image: selectedPokemon.image,
            move: selectedPokemon.move,
            type: selectedPokemon.type,
            total: selectedPokemon.total > 0 ? selectedPokemon.total - 1 : 0,
            nickname: updatedNickname
        };
        editPokemon(updatedPokemon);
    };
    useEffect(() => {
        localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
    }, [pokemonData]);
    return (
        <PokemonListWrapper>
            <ScrollablePage>
            {
                
                pokemonData.map((pokemon,index) => (pokemon.total > 0) ? pokemon.nickname.map((name) => 
                <List onRemove={handleRemovePokemon} type="myList" pos={index} key={`${pokemon.id}:::${name}`} id={`${pokemon.id}:::${name}`} image={pokemon.image} name={pokemon.name} other={`Nickname: ${name}`}></List>) : null)
            }
            </ScrollablePage>
        </PokemonListWrapper>
        
    );
}
export default MyPokemon;