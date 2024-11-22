import { FC } from 'react';
import styles from './EditHeader.module.scss';
import EditToolbar from './EditToolbar';

const EditHeader: FC = () => {
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.main}>
          <EditToolbar />
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
