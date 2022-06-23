import { useTranslation } from 'react-i18next';
import LinkButton from '../../link/LinkButton';
import SelectLanguageContainer from '../../select/SelectLanguageContainer';
import NavigationItemsGroup from '../NavigationItemsGroup';

export default function UnauthorizedUserNavigation() {
  const { t } = useTranslation();

  return (
    <NavigationItemsGroup>
      <SelectLanguageContainer />
      <LinkButton path="/signin" text={t('sign_in')}></LinkButton>
      <LinkButton path="/signup" text={t('sign_up')}></LinkButton>
    </NavigationItemsGroup>
  );
}
