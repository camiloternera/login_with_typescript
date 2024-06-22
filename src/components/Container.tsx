import { Toaster } from 'react-hot-toast';

/* ------------------------------ Import styles ----------------------------- */
import style from './../index.module.css';

interface AppProps {
    children: React.ReactNode;
}

export const ContainerMain = (props: AppProps) => {
    return (
        <main className={style.main}>
            { props.children }
            <Toaster />
        </main>
    );
}
