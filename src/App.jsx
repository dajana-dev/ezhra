import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import Toolbar from './components/Toolbar';
import './styles/App.scss';
import { useTheme } from './store/themeStore';
import { Outlet } from 'react-router-dom';
import Modal from './components/Modal';

const App = () => {

  const {theme} = useTheme();

  console.log("App rendering");

  return (
    <div id='app' className={theme === 'dark' ? 'dark' : 'light'}>
      <Header />
      <Sidebar />
      <MainSection>
        <Toolbar />
        <Outlet />
      </MainSection>
      <Modal />
    </div>
  );
};

export default App;
