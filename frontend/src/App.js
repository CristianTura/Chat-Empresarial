import './App.css';
import Routes from './Routes/Routes';
import {AuthProvider} from './Components/Auth/AuthContext'
function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
