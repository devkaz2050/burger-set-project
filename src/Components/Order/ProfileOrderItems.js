import React from 'react';
import styled from 'styled-components';
import {addRubSign} from "../Functions/addRubSign";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ItemWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  >span {
    padding: 5px 0;
  }
`;


const OptionsWrapper = styled.div`
    width: 100%;
    height: 36px;
    font-size: 12px;
    font-weight: 100;
    color: #656565;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-bottom: 10px;
    margin-top: -5px;
`;

const OptionsList = styled.p`
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const getItemOptions = (options) => {
    const optionStr = options.map(item => item).join(', ');
    if (optionStr) {
        return (
            <OptionsWrapper>
                <p>Дополнительно: </p>
                <OptionsList>{optionStr}</OptionsList>
            </OptionsWrapper>
        )
    } else {
        return '';
    }
}

export const ProfileOrderItems = ({itemList} ) => (
    itemList.map( (item, index) => (
            <Wrapper key={index+'customerOrderProfilePosition'}>
                <ItemWrapper>
                    <span className="order-name">{item.name}</span>
                    <span className="order-count">{item.count}</span>
                    <span className="order-price">{addRubSign(item.price)}</span>
                </ItemWrapper>
                {item.options ? getItemOptions(item.options) : ''}
            </Wrapper>
    ))
)
