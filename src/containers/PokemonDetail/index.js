import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../config/Context';
import { useQuery } from '@apollo/client';
import { GET_POKEMON, gqlGetPokemonVariable } from '../../utils/apollo';
import bgInGamePortrait from '../../assets/images/bg/bgInGamePortrait.jpg';
import pokebutton from '../../assets/images/icons/pokebutton.png';

const DetailWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    background-size: 100% 100%;
    @media screen and (max-width: 1200px){
        background-image: url(${bgInGamePortrait});
    };
    @media screen and (min-width: 1200px){
        background-color: #BDFFA4;
    };
`;
const DetailCard = styled.div`
    background-image: linear-gradient(to right, rgba(42, 117, 187), rgba(118, 171, 219));
    width: 100%;
    height: 200px;
    text-align: center;
    @media screen and (min-width: 1200px){
        margin-top: 50px;
        height: 300px;  
    };
`;
const PokemonPicture = styled.img`
    width: 100px;
    background-color: white;
    border-radius: 25px;
    margin-top: 30px;
    @media screen and (min-width: 1200px){
        width: 200px;
    };
`;
const PokemonName = styled.h1`    
    color: white;
    width: 100%;
    margin-top: 0px;
`;
const TypeTitle = styled.h3`
    color: #2a75bb;
    text-align: center;
    font-family: sans-serif;
`;
const ScrollablePage = styled.div`
    width: 100%;
    margin-left: 10px;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    text-align: center;
    font-family: sans-serif;
`;
const CatchButton = styled.img`
    bottom: 0;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    margin-bottom: 55px;
    cursor: pointer;
    @media screen and (min-width: 1200px){
        margin-bottom: 10px;
    };
`;
const InformationWrapper = styled.div`
    width: 100%;
`
const InformationContent = styled.div`
    width: 50%;
    display: inline-block;
`
function PokemonDetail(route){
    const history = useHistory();
    const [pokemon, setPokemon] = useState({});
    const [pokemonMovement, setPokemonMovement] = useState(null);
    const [pokemonType, setPokemonType] = useState(null);
    const { pokemonData,editPokemon,editNav } = useContext(GlobalContext);
    const pokemonName = route.match.params.pokemonName;
    const { data } = useQuery(GET_POKEMON, { variables: gqlGetPokemonVariable(pokemonName) });
    
    useEffect(() => {
        editNav('block');
        const selectedPokemon = pokemonData.find(pokemon => pokemon.name === pokemonName);
        setPokemon(selectedPokemon);
    }, []);
    useEffect(() => {
        if(data){
            if(pokemon){
                if(pokemon.move && pokemon.type){
                    if(pokemon.move.length === 0 && pokemon.type.length === 0){
                        const updatedPokemon = {
                            id: pokemon.id,
                            name: pokemon.name,
                            image: pokemon.image,
                            move: data.pokemon.moves,
                            type: data.pokemon.types,
                            total: pokemon.total,
                            nickname: pokemon.nickname
                        };
                        setPokemon(updatedPokemon);
                        editPokemon(updatedPokemon);
                    }
                }
                const temp = pokemon.move ? pokemon.move.map((movement,index) => <p key={`${movement.move.name}:::${index}`}>{movement.move.name.replace('-', ' ')}</p>) : null;
                const temp1 = pokemon.type ? pokemon.type.map((type,index) => <p key={`${type.type.name}:::${index}`}>{type.type.name.replace('-',' ')}</p>) : null;
                setPokemonMovement(temp);
                setPokemonType(temp1);
            }
        }
    }, [data])
    useEffect(() => {
        localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
        if(Object.keys(pokemon).length !== 0){
            const temp = pokemon.move.map((movement,index) => <p key={`${movement.move.name}:::${index}`}>{movement.move.name}</p>);
            const temp1 = pokemon.type.map((type,index) => <p key={`${type.type.name}:::${index}`}>{type.type.name}</p>);
            setPokemonMovement(temp);
            setPokemonType(temp1);
        }
    }, [pokemonData]);
    return (
        <DetailWrapper>
            <DetailCard>
                <PokemonName>{(pokemon ? pokemon.name : "")}</PokemonName>
                <PokemonPicture src={(pokemon ? pokemon.image : "")}/>
            </DetailCard>
            <InformationWrapper>
                <InformationContent>
                    <TypeTitle>Move</TypeTitle>
                    <ScrollablePage>
                        {pokemonMovement}
                    </ScrollablePage>
                </InformationContent>
                
                <InformationContent>
                    <TypeTitle>Type</TypeTitle>
                    <ScrollablePage>
                        {pokemonType}
                    </ScrollablePage>
                </InformationContent>

            </InformationWrapper>
            <CatchButton src={pokebutton} onClick={() => {history.replace(`/catch/${pokemonName}`)}}/>
        </DetailWrapper>
    );
}

export default PokemonDetail;