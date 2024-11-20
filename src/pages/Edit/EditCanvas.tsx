import React, { FC } from 'react';
import QuestionTitle from '../../components/QuestionTitle/Component';
import QuestionInput from '../../components/QuestionInput/Component';
import styles from './EditCanvas.module.scss';

const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
