import React from 'react';
import styled from 'styled-components';

const OptionItems = styled.div`
    padding-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 85px;
    @media screen and (max-width: 720px) {
        height: auto;
        max-height: 140px;
    }
`;

const OptionLabel = styled.label`
    display: flex;    
`;

const OptionCheckbox = styled.input`
`;

const OptionText = styled.p`
    padding-left: 10px;
    font-size: 16px;
    align-items: center;
    @media screen and (max-width: 720px) {
      font-size: 14px;
      padding-left: 5px;
    } 
`;

export const Options = ( {options, checkOptions} ) => {
    return (
        <>
        <OptionItems>
            {options.map( (item, i) => (
                <OptionLabel key={i}>
                    <OptionCheckbox 
                    type="checkbox" 
                    checked={item.checked}
                    onChange={() => checkOptions(i)}
                    />
                    <OptionText>{item.name}</OptionText>
                </OptionLabel>
            ))}
                        
        </OptionItems>
        </>
    )
}