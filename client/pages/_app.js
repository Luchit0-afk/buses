import { UserProvider } from "./../config/context/UserContext.js";
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return ( 
      <UserProvider>
        <Component {...pageProps} /> 
      </UserProvider>
    )
}

export default MyApp;