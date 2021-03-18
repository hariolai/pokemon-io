import React from 'react';
import pokeButton from '../../assets/images/icons/pokebutton.png';
import styled from '@emotion/styled';

const ListWraper = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 15px;
    margin-top: 30px;
    min-height: 80px;
    color: white;
    cursor: pointer;
    @media screen and (min-width: 1200px){
        margin-left: 50px;
        margin-right: 50px;
    }
`;
const PokeImage = styled.img`
    margin-top: -15px;
    border: 2px solid white;
    border-radius: 10px;
    margin-left: 15px;
    width: 70px;
    display: inline-block;
    @media screen and (min-width: 1200px){
        margin-left: 50px;
    }
`;
const TextWrapper = styled.div`
    display: inline-block;
    vertical-align: top;
    margin-left: 25px;
    @media screen and (min-width: 1200px){
        margin-left: 25px;
    }
`;
const PokeRemove = styled.div`
    background-image: url(${pokeButton});
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
    display: inline-block;
    z-index: 10;
    @media screen and (min-width: 1200px){
        margin-left: 25px;
    }
`;
const PokeName = styled.h3`
    margin-top: 5px;
`;
const PokeOwned = styled.p`
    margin-top: 10px;
`;

const List = (props) => {
    const bg = (props.pos % 2 === 0) ? 'linear-gradient(to right, rgba(42, 117, 187), rgba(118, 171, 219))' : 'linear-gradient(to right, rgba(255, 197, 5), rgba(255, 222, 112))';
    return(
        <ListWraper style={{backgroundImage: bg}} onClick={props.onClick}>
            <PokeImage src={props.image}/>
            <TextWrapper>
                <PokeName>{props.name}</PokeName>
                <PokeOwned>{props.other}</PokeOwned>
            </TextWrapper>
            {
                props.type === "myList" ? <PokeRemove id={props.id} onClick={props.onRemove}></PokeRemove> : null
            }
        </ListWraper>
    );
};

export default List;