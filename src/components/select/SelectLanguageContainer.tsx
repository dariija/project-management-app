import Select from './Select';

export default function SelectLanguageContainer() {
  const languages = ['EN', 'RU'];

  return <Select options={languages} />;
}
