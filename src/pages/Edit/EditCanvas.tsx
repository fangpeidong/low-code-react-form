import React, { FC } from 'react';
import QuestionTitle from '../../components/QuestionTitle/Component';
import QuestionInput from '../../components/QuestionInput/Component';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../hooks/useGetComponentInfo';
import { getComponentConfByType } from '../../components';
import { ComponentInfoType } from '../../store/componentsReducer';

type PropsType = {
  loading: boolean;
};

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();

  console.log(componentList, 'xxx');
  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c;

        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        );
      })}

      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;
