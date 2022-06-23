import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { signoutUser } from '../../../store/reducers/userSlice';
import Button, { ButtonStyle } from '../../button/Button';
import LinkButton from '../../link/LinkButton';
import SelectLanguageContainer from '../../select/SelectLanguageContainer';
import NavigationItemsGroup from '../NavigationItemsGroup';

export default function AuthorizedUserNavigation() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <NavigationItemsGroup>
      <SelectLanguageContainer />
      {location.pathname === '/' ? (
        <LinkButton path="/main" text={t('to_main')} />
      ) : (
        <>
          <LinkButton path="/profile" text={t('profile')} />
          <Button
            type="button"
            text={t('sign_out')}
            style={ButtonStyle.nav_pink}
            onClick={() => dispatch(signoutUser())}
          />
        </>
      )}
    </NavigationItemsGroup>
  );
}
