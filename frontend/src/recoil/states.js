import { atom } from 'recoil';

export const userData = atom({   // FOR USER DATA
    key: 'userData',
    default: null,
});


export const allTeams = atom({   // FOR USER DATA
  key: 'allTeams',
  default: [],
});


export const openSideBar = atom({  // SIDE BAR 
    key: 'openSideBar',
    default: true,
});
 
export const accessedChat = atom({  //  FOR THE CHAT AREA
    key: 'accessedChat', 
    default: localStorage.getItem('accessedChat') ? JSON.parse(localStorage.getItem('accessedChat')) : null,
  });

  export const allChatsMessagesState= atom({
    key: 'allChatsMessagesState', 
    default: [],
  })

 
 

export const onlineUsersState = atom({
  key :'onlineUsersState',
  default:[]
})