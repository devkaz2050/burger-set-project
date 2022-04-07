import React from 'react';
import { NavBar } from './Components/NavBar/NavBar';
import { Promo } from './Components/Menu/Promo';
import { Menu } from './Components/Menu/Menu';
import { Footer } from './Components/Footer/Footer';
import { ModalItem } from './Components/Modal/ModalItem';
import { Cart } from './Components/Modal/Cart';
import { Profile } from './Components/Modal/Profile';
import { GlobalStyle } from './Components/Styled/GlobalStyle';
import { useOpenItem } from './Components/Hooks/useOpenItem';
import { useCartOpen } from './Components/Hooks/useCartOpen';
import { useOrders } from './Components/Hooks/useOrders';
import { useAuth } from "./Components/Hooks/useAuth";
import { useProfileOpen } from "./Components/Hooks/isProfileOpen";
import { useTitle } from "./Components/Hooks/useTitle";
import { useDBMenu } from "./Components/Hooks/useDBMenu";
import { useDBOrders } from "./Components/Hooks/useDBOrders";
import { useOrderConfirm } from "./Components/Hooks/useOrderConfirm";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {OrderConfirm} from "./Components/Modal/OrderConfirm";

const firebaseConfig = {
    apiKey: "AIzaSyCp6QWy_Iv3YUZ-ffRt4u0b_gScjz3CjGk",
    authDomain: "bullko-bugers.firebaseapp.com",
    databaseURL: "https://bullko-bugers-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bullko-bugers",
    storageBucket: "bullko-bugers.appspot.com",
    messagingSenderId: "731495543864",
    appId: "1:731495543864:web:6f5c172226104f91b162cd",
    measurementId: "G-1TKV2BWKPQ"
};

firebase.initializeApp(firebaseConfig);

function App() {

  const auth = useAuth(firebase.auth);

  const openItem = useOpenItem();
  const openCart = useCartOpen();
  const openProfile = useProfileOpen();
  const orders = useOrders();
  const dataBase = firebase.database();
  const DBMenu = useDBMenu(dataBase);
  const DBOrders = useDBOrders(dataBase);
  const orderConfirm = useOrderConfirm();


  useTitle(openItem.openItem);

  return (
    <>
      <GlobalStyle/>
      { orderConfirm.openOrderConfirm &&
          <OrderConfirm
              {...orders}
              {...auth}
              {...orderConfirm}
              dataBase={dataBase}
          />
      }
      <Cart
          {...openCart}
          {...orders}
          {...openItem}
          {...auth}
          {...orderConfirm}
      />
      { openItem.openItem &&
      <ModalItem
          {...openItem}
          {...orders}
      /> }
      <Profile
          {...openProfile}
          {...auth}
          DBOrders={DBOrders}
      />
      <NavBar
          {...openCart}
          {...auth}
          {...openProfile}
      />
      <Promo/>
      <Menu
          {...openItem}
          DBMenu={DBMenu}
      />
      <Footer/>
    </>
  )
}

export default App