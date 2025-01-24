
import { toast } from 'react-toastify';

import Cookies from "universal-cookie";
import axios from 'axios';
const cookies = new Cookies(null, { path: '/' });


export const logoutUser = async () => {
    try {
        cookies.remove('authToken');
        toast.success('Logout Success👍');
        window.location.reload();
        return true;
    } catch (error) {
        toast.error('Error in Logging out')
        return false;

    }
}
