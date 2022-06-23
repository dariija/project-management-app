import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.css';
import mailIcon from '../../../assets/svg/mail-icon.svg';
import gitIcon from '../../../assets/svg/git-icon.svg';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  const { t } = useTranslation();
  return (
    <div className={styles.welcome}>
      <section className={styles.about}>
        <div className={styles.about_project_card}>
          <div className={styles.about_project_card_title}>{t('task_manager')}</div>
          <div className={styles.about_project_description}>{t('project_description')}</div>
          <Link className={styles.btn_link} to={'/signup'}>
            {t('get_started')}
          </Link>
        </div>
        <div className={styles.photo_project}></div>
      </section>
      <section className={styles.author}>
        <div className={styles.photo_author}></div>
        <div className={styles.about_author}>
          <div className={styles.about_author_header}>
            <p className={styles.about_author_hello}>{t('hello')}</p>
            <p className={styles.about_author_name}>{t('i_am')}</p>
          </div>
          <div className={styles.about_author_contacts}>
            <ul className={styles.contacts_list}>
              <li className={styles.contacts_item}>
                <img className={styles.contacts_icon_git} src={gitIcon} alt="github-icon" />
                <a
                  className={styles.contacts_link}
                  href="https://github.com/dariija"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dariija
                </a>
              </li>
              <li className={styles.contacts_item}>
                <img className={styles.contacts_icon_mail} src={mailIcon} alt="mail-icon" />
                <a
                  className={styles.contacts_link}
                  href="mailto:darija.bakanova@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  darija.bakanova@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
