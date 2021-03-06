import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { clearUserAuthError, fetchSigninUser } from '../../../store/reducers/userSlice';
import CustomInput from '../../custom-form-components/custom-input/CustomInput';
import Loader from '../../loader/Loader';
import SigninForm from '../signin/SigninForm';
import Notification from '../../notification/Notification';
import { useEffect } from 'react';
import { SigninFormInput } from '../../../types/types';
import { useTranslation } from 'react-i18next';

export default function SigninFormContainer() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<SigninFormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      login: '',
      password: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = ({ login, password }: SigninFormInput) => {
    dispatch(fetchSigninUser({ login, password }));
    reset();
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (errors[target.name as keyof SigninFormInput]) {
      clearErrors(target.name as keyof SigninFormInput);
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
      <SigninForm onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          name="login"
          id="login"
          label={t('login')}
          register={{ ...register('login', { onChange, required: `${t('provide_login')}` }) }}
          error={errors.login}
        />

        <CustomInput
          type="password"
          name="password"
          id="password"
          label={t('password')}
          register={{ ...register('password', { onChange, required: `${t('provide_password')}` }) }}
          error={errors.password}
        />
      </SigninForm>
    </>
  );
}
