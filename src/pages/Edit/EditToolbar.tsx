import { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  LockOutlined,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  copySelectedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
  pasteCopiedComponent,
  moveComponent
} from '../../store/componentsReducer';
import useGetComponentInfo from '../../hooks/useGetComponentInfo';

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 第一个
  const isLast = selectedIndex + 1 >= length; // 最后一个
  // 删除
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  // 锁定
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }
  // 复制
  function copy() {
    dispatch(copySelectedComponent());
  }
  // 粘贴
  function paste() {
    dispatch(pasteCopiedComponent());
  }

  // 上移
  function moveUp() {
    if (isFirst) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
    );
  }

  // 下移
  function moveDown() {
    if (isLast) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
    );
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={moveUp}
          disabled={isFirst}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
