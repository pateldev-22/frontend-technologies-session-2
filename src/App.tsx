import Navbar from './components/navbar'
import HomePage from './Pages/HomePage'
import AppRoutes from './Routes/Approutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
        <Navbar />
        <AppRoutes />
    </Router>
    </>
  )
}

export default App;
