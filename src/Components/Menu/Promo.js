import React from 'react';
import styled from 'styled-components';
import promoImg from '../../img/burgerpromo24.jpg';
import wave from '../../img/wave.svg';


// STYLES


const PromoStyled = styled.div`
    width: 100%;
    height: 500px;
    background-image: url(${promoImg});
    background-attachment: fixed;
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: left -200px top -500px;
    background-color: #160000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    @media screen and (max-width: 720px) {
      height: 360px;
      background-position: center top 10px;
      background-size: 50%;
    }
`;

const PromoText = styled.h1`
    text-align: right;
    width: 700px;
    padding-top: 15%;

    color: #ffffff; 
    font-weight: 700;
    font-size: 56px;
    position: absolute;
    right: 60px;
    top: -50px;
    @media screen and (max-width: 720px) {
      display: none;
    }
`;

const WaveBlock = styled.div`
    width: 100%;
    height: 235px;
    background-image: url(${wave});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    top: 3px;
`;

const MenuText = styled.h2`
    text-align: center;
    padding-top: 180px;

    color: #000000;
    font-weight: 700;
    font-size: 36px;
    @media screen and (max-width: 720px) {
      padding-top: 180px;
      font-size: 28px;
    }
`;


// COMPONENT


export const Promo = () => (
    <PromoStyled id="0">
        <PromoText>
        Taste Most Delicious Burgers in Stockholm!
        </PromoText>
        <WaveBlock>
            <MenuText>
                MENU
            </MenuText>
        </WaveBlock>
    </PromoStyled>
);