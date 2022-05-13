import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { checkAuth } from '../../store/reducers/userSlice';
import Footer from '../footer/Footer';
import HeaderContainer from '../header/HeaderContainer';
import Main from '../main/Main';
import SigninPage from '../pages/signin/SigninPage';
import SignupPage from '../pages/signup/SignupPage';
import WelcomePage from '../pages/welcome/WelcomePage';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import styles from './App.module.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <div className={styles.app_wrapper}>
        <HeaderContainer />
        <Main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signin" element={<PublicRoute component={<SigninPage />} />} />
            <Route path="/signup" element={<PublicRoute component={<SignupPage />} />} />
            <Route path="/main" element={<PrivateRoute component={<div>Main</div>} />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </>
  );
}

export default App;
