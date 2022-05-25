import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
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
        label="Title"
        register={{ ...register('title', { onChange, required: 'Provide title' }) }}
        error={errors.title}
      />

      <ButtonGroup>
        <Button type="submit" text="Confirm" style={ButtonStyle.confirm_green} />
        <Button
          type="button"
          text="Cancel"
          style={ButtonStyle.cancel_gray}
          onClick={cancelAction}
        />
      </ButtonGroup>
    </Form>
  );
}
