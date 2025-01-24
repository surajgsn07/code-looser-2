import { atom } from 'recoil';

export const userData = atom({   // FOR USER DATA
    key: 'userData',
    default: null,
});

export const openSideBar = atom({  // SIDE BAR 
    key: 'openSideBar',
    default: true,
});
 