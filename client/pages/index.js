import Head from 'next/head'
import FormPassenger from '../components/Forms/FormPassenger.js'
import Router from 'next/router';
import { getAllCities } from './../services/main.js';
import { Image, Button } from 'antd';

export default function Home({ cities }) {
  return (
    <div >
      <Head>
        <title>Buses App</title>
        <meta name="description" content="Buses app, i dont know what i want to do" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
      </Head>

      <main className='container'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              {/* Ajustar imagen al div */}
              {/* <img src="images/logo.png" className="img-fluid" style={{ "objectFit": "contain"}}/> */}
              Home
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex ms-auto">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" onClick={() => Router.push('/user/login')}>Log in</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => Router.push('/user/register')}>Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <h1 className="d-flex justify-content-center mt-5">
          Welcome to Buses App
        </h1>
        <h3 className="d-flex justify-content-center text-center fs-5 mx-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed sit amet pulvinar ex. Aenean molestie interdum quam.
          Praesent nec massa eget nulla auctor aliquam.
          Curabitur auctor luctus tellus ac lobortis.
        </h3>
        {/* <div classNameName="home-buses-images">
          <Image
            width={200}
            height={200}
            src="images/bus1.jpg"
          />
          <Image
            width={200}
            height={200}
            src="images/bus2.jpg"
          />
          <Image
            width={200}
            height={200}
            src="images/bus3.jpg"
          />
          <Image
            width={200}
            height={200}
            src="images/bus4.jpg"
          />
        </div> */}
        <div className="d-flex justify-content-center text-center mx-5">
          <button 
            type="button" 
            className="btn btn-primary fs-4 my-3"
            onClick={() => Router.push('/passenger/buy-a-ticket')}>
              Buy a Ticket
          </button>
        </div>
        <hr/>
        <footer className="d-flex justify-content-center text-center mx-5">
          <p>Test Footer</p>
        </footer>
      </main>

    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await getAllCities();
  return { cities: res.cities }
}