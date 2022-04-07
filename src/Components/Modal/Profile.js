import React from 'react';
import { slideInRight, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { ButtonAddItem } from '../Styled/ButtonAddItem';
import {PreviousOrders} from "../Order/PreviosOrders";

const AnimationSlide = keyframes`${slideInRight}`;

const Overlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
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
    z-index: 21;
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
    margin-top: 60px;
    font-weight: 400;
    font-size: 30px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .1);
    @media screen and (max-width: 720px) {
      font-size: 18px;
      padding: 0 24px;
      font-weight: 700;
      height: 40px;
      margin-top: 0;
    }
`;

const InfoContent = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 71.5%;
`;

const ProfileHeadingInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const ProfileImg = styled.img`
  height: 64px;
  width: auto;
  background-size: contain;
  border-radius: 50%;
  margin-right: 24px;
`;

const UserName = styled.h3``;

const ProfileInfo = styled.section`
  margin-left: 12px;
  margin-top: 24px;
  width: 100%;
  max-height: 90%;
  overflow: auto;
  >.profile-info-heading {
    font-size: 18px;
    padding-bottom: 5px;
    >span {
      font-size: 14px;
      color: #626262;
    }
  }
  >hr {
    height: 3px;
    border: none;
    border-radius: 50%;
    background-color: rgba(200, 200, 200, 0.3);
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

export const Profile = ({ isProfileOpened, setProfileOpened, authentication, signOut, DBOrders }) => {
    const closeModal = (event) => {
        if (event.target.id === "ProfileOverlay") {
            setProfileOpened(null);
        } else if (event.target.closest(".button-exit")) {
            const timer = setTimeout(() => {
                setProfileOpened(null);
                signOut();
                clearTimeout(timer);
            }, 200);
        }
    };

    const getOrders = () => {
        const uid = authentication.uid;
        let userOrderList = [];
        for (let element in DBOrders) {
            if (DBOrders[element].userID == uid) {
                userOrderList.push(DBOrders[element])
            }
        }
         return userOrderList
    }

    if (!isProfileOpened) {
        return null
    } else {
        return(
            <Overlay id="ProfileOverlay" onClick={closeModal} >
                <Modal>
                    <HeadContent>
                        <p>Ваш профиль</p>
                    </HeadContent>
                    <InfoContent>
                        <ProfileHeadingInfo>
                            <ProfileImg src={authentication.photoURL}/>
                            <UserName>{authentication.displayName}</UserName>
                        </ProfileHeadingInfo>
                        <ProfileInfo>
                            <p className="profile-info-heading">Адрес электронной почты:
                                <br/>
                                <span>{authentication.email}</span>
                            </p>
                            <hr/>
                            <p className="profile-info-heading">Номер телефона:
                                <br/>
                                <span>{authentication.phoneNumber || 'Не указан'}</span>
                            </p>
                            <hr/>
                            <div className="profile-info-heading">Заказы:
                                <br/>
                                {
                                    getOrders().length ?
                                        <PreviousOrders
                                            itemList={getOrders()}
                                        /> :
                                        <p>Вы еще не совершали заказов</p>
                                }

                            </div>
                        </ProfileInfo>
                    </InfoContent>
                    <Footer>
                        <ButtonAddItem className="button-exit" onClick={closeModal}>
                            Выйти
                        </ButtonAddItem>
                    </Footer>
                </Modal>
            </Overlay>
        );
    }
}