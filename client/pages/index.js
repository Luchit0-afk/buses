import Head from 'next/head'
import styles from '../styles/Home.module.css'
import FormPassenger from './../components/FormPassenger.js'
import { getAllCities } from './../services/main.js';
import { Image, Button } from 'antd';

export default function Home({ cities }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Buses App</title>
        <meta name="description" content="Buses app, i dont know what i want to do" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 >
          Welcome to Buses App
        </h1>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed sit amet pulvinar ex. Aenean molestie interdum quam.
          Praesent nec massa eget nulla auctor aliquam. 
          Curabitur auctor luctus tellus ac lobortis.
        </h3>
        <div class="home-buses-images">
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
        </div>
        <div class="home-buttons">
          <Button type="primary">
            Buy a Ticket
          </Button>
        </div>
        <footer>
          <p>Test Footer</p>
        </footer>
      </main> 

      {/* <FormPassenger cities={cities}/> */}
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await getAllCities();
  return { cities: res.cities }
}