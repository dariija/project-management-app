import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BoardInfo } from '../../types/types';
import Button, { ButtonStyle } from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import CustomInput from '../custom-form-components/custom-input/CustomInput';
import CustomTextArea from '../custom-form-components/custom-text-aria/CustomTextArea';
import FormTitle from '../custom-form-components/form-title/FormTitle';
import Form from './Form';

type Props = {
  cancelAction: () => void;
  confirmAction: ({ title, description }: BoardInfo) => void;
  boardData?: BoardInfo;
  formTitle: string;
};

export default function BoardFormContainer({
  boardData = {
    title: '',
    description: '',
  },
  cancelAction,
  confirmAction,
  formTitle,
}: Props) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<BoardInfo>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: boardData,
    criteriaMode: 'all',
  });

  const onSubmit = ({ title, description }: BoardInfo) => {
    if (title != boardData.title || description !== boardData.description) {
      confirmAction({ title, description });
    } else cancelAction();
    reset();
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (errors[target.name as keyof BoardInfo]) {
      clearErrors(target.name as keyof BoardInfo);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle text={formTitle}></FormTitle>

      <CustomInput
        type="text"
        name="title"
        id="board_title"
        label={t('title')}
        register={{ ...register('title', { onChange, required: `${t('provide_title')}` }) }}
        error={errors.title}
      />

      <CustomTextArea
        name="description"
        id="board_description"
        label={t('description')}
        register={{
          ...register('description', { onChange, required: `${t('provide_description')}` }),
        }}
        error={errors.description}
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
