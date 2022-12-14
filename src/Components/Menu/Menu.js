import React from 'react';
import styled from 'styled-components';
import DBMenuBurger from '../DBMenuBurger';
import { ItemList } from './ItemList';
// import { useFetch } from "../Hooks/useFetch";

// STYLES 

const MenuStyled = styled.main`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    background-color: #ffffff;
`;

const ItemBlock = styled.div`
    width: 70%;
    min-height: 600px;
    @media screen and (max-width: 720px) {
      width: 90%;
    }
`;

const ItemTitle = styled.h3`
    padding-top: 3%;
    display: flex;
    justify-content: flex-start;
    color: #000000;
    font-weight: 400;
    font-size: 30px;
    @media screen and (max-width: 720px) {
      font-size: 22px;
      padding-top: 4%;
    }
`;

const PreloaderWrapper = styled.div`
  width: 100%;
  padding: 30px 50px;
  display: flex;
  justify-content: center;
  >p {
    color: rgba(219, 0, 0, 0.9);
    font-weight: 200;
    padding: 50px 0;
  }
`;


// component


export const Menu = ({ setOpenItem, DBMenu }) => {

    return (
        <MenuStyled>
            <ItemBlock>
                {
                    DBMenuBurger ?
                        <>
                            <ItemTitle>Burgers</ItemTitle>
                            <ItemList
                                itemList={DBMenuBurger.burger}
                                setOpenItem={setOpenItem} />
                            <ItemTitle>Drinks</ItemTitle>
                            <ItemList
                                itemList={DBMenuBurger.drinks}
                                setOpenItem={setOpenItem} />
                            <ItemTitle>Snacks</ItemTitle>
                            <ItemList
                                itemList={DBMenuBurger.snacks}
                                setOpenItem={setOpenItem} />
                        </> :
                        // <PreloaderWrapper>
                        //     <p>Возможно, на сервере произошла ошибка...<br/>Попробуйте перезагрузить страницу</p>
                        // </PreloaderWrapper>
                        // :
                        <PreloaderWrapper>
                            <div className="lds-facebook">
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </PreloaderWrapper>
                }
            </ItemBlock>
        </MenuStyled>
    )
};
