import React from 'react';
import styled from 'styled-components';
import logoImg from '../../img/logo/burger1.png';
import personImg from '../../img/person.svg';
import cartImg from '../../img/cart.svg';


// STYLES 


const NavBarStyled = styled.header`
    width: 100%; 
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: #000000;
    position: fixed;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 100;
    @media screen and (max-width: 720px) {
      height: 36px;
    }
`;

const Logo = styled.a`
    cursor: pointer;
    height: 100%;
    width: 132px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 3%;
    background-image: url(${logoImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    @media screen and (max-width: 720px) {
      width: 80px;
    }
    
`;

const NavBarLinks = styled.div`
    display: flex;
    width: 22%;
    padding: 20px 50px;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    @media screen and (max-width: 720px) {
      padding: 0 0;
      width: auto;
    }
`;

const LinkBlock = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    cursor: pointer;        
    transition-duration: 0.5s;
    @media screen and (max-width: 720px) {
      font-size: 14px;
      padding-right: 16px;
    }

    &:hover {
        transform: scale(1.1, 1.1);        
        transition-duration: 0.5s;
    };
`;

const LinkImg = styled.div`
    padding: 0px 10px;
    @media screen and (max-width: 720px) {
      display: none;
    }
`;
 
// COMPONENT


export const NavBar = ({ isCartOpened, setCartOpened, authentication, signIn, signOut, isProfileOpened, setProfileOpened }) => {
    const toggleCart = () => {
        if (isProfileOpened) {
            setProfileOpened(null);
        };
        if (isCartOpened) {
            setCartOpened(null);
        } else {
            setCartOpened('cart');
        }
    };

    const toggleProfile = () => {
        if (isCartOpened) {
            setCartOpened(null);
        };
        if (isProfileOpened) {
            setProfileOpened(null);
        } else {
            setProfileOpened('profile');
        }
    }
    return(
        <NavBarStyled>
            <Logo href="#0"></Logo>
            <NavBarLinks>
                { authentication ?
                    <LinkBlock onClick={toggleProfile}>
                        <LinkImg>
                            <img src={personImg} alt="enter icon"/>
                        </LinkImg>
                        <p className="NavBarText enterLink"><a>Profile</a></p>
                    </LinkBlock> :
                    <LinkBlock onClick={signIn}>
                        <LinkImg>
                            <img src={personImg} alt="enter icon"/>
                        </LinkImg>
                        <p className="NavBarText enterLink"><a>Log In</a></p>
                    </LinkBlock>
                }
                <LinkBlock onClick={toggleCart}>
                    <LinkImg>
                        <img src={cartImg} alt="cart icon"/>
                    </LinkImg>
                    <p className="NavBarText cartLink"><a>Order</a></p>
                </LinkBlock>
            </NavBarLinks>
        </NavBarStyled>
    )
};