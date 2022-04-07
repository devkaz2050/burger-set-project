import { useState } from 'react';

export function useProfileOpen() {
    const [ isProfileOpened, setProfileOpened ] = useState(null);
    return { isProfileOpened, setProfileOpened };
}