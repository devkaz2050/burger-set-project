import { useState, useEffect } from 'react';

export const useDBMenu = (database) => {
    const [ dataMenu, setDataMenu ] = useState(null);

    useEffect(() => {
        database.ref('goods').on('value', snapshot => {
            setDataMenu(snapshot.val())
        });
    }, [database]);

    return dataMenu

}