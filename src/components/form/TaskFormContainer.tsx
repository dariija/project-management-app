import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ColumnInfo, TaskInfo } from '../../types/types';
import Button, { ButtonStyle } from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import CustomInput from '../custom-form-components/custom-input/CustomInput';
import CustomTextArea from '../custom-form-components/custom-text-aria/CustomTextArea';
import FormTitle from '../custom-form-components/form-title/FormTitle';
import Form from './Form';

type Props = {
  cancelAction: () => void;
  confirmAction: (title: string, description: string) => void;
  formTitle: string;
};

export default function TaskFormContainer({ cancelAction, confirmAction, formTitle }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<TaskInfo>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = ({ title, description }: { title: string; description: string }) => {
    confirmAction(title, description);
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
        name="task-title"
        id="task_title"
        label={t('title')}
        register={{ ...register('title', { onChange, required: `${t('provide_title')}` }) }}
        error={errors.title}
      />

      <CustomTextArea
        name="task-description"
        id="task_description"
        label={t('description')}
        register={{
          ...register('description', { onChange, required: `${t('provide_description')}` }),
        }}
        error={errors.description}
      />

      <ButtonGroup>
        <Button type="submit" text={t('confirm')} style={ButtonStyle.confirm_green} />
        <Button
          type="button"
          text={t('cancel')}
          style={ButtonStyle.cancel_gray}
          onClick={cancelAction}
        />
      </ButtonGroup>
    </Form>
  );
}
