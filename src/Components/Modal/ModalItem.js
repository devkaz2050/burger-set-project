import React from 'react';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { ButtonAddItem } from '../Styled/ButtonAddItem';
import { CountItem } from './CountItem';
import { useCount } from '../Hooks/useCount';
import { useOptions } from '../Hooks/useOptions';
import { TotalPrice } from './TotalPrice';
import { Options } from './Options';
import { addRubSign } from '../Functions/addRubSign';

const AnimationFadeIn = keyframes`${fadeIn}`;

const Overlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: 0.5s ${AnimationFadeIn};    
    @media screen and (max-width: 720px) {
      padding-top: 36px;
    }
`;

const Modal = styled.div`
    width: 600px;
    height: 600px; 
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media screen and (max-width: 720px) {
      width: 90%;
      height: 90%;
    }
`;

const BannerWrapper = styled.div`
    height: 200px;
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: 720px) {
      height: 120px;
    }
`;

const Banner = styled.img`
    height: 200px;
    width: 100%;
    object-fit: cover;
    transition: all 0.5s ease-out;
    @media screen and (max-width: 720px) {
      height: 100%;
      background-position: center;
    }

    &:hover {
        transform: scale(1.2);
        transition: all 0.5s ease-out;
    }
`;

const HeadContent = styled.section`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 720px) {
      padding: 18px 24px;
      width: 100%;
      height: auto;
      max-height: 100px;
    }
`;

const MainText = styled.h2`
    padding-left: 30px;
    font-weight: 400;
    font-size: 30px;
    @media screen and (max-width: 720px) {
      padding-left: 0;
      font-size: 24px;
    }
`;

const Price = styled.h2`
    padding-right: 30px;
    font-weight: 400;
    font-size: 30px;
    @media screen and (max-width: 720px) {
      padding-right: 0;
      font-size: 24px;
    }
`;

const DescriptionContent = styled.section`
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 20px;
    max-height: 100px;
    overflow: hidden;
    @media screen and (max-width: 720px) {
      padding: 0 24px;
    }
`;

const Description = styled.p`
    font-weight: 300;
    font-size: 18px;
    @media screen and (max-width: 720px) {
      font-size: 14px;
    }
`;

const OptionContent = styled.section`
    padding: 0px 30px;
    height: auto;
    overflow: hidden;
    @media screen and (max-width: 720px) {
      padding:  0 24px;
      width: 100%;
    } 
`;

const OptionalItems = styled.ul``;

const Footer = styled.section`
    display: flex;
    padding: 0 30px;
    height: auto;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 720px) {
        padding: 0 24px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding: 30px 30px;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: flex-end;
    @media screen and (max-width: 720px) {
      padding: 0px 24px 16px;
    }
`;

export const ModalItem = ({ openItem, setOpenItem, orders, setOrders }) => {

    const counter = useCount(openItem.count);
    const options = useOptions(openItem);
    const isEdit = openItem.index > -1;

    const closeModal = (event) => {
        if (event.target.id === "ModalItemOverlay") {
            setOpenItem(null);
        } else if (event.target.closest(".button-add")) {
            const timer = setTimeout(() => {
                setOpenItem(null);
            }, 200);
        }
    };

    const order = {
        ...openItem,
        count: counter.count,
        options: options.options
    };

    const addToOrder = (event) => {
        setOrders([...orders, order]);
        closeModal(event);
    }

    const editOrder = () => {
        const newOrders = [...orders];
        newOrders[openItem.index] = order;
        setOrders(newOrders);
    }
    return (
        <Overlay id="ModalItemOverlay" onClick={closeModal}>
            <Modal>
                <BannerWrapper>
                    <Banner src={openItem.img}/>
                </BannerWrapper>
                <HeadContent>
                    <MainText>
                        {openItem.name}
                    </MainText>
                    <Price>
                        {addRubSign(openItem.price)}
                    </Price>
                </HeadContent>
                <DescriptionContent>
                    <Description>
                    {openItem.description}
                    </Description>
                </DescriptionContent>
                <OptionContent>
                    <Options {...options}/>
                </OptionContent>
                <Footer>
                    <CountItem {...counter}/>
                    <TotalPrice {...order}/>
                </Footer>
                <ButtonWrapper>
                    <ButtonAddItem className="button-add" onClick={isEdit ? editOrder : addToOrder} >
                        { isEdit ? 'Edit Order' : 'Add to Cart'}
                    </ButtonAddItem>
                </ButtonWrapper>
            </Modal>
        </Overlay>
    )
};