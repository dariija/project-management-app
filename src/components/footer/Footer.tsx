import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://rs.school/react" target="_blank" rel="noopener noreferrer">
        RSSchool
      </a>
      <div>2022</div>
      <a href="https://github.com/dariija" target="_blank" rel="noopener noreferrer">
        dariija
      </a>
    </footer>
  );
}
