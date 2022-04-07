import React from 'react';
import styled from 'styled-components';
import {addRubSign} from '../Functions/addRubSign';


// STYLES 


const ItemListStyled = styled.ul`
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Item = styled.li`
  position: relative;
    margin-top: 24px;
    width: 32%;
    height: 190px;
    transition: 0.5s;
    background-size: cover;
    background-image: ${(props) => `url(${props.img})`};
    border-radius: 5px;
    @media screen and (max-width: 720px) {
      width: 48%;
      background-position: center;
      height: 160px;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(198, 0, 0, 0) 0%, rgba(198, 0, 0, 0.35) 72.92%, rgba(198, 0, 0, 0.65) 100%);
      border-radius: 5px;
      opacity: 0;
      transition-duration: 0.5s;
    }
    &:hover {
        transition-duration: 0.5s;
        transform: scale(0.975, 0.975);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
      &:before {
        transition-duration: 0.5s;
        opacity: 100%;
        
      }
    }
`;

const ItemName = styled.p`
    color: #ffffff;
    font-weight: 400;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    @media screen and (max-width: 720px) {
      font-size: 18px;
    }
`;

const ItemPrice = styled.p`
    color: #ffffff;
    font-weight: 100;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    @media screen and (max-width: 720px) {
      font-size: 18px;
    }
`;


// COMPONENT

export const ItemList = ({ itemList, setOpenItem }) => (
    <ItemListStyled>
        {itemList.map( item => (
            <Item 
                key={item.id}
                img={item.img}
                onClick={() => setOpenItem(item)}>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{addRubSign(item.price)}</ItemPrice>

            </Item>
        ))}
    </ItemListStyled>
)