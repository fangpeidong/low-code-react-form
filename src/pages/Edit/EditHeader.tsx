import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './EditHeader.module.scss';
import { LeftOutlined } from '@ant-design/icons';

const EditHeader: FC = () => {
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Button type="link" icon={<LeftOutlined />}>
            返回
          </Button>
        </div>
        <div className={styles.main}>2</div>
        <div className={styles.right}>3</div>
      </div>
    </div>
  );
};

export default EditHeader;
