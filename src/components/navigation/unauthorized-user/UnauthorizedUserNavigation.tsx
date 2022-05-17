import LinkButton from '../../link/LinkButton';
import SelectLanguageContainer from '../../select/SelectLanguageContainer';
import NavigationItemsGroup from '../NavigationItemsGroup';

export default function UnauthorizedUserNavigation() {
  return (
    <NavigationItemsGroup>
      <SelectLanguageContainer />
      <LinkButton path="/signin" text="Sign in"></LinkButton>
      <LinkButton path="/signup" text="Sign up"></LinkButton>
    </NavigationItemsGroup>
  );
}
