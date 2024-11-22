import { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../hooks/useGetComponentInfo';
import { getComponentConfByType } from '../../components';
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent
} from '../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import useBindCanvasKeyPress from '../../hooks/useBindCanvasKeyPress';
import SortableContainer from '../../components/DragSortable/SortableContainer';
import SortableItem from '../../components/DragSortable/SortableItem';

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

  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c;
            const wrapperDefaultClassName = styles['component-wrapper'];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked
            });

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
