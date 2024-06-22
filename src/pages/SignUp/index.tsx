import {FormEventHandler, useState} from 'react';

/* ----------------------------- Import library ----------------------------- */
import toast from 'react-hot-toast';

/* ---------------------------- Import components --------------------------- */
import {ContainerMain} from '../../components/Container';

/* ------------------------------ Import utils ------------------------------ */
import { LOCAL_KEYS } from '../../utils/enums';

/* ------------------------------ Import style ------------------------------ */
import style from './signup.module.css';

export const SignUp = () => {
    /* -------------------------------- useState -------------------------------- */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmdPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /* ------------------------------ All requests ------------------------------ */
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            if (!email.includes('@') || !email.includes('.')) toast.error('Invalid email');
            if (password.length < 6) toast.error('Password must be at least 6 characters');
            if (password !== confirmPassword) toast.error('Passwords do not match');

            // Here you can add the request to your API
            if (email && password && confirmPassword) {
                const ID = Math.floor(Math.random() * 1000); // Generate ID
                localStorage.setItem(LOCAL_KEYS.ID, ID.toString());
                localStorage.setItem(LOCAL_KEYS.EMAIL, email);
                localStorage.setItem(LOCAL_KEYS.PASSWORD, password);
                localStorage.setItem(LOCAL_KEYS.CREATEDATEAT, new Date().toISOString());
                localStorage.setItem(LOCAL_KEYS.UPDATEDATEAT, new Date().toISOString());
                toast.success('Account created successfully');

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ContainerMain>
            <form className={style.form} onSubmit={handleSubmit}>
                <h1 className={style.titleSignUp}>Create an account</h1>
                <div className={style.signIn}>
                    <p className={style.alreadySignIn}>Already have an account?</p>
                    <a href='/'>Sign in</a>
                </div>
                <div className={style.containerForm}>
                    <input className={style.input} type='email' placeholder='Email address' value={email} onChange={({target: {value}}) => setEmail(value)} />
                    <input className={style.input} type='password' placeholder='Password' value={password} onChange={({target: {value}}) => setPassword(value)} />
                    <input className={style.input} type='password' placeholder='Confirm password' value={confirmPassword} onChange={({target: {value}}) => setConfirmdPassword(value)} />
                    <button className={style.button} type='submit'>Create account</button>
                </div>
            </form>
        </ContainerMain>
    );
};
