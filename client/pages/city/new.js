import Head from 'next/head'
import FormTrip from '../../components/Forms/FormTrip.js'
import { getAllCreditsCard } from '../../services/main.js'

export default function Home({ creditsCards }) {
  return (
    <div >
      <Head>
        <title>Create City</title>
        <meta name="description" content="Buses app, i dont know what i want to do" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main >
        <h1 >
          Cities
        </h1>
      </main> 

      {/* <FormTrip /> */}

      <footer>
        Test Footer
      </footer>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const creditsCards = await getAllCreditsCard();
  return { creditsCards: creditsCards.creditsCards  }
}