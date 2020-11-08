import './App.css';
import { LoginComponent } from './login/login';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FooterComponent } from './footer/footer';
import { Header } from './header/header'
import { MenuHeader } from './menu-header/menu-header'
import { MensajesRoutes } from './route.js'
import 'primeflex/primeflex.css';

import {ContactosComponent} from './contactos/contactos'

const App = () => (
    <div className="App">
      <Header/>
      <MenuHeader/>
      <MensajesRoutes />
      <ContactosComponent/>
      <FooterComponent/>
    </div>
  )
  
  export default App;
  