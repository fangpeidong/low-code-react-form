import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import { componentConfGroup, ComponentConfType } from '../../components';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import { addComponent } from '../../store/componentsReducer';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

function GenComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps
      })
    );
  }

  return (
    <div className={styles.wrapper} key={type} onClick={() => handleClick()}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => GenComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
