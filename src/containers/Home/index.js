import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import pokeball from '../../assets/images/icons/pokeball.png';
import logout from '../../assets/images/icons/logout.png';
import star from '../../assets/images/icons/star.png';
import pokemonSolid from '../../assets/fonts/Pokemon/Pokemon-Solid.ttf';
import buttonTheme from '../../assets/audios/button-theme.mp3';
import mainTheme from '../../assets/audios/main-theme.mp3';
import { GlobalContext } from '../../config/Context';
import { useHistory } from 'react-router';

const Nav = styled.div`
    position: fixed;
    background-color: #EBECF0;
    border-top: 1px solid #BEBEBE;
    height: 50px;
    width: 100%;
    bottom: 0;
    z-index: 2;
    @media screen and (min-width: 1200px){
        border-top: 0px;
        top: 0;
    };
`;
const IconContainer = styled.div`
    width: 33%;
    padding-top: 10px;
    margin-bottom: 10px;
    height: 50px;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    @media screen and (min-width: 1200px){
        :hover{
            background-color: #ffcb05;
        }
        padding-top: 0px;
        text-align: justify;
        border: 2px solid #2a75bb;
    };
`;

const Icon = styled.img`
    width: 35px;
    @media screen and (min-width: 1200px){
        margin-left: 20px;
        float: left;
        margin-top: 5px;
    };
`;

const IconText = styled.p`
    display: none;
    @media screen and (min-width: 1200px){
        @font-face {
            font-family: 'Pokemon-Solid';
            font-display: swap;
            src: url(${pokemonSolid});
        };
        font-family: Pokemon-Solid;
        color: #2a75bb;
        font-weight: 100;
        font-size: 30px;
        margin-top: -25px;
        display: table;
    };
`;
function Home(){
    const { displayNav } = useContext(GlobalContext);
    const history = useHistory();
    const audio = new Audio(buttonTheme);
    audio.preload = 'auto';
    const buttonEffect = () => {
        if(window.screen.width >= 1200){
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        }
    };
    const stopButtonEffect = () => {
        if(window.screen.width >= 1200){
            audio.pause();
            audio.currentTime = 0;
        }
    };
    useEffect(() => {
        if(displayNav === 'block'){
            document.getElementById("bgMainMusicBtn").play();
        } 
        else {
            document.getElementById("bgMainMusicBtn").pause();
            document.getElementById("bgMainMusicBtn").currentTime = 0;
        }
    }, [displayNav])
    return(
        <Nav style={{display: displayNav}}>
            <audio id="bgMainMusicBtn" preload="auto" loop={true} autoPlay={true} style={{display: 'none'}}>
                <source src={mainTheme} type="audio/mpeg"/>
            </audio>
            <IconContainer onClick={() => {history.replace("/list")}} onMouseOver={buttonEffect} onMouseOut={stopButtonEffect}>
                <Icon src={pokeball} alt="pokemon-list"/>
                <IconText>&nbsp;Pokemon List</IconText>
            </IconContainer>
            <IconContainer onClick={() => {history.replace("/myList")}} onMouseOver={buttonEffect} onMouseOut={stopButtonEffect}>
                <Icon src={star} alt="my-pokemon-list"/>
                <IconText>&nbsp;My Pokemon List</IconText>
            </IconContainer>
            <IconContainer onClick={() => {
                    history.replace("/");
                }} onMouseOver={buttonEffect} onMouseOut={stopButtonEffect}>
                <Icon src={logout} alt="exit"/>
                <IconText>&nbsp;Exit</IconText>
            </IconContainer>
        </Nav>
    );
}
export default Home;