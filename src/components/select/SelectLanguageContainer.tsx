import React from 'react';
import i18n from '../../i18n/i18n';
import Select from './Select';

export default function SelectLanguageContainer() {
  const languages = ['EN', 'RU'];
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const currentLanguage = localStorage.getItem('i18nextLng') || 'en';

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(`${e.target.value.toLowerCase()}`);
  };

  return <Select options={languages} selectLanguage={onChange} currentLanguage={currentLanguage} />;
}
