import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import bgMainPortrait from '../../assets/images/bg/bgMainPortrait.jpg';
import bgMainLandscape from '../../assets/images/bg/bgMainLandscape.jpg';
import btnPlay from '../../assets/images/icons/btnPlay.png';
import muteButton from '../../assets/images/icons/mute.png';
import unmuteButton from '../../assets/images/icons/unmute.png';
import creditButton from '../../assets/images/icons/credit.png';
import pokemonSolid from '../../assets/fonts/Pokemon/Pokemon-Solid.ttf';
import walkTheme from '../../assets/audios/walk-theme.mp3';
import buttonTheme from '../../assets/audios/button-theme.mp3';
import { GlobalContext } from '../../config/Context';
import { useHistory } from 'react-router-dom';

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
`;
const Title = styled.h1`
    @font-face {
        font-family: 'Pokemon-Solid';
        font-display: swap;
        src: url(${pokemonSolid});
    };
    font-family: Pokemon-Solid;
    margin-top: 40%;
    color: #ffcb05;
    -webkit-text-stroke-width: 4px;
    -webkit-text-stroke-color: #2a75bb;
    font-size: 50px;
    text-align: center;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    letter-spacing: 10px;
    @media screen and (max-width: 360px){
        margin-top: 20%;
        letter-spacing: 5px;
        font-size: 40px;
    };
    @media screen and (min-width: 450px) and (max-width: 800px){
        letter-spacing: 3px;
        margin-top: 5%;
        font-size: 80px;
    };
    @media screen and (min-width: 800px){
        letter-spacing: 10px;
        margin-top: 0px;
        font-size: 100px;
        -webkit-text-stroke-width: 5px;
    };
`;
const PlayInput = styled.div`
    display: block;
    @media screen and (min-width: 600px) and (max-width: 900px){
        margin-top: -50px;
    };
    @media screen and (min-width: 900px){
        margin-top: -70px
    };
`;
const Play = styled.div`
    margin: auto;
    background-image: url(${btnPlay});
    background-size: 100% 100%;
    cursor: pointer;
    width: 200px;
    height: 200px;
    -webkit-tap-highlight-color:transparent;
    -moz-tap-highlight-color:transparent;
    -o-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
    @media screen and (min-width: 500px){
        width: 250px;
        height: 250px;
    };
    :active, :hover{
        margin-top: 2px;
    };
`;
const Footer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
`;
const SoundButton = styled.div`
    background-image: url(${muteButton});
    background-size: 100% 100%;
    float: left;
    cursor: pointer;
    width: 60px;
    height: 60px;
    -webkit-tap-highlight-color:transparent;
    -moz-tap-highlight-color:transparent;
    -o-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
`;
const CreditButton = styled.div`
    background-image: url(${creditButton});
    background-size: 100% 100%;
    float: right;
    cursor: pointer;
    width: 60px;
    height: 60px;
    -webkit-tap-highlight-color:transparent;
    -moz-tap-highlight-color:transparent;
    -o-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
`;

function MainMenu(){
    const [load, setLoad] = useState(true);
    const [playing, setPlaying] = useState(false);
    const { editNav } = useContext(GlobalContext);
    let history = useHistory();
    const audio = new Audio(buttonTheme);
    audio.preload = 'auto';
    //autoload running after user interact with website, purposed change icon and load state
    useEffect( ()=>{
        const bgAudio = document.getElementById("bgMusicBtn");
        editNav('none');
        setTimeout(() => {
            if(load && bgAudio.currentTime > 0){
                document.getElementById("soundBtn").style.backgroundImage = `url(${unmuteButton})`;
                setPlaying(!playing);
                setLoad(false);
            }
        }, 400);
    },[]);
    //play button
    const play = () => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        setTimeout(() => {
            if(playing){
                handleBgMusicBtn();
            }
            history.replace('/list');
        }, 1000);
    };
    //mute or unmute bg music
    const handleBgMusicBtn = () => {
        if(playing){
            document.getElementById("soundBtn").style.backgroundImage = `url(${muteButton})`;
            document.getElementById("bgMusicBtn").pause();
            document.getElementById("bgMusicBtn").currentTime = 0;
            setPlaying(!playing);
        } else {
            document.getElementById("soundBtn").style.backgroundImage = `url(${unmuteButton})`;
            document.getElementById("bgMusicBtn").play();
            setPlaying(!playing);
        }
        
    }
    return(
        <Background>
            <Cover></Cover>
            <Content>
                <Title>PoKéMoN-io</Title>
                <PlayInput>
                    <Play onClick={play}/>
                </PlayInput>
                <audio id="bgMusicBtn" preload="auto" loop={true} autoPlay={true} style={{display: 'none'}}>
                    <source src={walkTheme} type="audio/mpeg"/>
                </audio>
                <Footer>
                    <SoundButton id="soundBtn" onClick={handleBgMusicBtn}/>
                    <CreditButton id="creditBtn" onClick={() => {const win = window.open("https://github.com/hariolai/pokemon-io", '_blank'); win.focus();}}/>
                </Footer>
            </Content>
        </Background>
    );
}
export default MainMenu;