import { useState } from 'react';

export function useCartOpen() {
    const [ isCartOpened, setCartOpened ] = useState(null);
    return { isCartOpened, setCartOpened };
}