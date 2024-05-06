import { toggleDarkMode } from '@/resources/userSettings';

import { useDispatch } from 'react-redux';
import styles from './page.module.css';

export default function Index() {
  const dispatch = useDispatch();
  return (
    <main className={styles.main}>
      <div>
        <button
          onClick={() => {
            dispatch(toggleDarkMode());
          }}
        >
          dark mode
        </button>
        <p>Hello World</p>
      </div>
    </main>
  );
}
