import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { useRecoilState } from 'recoil';
import { userData } from './recoil/states';
import {getCookie,removeCookie} from './utils/cookiesApis'
import axiosInstance from './utils/axiosInstance';
import Dashboard from './dashboard/DashboardMain';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
function App() {
   const navigate = useNavigate();
  const [currentUserData, setUserData] = useRecoilState(userData);

  const fetchUserData = async () => {
    try {
      const token = getCookie('authToken')
      if (token) {
        const res = await axiosInstance.get(`/user/verifyauth`)
        // dispatch(setCurrUser(res?.data?.user));
        setUserData(res?.data?.user)
      } else {
        // dispatch(clearCurrUser());
        navigate('/login');
      }
    } catch (error) {
      // dispatch(clearCurrUser());
      setUserData(null);
      removeCookie('authToken');
      console.log(error.response)
      if (error?.response?.data?.expiredSession) {
        alert(error.response.data.message);
      }
      navigate('/login');
      console.log(error);
    }
  }


  useEffect(() => {
    fetchUserData();
  }, []);

    console.log({currentUserData});
  
   
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />}></Route>
      <Route path="/" element={<div><HomePage /></div>} />
      <Route path="/login" element={<div><Login /></div>} />
      <Route path="/signup" element={<div><SignUp /></div>} />
      <Route path="/dashboard" element={<div><Dashboard /></div>} />
      </Routes>
  )
}


export default App