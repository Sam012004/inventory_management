
import { useState } from 'react';
import './App.css';
import { Login } from './Views/Login';
import { Register } from './Views/Register';

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="App">
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
}

export default App;
