import { useLocation } from 'react-router';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { signoutUser } from '../../../store/reducers/userSlice';
import Button from '../../button/Button';
import LinkButton from '../../link/LinkButton';
import SelectLanguageContainer from '../../select/SelectLanguageContainer';
import NavigationItemsGroup from '../NavigationItemsGroup';

export default function AuthorizedUserNavigation() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <NavigationItemsGroup>
      <SelectLanguageContainer />
      {location.pathname === '/' ? (
        <LinkButton path="/main" text="Go to main" />
      ) : (
        <>
          <LinkButton path="/profile" text="Profile" />
          <Button type="button" text="Sign Out" onClick={() => dispatch(signoutUser())} />
        </>
      )}
    </NavigationItemsGroup>
  );
}
