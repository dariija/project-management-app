import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/hooks';
import { checkAuth } from '../../store/reducers/userSlice';
import Footer from '../footer/Footer';
import HeaderContainer from '../header/HeaderContainer';
import Loader from '../loader/Loader';
import Main from '../main/Main';
import NotFound from '../pages/not-found/NotFound';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import styles from './App.module.css';

const SigninPage = lazy(() => import('../pages/signin/SigninPage'));
const SignupPage = lazy(() => import('../pages/signup/SignupPage'));
const MainPageContainer = lazy(() => import('../pages/main/MainPageContainer'));
const WelcomePage = lazy(() => import('../pages/welcome/WelcomePage'));
const BoardPageContainer = lazy(() => import('../pages/board/BoardPageContainer'));

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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signin" element={<PublicRoute component={<SigninPage />} />} />
              <Route path="/signup" element={<PublicRoute component={<SignupPage />} />} />
              <Route path="/main" element={<PrivateRoute component={<MainPageContainer />} />} />
              <Route
                path="/board/:id"
                element={<PrivateRoute component={<BoardPageContainer />} />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Main>
        <Footer />
      </div>
    </>
  );
}

export default App;
