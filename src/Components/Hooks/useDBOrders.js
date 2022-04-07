import { useState, useEffect } from 'react';

export const useDBOrders = (database) => {
    const [dataOrders, setDataOrders] = useState(null);

    useEffect(() => {
        database.ref('orders').on('value', snapshot => {
            setDataOrders(snapshot.val())
        });
    }, [database]);

    return dataOrders;
}