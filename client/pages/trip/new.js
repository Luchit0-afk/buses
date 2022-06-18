import Head from 'next/head'
import styles from './../../styles/Home.module.css'
import FormTrip from './../../components/FormTrip.js'
import { getAllCities } from './../../services/main.js';

export default function Home({ cities }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Buses App</title>
        <meta name="description" content="Buses app, i dont know what i want to do" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Buses App</a>
        </h1>
      </main>  */}

      <FormTrip cities={cities}/>

      <footer className={styles.footer}>
        Test Footer
      </footer>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await getAllCities();
  return { cities: res.cities }
}