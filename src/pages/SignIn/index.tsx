import {FormEventHandler, useState} from 'react';

/* ----------------------------- Import library ----------------------------- */
import toast, {Toaster} from 'react-hot-toast';

/* ---------------------------- Import components --------------------------- */
import { ContainerMain } from '../../components/Container';

/* ------------------------------ Import utils ------------------------------ */
import { generateToken } from '../../utils/generateToken';
import { LOCAL_KEYS } from '../../utils/enums';

/* ------------------------------ Import styles ----------------------------- */
import style from './signin.module.css';

interface SignInProps {}

export const SignIn: React.FC = (props: SignInProps) => {
    /* -------------------------------- useState -------------------------------- */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /* ------------------------------ All Requests ------------------------------ */
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (!email.includes('@') || !email.includes('.')) toast.error('Invalid email');
            if (password.length < 6) toast.error('Password must be at least 6 characters');

            // Here you can add the request to your API
            if (email && password) {
                // Validate user
                if (!localStorage.getItem(LOCAL_KEYS.ID))
                    toast.error('User not found');

                const ID = Number(localStorage.getItem(LOCAL_KEYS.ID)) || 0;

                // Validate email
                if (!(email === localStorage.getItem(LOCAL_KEYS.EMAIL)))
                    toast.error('Email not found');
                // Validate password
                if (!(password === localStorage.getItem(LOCAL_KEYS.PASSWORD)))
                    toast.error('Password incorrect');

                // If the email and password are correct, you can generate the token
                const TOKEN = generateToken({ id: ID, username: email }); // Generate token
                console.log("🚀 ~ TOKEN:", TOKEN)
                localStorage.setItem(LOCAL_KEYS.TOKEN, TOKEN);
                toast.success('Login successful');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerMain>
            <form className={style.form} onSubmit={handleSubmit}>
                <h1 className={style.titleSignIn}>Sign in to your account</h1>
                <div className={style.divInput}>
                    <input className={style.input} type='email' placeholder='Email address' value={email} onChange={({target: {value}}) => setEmail(value)} />
                    <input className={style.input} type='password' placeholder='Password' value={password} onChange={({target: {value}}) => setPassword(value)} />
                </div>
                <button className={style.button} type='submit'>
                    Sign in
                </button>
                <div className={style.containerRemember}>
                    <label className={style.checkRemember}>
                        <input className={style.inputCheck} type='checkbox' />
                        Remember me
                    </label>
                    <div>
                        <a href='/forgot-password'>Forgot password?</a>
                    </div>
                </div>
                <div className={style.footerForm}>
                    <p>Don't have an account?</p>
                    <a href='/signup'>Sign up</a>
                </div>
            </form>
        </ContainerMain>
    );
};
