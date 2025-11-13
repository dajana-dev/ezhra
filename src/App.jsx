import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import Toolbar from './components/Toolbar';
import JobList from './components/JobList';
import './styles/App.scss';
import { useTheme } from './store/themeStore';

const App = () => {

  const {theme} = useTheme();

  return (
    <div id='app' className={theme === 'dark' ? 'dark' : 'light'}>
      <Header />
      <Sidebar />
      <MainSection>
        <Toolbar />
        <JobList />
      </MainSection>
    </div>
  );
};

export default App;
