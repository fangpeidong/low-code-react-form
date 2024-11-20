import React, { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../hooks/useGetComponentInfo';
import { getComponentConfByType } from '../../components';
import {
  changeSelectedId,
  ComponentInfoType
} from '../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

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
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  // 点击组件，选中
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(id));
  }

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
        const wrapperDefaultClassName = styles['component-wrapper'];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId
        });

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={(e) => handleClick(e, fe_id)}
          >
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
