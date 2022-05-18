import { useForm } from 'react-hook-form';
import { BoardInfo } from '../../types/types';
import Button from '../button/Button';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
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
        label="Title"
        register={{ ...register('title', { onChange, required: 'Provide title' }) }}
        error={errors.title}
      />

      <CustomTextArea
        name="description"
        id="board_description"
        label="Description"
        register={{ ...register('description', { onChange, required: 'Provide description' }) }}
        error={errors.description}
      />

      <ButtonGroup>
        <Button type="submit" text="Confirm" colour="green" />
        <Button type="button" text="Cancel" colour="gray" onClick={cancelAction} />
      </ButtonGroup>
    </Form>
  );
}
