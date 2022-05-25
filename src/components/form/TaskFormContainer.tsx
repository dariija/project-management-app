import { useForm } from 'react-hook-form';
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
        label="Title"
        register={{ ...register('title', { onChange, required: 'Provide title' }) }}
        error={errors.title}
      />

      <CustomTextArea
        name="task-description"
        id="task_description"
        label="Description"
        register={{ ...register('description', { onChange, required: 'Provide description' }) }}
        error={errors.description}
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
