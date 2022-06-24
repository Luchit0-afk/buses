import Head from 'next/head'
import FormPassenger from '../../components/Forms/FormPassenger.js'
import { getAllCities } from './../../services/main.js';

export default function BuyATicket({ cities }) {
    return (
        <div>
            <Head>
                <title>Buy a Ticker</title>
                <meta name="description" content="Buses app, i dont know what i want to do" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
            </Head>

            <main className='container'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            Home
                        </a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex ms-auto">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Log in</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Register</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <h1 className="d-flex justify-content-center mt-4 mb-0">
                    Buy a Ticket
                </h1>
                <p className="d-flex justify-content-center text-center fs-6 mx-5">
                    Do you not know how buy a ticket? 
                    {" "}
                    <a className="link-primary">
                        Click here
                    </a>
                </p>

                <FormPassenger cities={cities} />

                <hr />
                <footer className="d-flex justify-content-center text-center mx-5">
                    <p>Test Footer</p>
                </footer>
            </main>
        </div>
    )
}

BuyATicket.getInitialProps = async (ctx) => {
    const res = await getAllCities();
    return { cities: res.cities }
}