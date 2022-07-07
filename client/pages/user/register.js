import Head from 'next/head';
import Navigator from './../../components/commons/Navigator.js';
import Register from '../../components/Forms/Register.js';

export default function RegisterPage() {
    return (
        <div>
            <Head>
                <title>Buy a Ticker</title>
                <meta name="description" content="Buses app, i dont know what i want to do" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
            </Head>

            <main className='container'>
                <Navigator />
                <h1 className="d-flex justify-content-center my-4 ">
                    Register
                </h1>
                <Register />
                <hr />
                <footer className="d-flex justify-content-center text-center mx-5">
                    <p>Test Footer</p>
                </footer>
            </main>
        </div>
    )
}