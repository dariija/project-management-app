import { Route, Routes } from 'react-router-dom';
import Footer from '../footer/Footer';
import HeaderContainer from '../header/HeaderContainer';
import Main from '../main/Main';
import SigninPage from '../pages/signin/SigninPage';
import SignupPage from '../pages/signup/SignupPage';
import WelcomePage from '../pages/welcome/WelcomePage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app_wrapper}>
      <HeaderContainer />
      <Main>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
