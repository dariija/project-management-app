import { useForm } from 'react-hook-form';
import CustomInput from '../../custom-input/CustomInput';
import SigninForm from '../signin/SigninForm';

export type SigninFormInput = {
  login: string;
  password: string;
};

export default function SigninFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SigninFormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      login: '',
      password: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = (data: SigninFormInput) => {
    console.log('submit');
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (errors[target.name as keyof SigninFormInput]) {
      clearErrors(target.name as keyof SigninFormInput);
    }
  };

  return (
    <SigninForm onSubmit={handleSubmit(onSubmit)}>
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
    </SigninForm>
  );
}
