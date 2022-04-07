import React from 'react';
import styled from 'styled-components';
import Delete from '../../img/delete.png';
import { addRubSign } from '../Functions/addRubSign';
import { countPrice } from '../Functions/countPrice';

const OrderListItemBlock = styled.li`
    margin-bottom: 15px; 
    padding: 10px 10px;
    min-height: 50px;
    width: 98%;
    border-radius: 5px;    
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, .1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    @media screen and (max-width: 720px) {
      width: 100%;
    }
`;

const ItemWrapper = styled.section`
    width: 90%; 
    display: flex;
    justify-content: stretch;
    align-items: center;
    >span {
      @media screen and (max-width: 720px) {
        font-size: 18px;
      }
    }
`;

const DeleteIcon = styled.button`
    width: 14px;
    height: 14px;
    background-color: transparent;
    background-image: url(${Delete});
    background-position: center;
    transition-duration: 0.5s;  
    background-size: contain;
    background-repeat: no-repeat;
    outline: none; 
    cursor: pointer; 
    border: none;

    &:hover {       
        transition-duration: 0.5s;        
        border-color: transparent;
    };

    &:focus {      
        transition-duration: 0.5s;
        box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, .2);
        border: none;
    }
`;

const OptionsWrapper = styled.div`
    margin-top: 8px;
    width: 100%;
    height: 36px;
    font-size: 12px;
    font-weight: 100;
    color: #656565;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
`;

const OptionsList = styled.p`
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;


export const OrderListItem = ({ order, index, deleteItem, setOpenItem }) => {
    const getItemOptions = (options) => {
        const optionStr = options.filter(item => item.checked).map(item => item.name).join(', ');
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
    return (
        <OrderListItemBlock onClick={(event) => {
            event.target.closest('.delete-icon') ?
                deleteItem(index) :
                setOpenItem({...order, index})
        }}>
            <ItemWrapper>
                <span className="order-name">{order.name}</span>
                <span className="order-count">{order.count}</span>
                <span className="order-price">{addRubSign(countPrice(order))}</span>
            </ItemWrapper>
            <DeleteIcon className="delete-icon" onClick={() => { deleteItem(index) }}/>
            {getItemOptions(order.options)}
        </OrderListItemBlock>
    )
};