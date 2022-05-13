import { useForm } from 'react-hook-form';
import SignupForm from './SignupForm';
import CustomInput from '../../custom-input/CustomInput';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { clearUserAuthError, fetchSignupUser } from '../../../store/reducers/userSlice';
import Loader from '../../loader/Loader';
import Notification from '../../notification/Notification';
import { useEffect } from 'react';
import { SignupFormInput } from '../../../types/types';

export default function SignupFormContainer() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

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

  const onSubmit = ({ name, login, password }: SignupFormInput) => {
    dispatch(fetchSignupUser({ name, login, password }));
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (errors[target.name as keyof SignupFormInput]) {
      clearErrors(target.name as keyof SignupFormInput);
    }
  };

  useEffect(() => {
    return () => {
      if (error) dispatch(clearUserAuthError());
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Notification text={error} />}
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
    </>
  );
}
