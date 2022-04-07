import React from 'react';
import styled from 'styled-components';
import {ProfileOrderItems} from "./ProfileOrderItems";

const Wrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, .1);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 8px 0;
  padding: 5px 10px;
`;
const OrderDate = styled.p`
  width: 50%;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: #626262;
  margin-bottom: 10px;
`;
const OrderTotalPrice = styled.p`
  width: 50%;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  color: #626262;
  margin-bottom: 10px;
`;

export const PreviousOrders = ({ itemList }) => (
    itemList.map( (item, index) => (
        <Wrapper key={index+'customerProfileOrder'}>
            <OrderDate>{item.date}</OrderDate>
            <OrderTotalPrice>{item.totalPrice}</OrderTotalPrice>
            <ProfileOrderItems itemList={item.order}/>
        </Wrapper>
    ))
)