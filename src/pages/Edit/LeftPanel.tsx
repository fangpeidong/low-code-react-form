import { FC } from 'react';
import { Tabs, Space } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import ComponentLib from './ComponentLib';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <Space>
          <AppstoreOutlined />
          组件库
        </Space>
      ),
      children: <ComponentLib />
    }
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
