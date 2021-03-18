import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import bgMainPortrait from '../../assets/images/bg/bgMainPortrait.jpg';
import bgMainLandscape from '../../assets/images/bg/bgMainLandscape.jpg';
import buttonTheme from '../../assets/audios/button-theme.mp3';
import openPokeball from '../../assets/images/icons/openPokeball.png';
import closedPokeball from '../../assets/images/icons/closedPokeball.png';
import battleTheme from '../../assets/audios/battle-theme.mp3';
import { GlobalContext } from '../../config/Context';
import { useHistory } from 'react-router';

const Background = styled.div`
    background-image: url(${bgMainPortrait});
    background-size: 100% 100%;
    overflow: hidden;
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    @media screen and (min-width: 900px){
        background-image: url(${bgMainLandscape});
    };
`;
const Cover = styled.div`
    position: relative;
    background-color: #000;
    opacity: 0.7;
    width: 100%;
    min-height: 100vh;
    height: 100vh;
`;
const Content = styled.div`
    width: 100%;
    top: 0;
    min-height: 100vh;
    height: 100vh;
    position: absolute;
    text-align: center;
`;
const Ball = styled.div`
    background-image: url(${closedPokeball});
    background-size: 100% 100%;
    width: 200px;
    height: 200px;
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    };
    animation: shake 1s;
    animation-iteration-count: infinite;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
`;

const ContentChild = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;
const InputNickName = styled.input`
    width: 300px;
    border-radius: 15px;
    position: relative;
    border: none;
    height: 30px;
    text-align: center;
    border: 1px solid #ffcb05;
    outline: none;
    @media screen and (max-width: 500px){
        width: 200px;
    };
    z-index: 2;
`;
const Pokemon = styled.div`
    background-size: 100% 100%;
    width: 200px;
    height: 200px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    @keyframes out {
        0%   {top: 0px;}
        100% {top: -200px;}
    }
    animation: out 1s;
    animation-direction: normal;
    z-index; 0;
`;
const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    z-index: 2;
`;

function CatchPokemon(route){
    const { editNav,pokemonData,editPokemon } = useContext(GlobalContext);
    const [ showPokemon,setShowPokemon ] = useState('none');
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ nickname, setNickName ] = useState('');
    const audio = new Audio(buttonTheme);
    audio.preload = 'auto';
    const history = useHistory();
    const pokemonName = route.match.params.pokemonName;

    const handleChange = (e) => {
        setNickName(e.target.value);
    };
    const handleSubmit = (e) => {
        if(e.key === "Enter"){
            const selectedPokemon = pokemonData.find(pokemon => pokemon.name === pokemonName);
            if(selectedPokemon.nickname.includes(nickname)){
                setErrorMsg("Nickname already exists");
            } else {
                const updatedPokemon = {
                    id: selectedPokemon.id,
                    name: selectedPokemon.name,
                    image: selectedPokemon.image,
                    move: selectedPokemon.move,
                    type: selectedPokemon.type,
                    total: selectedPokemon.total + 1,
                    nickname: selectedPokemon.nickname.concat(nickname)
                };
                editPokemon(updatedPokemon);
                localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
                history.replace("/myList");
            }
        }
    };
    useEffect(() => {
        const selectedPokemon = pokemonData.find(pokemon => pokemon.name === pokemonName);
        if(selectedPokemon === undefined){
            history.replace('/list');
        }
        editNav('none');
        document.getElementById("ball").style = "animation: shake 1s;animation-iteration-count: infinite;";
        setTimeout(() => {
            const result = Math.random() < 0.5 ? 0 : 1;
            if(result){
                setShowPokemon('block');
                if(document.getElementById("ball")){
                    document.getElementById("ball").style = `background-image: url(${openPokeball});animation-play-state: paused;`;
                }
                if(document.getElementById("pokemon")){
                    document.getElementById("pokemon").style = `background-image: url(${selectedPokemon.image});animation-play-state: running;`;
                }
                audio.play();
            } else {
                document.getElementById("ball").style = "animation-play-state: paused;";
                setErrorMsg("Bad luck, Please try catch me again");
            }
        }, 5000);
    }, []);
    return(
        <Background>
            <audio id="bgBattleMusicBtn" preload="auto" loop={true} autoPlay={true} style={{display: 'none'}}>
                <source src={battleTheme} type="audio/mpeg"/>
            </audio>
            <Cover></Cover>
            <Content>
                <ContentChild>
                    <Ball id="ball"></Ball>
                    <Pokemon id="pokemon" style={{display: showPokemon}}></Pokemon>
                    <ErrorMessage>{errorMsg}</ErrorMessage>
                    <InputNickName placeholder="Please enter new nickname" onChange={handleChange} onKeyDown={handleSubmit} style={{display: showPokemon}}/>
                </ContentChild>
            </Content>
        </Background>
    );
}
export default CatchPokemon;