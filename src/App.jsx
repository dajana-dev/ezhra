import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import './styles/App.scss';
import { useTheme } from './store/themeStore';
import { Outlet } from 'react-router-dom';
import Modal from './components/Modal';
import { useEffect } from 'react';

const App = () => {

  const {theme} = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div id='app'>
      <Header />
      <Sidebar />
      <MainSection>
        <Outlet />
      </MainSection>
      <Modal />
    </div>
  );
};

export default App;
