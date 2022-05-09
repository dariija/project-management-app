import { useForm } from 'react-hook-form';
import SignupForm from './SignupForm';
import CustomInput from '../../custom-input/CustomInput';

export type SignupFormInput = {
  name: string;
  login: string;
  password: string;
};

export default function SignupFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SignupFormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = (data: SignupFormInput) => {
    console.log('submit');
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (errors[target.name as keyof SignupFormInput]) {
      clearErrors(target.name as keyof SignupFormInput);
    }
  };

  return (
    <SignupForm onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        name="name"
        id="name"
        label="Name"
        register={{ ...register('name', { onChange, required: 'Provide name' }) }}
        error={errors.name}
      />

      <CustomInput
        type="text"
        name="login"
        id="login"
        label="Login"
        register={{ ...register('login', { onChange, required: 'Provide login' }) }}
        error={errors.login}
      />

      <CustomInput
        type="password"
        name="password"
        id="password"
        label="Password"
        register={{ ...register('password', { onChange, required: 'Provide password' }) }}
        error={errors.password}
      />
    </SignupForm>
  );
}
