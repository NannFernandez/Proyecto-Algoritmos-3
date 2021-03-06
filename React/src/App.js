import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FooterComponent } from './footer/footer';
import { MensajesRoutes } from './route.js'
import 'primeflex/primeflex.css'

const App = () => (
    <div className="App">
      <MensajesRoutes />
      <FooterComponent/>
    </div>
  )

  export default App