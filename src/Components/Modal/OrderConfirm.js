import React from "react";
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { ButtonAddItem } from "../Styled/ButtonAddItem";
import {countPrice} from "../Functions/countPrice";
import {addRubSign} from "../Functions/addRubSign";
import {projection} from "../Functions/databaseProjection";

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

const HeadContent = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    font-weight: 400;
    font-size: 30px;
    margin-top: 60px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .1);
    @media screen and (max-width: 720px) {
      font-size: 18px;
      padding: 0 24px;
      font-weight: 700;
      height: 40px;
    }
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

const Total = styled.div`
  padding-left: 30px;
  @media screen and (max-width: 720px) {
    padding-top: 16px;
    font-size: 18px;
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
  animation: 0.5s ${AnimationSlide};
  @media screen and (max-width: 720px) {
    padding-top: 36px;
    width: 100%;
  }
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 80%;
  padding: 20px 30px;
  >hr {
    height: 2px;
    background: #626262;
  }
  >p {
    padding: 5px 0;
    font-weight: 400;
  }
  >div {
    border: none;
    padding: 5px 15px;
    min-height: 36px;
    max-height: 86px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 200;
    color: #626262;
    overflow: auto;
    background-color: #e5e5e5;
    transition: 0.5s ease-in;
    :active, :focus {
      border: none;
      outline: none;
      background-color: #c5c5c5;
      transition: 0.5s ease-in;
    }
  }
`;

export const OrderConfirm = ({
    orders, setOrders,
    authentication,
    setOpenOrderConfirm,
    dataBase
                             }) => {

    const totalPriceCount = orders.reduce(( result, order ) => (countPrice(order) + result), 0);
    let address = '';

    const rulesDatabase = {
        name: ['name'],
        price: ['price'],
        count: ['count'],
        options: ['options', item => item ? item.filter(obj => obj.checked).map(obj => obj.name) : 'no options'],
    }

    const sendOrder = () => {
        const newOrder = orders.map(projection(rulesDatabase));
        console.log(newOrder)
        Object.keys(newOrder).map(key => {
            const optionsCount = newOrder[key].options.length;
            const optionsPrice =  newOrder[key].price * 0.1 * optionsCount;
            newOrder[key].price = newOrder[key].price * newOrder[key].count + optionsPrice;
        })
        const customerName = document.getElementById('userName').textContent.trim();
        const customerEmail = document.getElementById('userMail').textContent.trim();
        const customerPhone = document.getElementById('userPhone').textContent.trim();
        const currentDate = new Date().toLocaleString('ru');
        const price = addRubSign(totalPriceCount);
        const userID = authentication.uid;
        address = document.getElementById('userAddress').textContent.trim();
        dataBase.ref('orders').push().set({
            'userID': userID,
            'customerName': customerName,
            'customerEmail': customerEmail,
            'customerPhone': customerPhone,
            'customerAddress': address,
            'order': newOrder,
            'date': currentDate,
            'totalPrice': price
        })
        setOrders([]);
        setOpenOrderConfirm(false);


    }

    const checkOrder = () => {
        const userAddress = document.getElementById('userAddress');
        const userMail = document.getElementById('userMail');
        const userPhone = document.getElementById('userPhone');
        if (userAddress.textContent.trim() && userMail.textContent.trim() && userPhone.textContent.trim()) {
            sendOrder()
        } else {
            alert('Пожалуйста, заполните все поля')
        }
    }

    const closeModal = (event) => {
        if (!event.target.closest('#orderConfirmModal')) {
            setOpenOrderConfirm(false)
        }
    }



    return (
        <Overlay onClick={closeModal}>
            <Modal id='orderConfirmModal'>
                <HeadContent>
                    <p>Подтверждение заказа</p>
                </HeadContent>
                <OrderDetails>
                    <p>Имя получателя: </p>
                    {
                        authentication.displayName ?
                            <div id='userName' >{authentication.displayName}</div> :
                            <div contentEditable={true} id='userName' placeholder='Не указан'/>
                    }
                    <hr/>
                    <p>E-mail получателя: </p>
                    {
                        authentication.email ?
                            <div id='userMail' >{authentication.email}</div>:
                            <div contentEditable={true} id='userMail' placeholder='Не указан'/>
                    }
                    <hr/>
                    <p>Телефон получателя: </p>
                    {
                        authentication.phoneNumber ?
                            <div id='userPhone' >{authentication.phoneNumber}</div>:
                            <div contentEditable={true} id='userPhone' placeholder='Не указан'/>
                    }
                    <hr/>
                    <p>Адрес получателя: </p>
                    {
                        address ?
                            <div id='userAddress' >{address}</div>:
                            <div contentEditable={true} id='userAddress' placeholder='Не указан'/>
                    }

                </OrderDetails>
                <Total>
                    <span>Итого: </span>
                    <span>{addRubSign(totalPriceCount)}</span>
                </Total>
                <Footer>
                    <ButtonAddItem onClick={checkOrder}>
                        Подтвердить заказ
                    </ButtonAddItem>
                </Footer>
            </Modal>
        </Overlay>
    )


}