import React from 'react';
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { ButtonAddItem } from '../Styled/ButtonAddItem';
import { OrderListItem } from '../Order/OrderListItem';
import { countPrice } from '../Functions/countPrice';
import { addRubSign } from '../Functions/addRubSign';

const AnimationSlide = keyframes`${slideInRight}`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 20;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 100%; 
    background-color: #ffffff;
    overflow: hidden;    
    animation: 0.5s ${AnimationSlide};
    @media screen and (max-width: 720px) {
      padding-top: 36px;
      width: 100%;
    }
`;

const HeadContent = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    font-weight: 400;
    font-size: 30px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .1);
    @media screen and (max-width: 720px) {
      font-size: 18px;
      padding: 0 24px;
      font-weight: 700;
      height: 40px;
    }
`;

const OrderContent = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 10px 10px 30px;
`;

const OrderList = styled.ul`
    overflow-y: auto;
    overflow-x: visible;
`;

const Footer = styled.section`
    display: flex;
    height: 80px;
    padding-left: 30px;
    justify-content: flex-start;
    align-items: center;
    @media screen and (max-width: 720px) {
      padding-left: 24px;
    }
`;

const EmptyOrderList = styled.p`
    font-weight: 300;
    text-align: center;
    width: 100%;
    padding: 50px 0;
`;

const Total = styled.div`
  @media screen and (max-width: 720px) {
    padding-top: 16px;
    font-size: 18px;
  }
`;

export const Cart = ({
                         isCartOpened, setCartOpened,
                         orders, setOrders,
                         setOpenItem,
                         authentication, signIn,
                         setOpenOrderConfirm
                     }) => {

    const deleteItem = index => {
        const newOrders = [...orders];
        newOrders.splice( index, 1 );
        setOrders(newOrders);
    }

    const totalPriceCount = orders.reduce(( result, order ) => (countPrice(order) + result), 0)

    const closeModal = (event) => {
        if (event.target.id === "CartOverlay") {
            setCartOpened(null);
        } else if (event.target.closest(".button-add")) {
            if (authentication) {
                setOpenOrderConfirm(true);
                const timer = setTimeout(() => {
                    setCartOpened(null);
                    clearTimeout(timer);
                }, 200);
            } else {
                signIn(authentication);
            }
        }
    };

    if (!isCartOpened) {
        return null;
    } else {
        return (
            <Overlay id="CartOverlay" onClick={closeModal} >
                <Modal>
                    <HeadContent>
                        <p>Your Order</p>
                    </HeadContent>
                    <OrderContent>
                        {orders.length ? 
                            <OrderList>
                                { orders.map( (order, index) => <OrderListItem
                                    order={order}
                                    key={index}
                                    index={index}
                                    deleteItem={deleteItem}
                                    setOpenItem={setOpenItem}
                                /> ) }
                            </OrderList> :
                            <EmptyOrderList>
                            Order list is empty
                            </EmptyOrderList>}        
                        <Total>
                            <span>Total: </span>
                            <span>{addRubSign(totalPriceCount)}</span>
                        </Total>
                    </OrderContent>
                    <Footer>
                        { orders.length ?
                                <ButtonAddItem disabled={false} className="button-add">
                                Checkout
                                </ButtonAddItem> :
                                <ButtonAddItem disabled={true} className="button-add">
                                Checkout
                                </ButtonAddItem>
                        }
                    </Footer>
                </Modal>
            </Overlay>
        )
    }
};