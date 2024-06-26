import { createBrowserRouter } from 'react-router-dom';

/* ------------------------------ Import pages ------------------------------ */
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])