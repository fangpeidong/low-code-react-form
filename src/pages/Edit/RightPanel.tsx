import { FC } from 'react';
import { Tabs, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <Space>
          <FileTextOutlined />
          属性
        </Space>
      ),
      children: <ComponentProp />
    }
  ];

  return <Tabs defaultActiveKey="prop" items={tabsItems} />;
};

export default RightPanel;
