import React from 'react';
import styled from 'styled-components';


// STYLES 



const FooterStyled = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    color: #000000;
    font-weight: 100;
    font-size: 18px;
    background-color: #ffffff;
`;

const InfoBlock = styled.p`
    align-self: center;
    padding-top: 20px;
    height: 20px;
`;


// COMPONENT


export const Footer = () => (
    <FooterStyled>
        <InfoBlock>
            Burger Set. All rights reserved.
        </InfoBlock>
    </FooterStyled>
);