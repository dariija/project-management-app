import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ColumnInfo } from '../../types/types';
import Button, { ButtonStyle } from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import CustomInput from '../custom-form-components/custom-input/CustomInput';
import FormTitle from '../custom-form-components/form-title/FormTitle';
import Form from './Form';

type Props = {
  cancelAction: () => void;
  confirmAction: (title: string) => void;
  formTitle: string;
};

export default function ColumnFormContainer({ cancelAction, confirmAction, formTitle }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<ColumnInfo>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      title: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = ({ title }: { title: string }) => {
    confirmAction(title);
    reset();
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (errors[target.name as keyof ColumnInfo]) {
      clearErrors(target.name as keyof ColumnInfo);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle text={formTitle}></FormTitle>

      <CustomInput
        type="text"
        name="column-title"
        id="column_title"
        label={t('title')}
        register={{ ...register('title', { onChange, required: `${t('provide_title')}` }) }}
        error={errors.title}
      />

      <ButtonGroup>
        <Button type="submit" text={t('confirm')} style={ButtonStyle.confirm_green} />
        <Button
          type="reset"
          text={t('cancel')}
          style={ButtonStyle.cancel_gray}
          onClick={cancelAction}
        />
      </ButtonGroup>
    </Form>
  );
}
