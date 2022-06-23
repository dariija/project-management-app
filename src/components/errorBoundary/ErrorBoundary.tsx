import React, { ReactNode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import styles from './ErrorBoundary.module.css';

type Props = {
  children: ReactNode;
} & WithTranslation;

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    const { t, i18n } = this.props;
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.error_container}>
            <div className={styles.oops}>{t('oops')}</div>
            <div className={styles.text}>{t('error_reload_page')}</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
