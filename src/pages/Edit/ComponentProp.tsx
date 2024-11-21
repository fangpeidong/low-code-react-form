import { FC } from 'react';
import useGetComponentInfo from '../../hooks/useGetComponentInfo';
import { ComponentPropsType, getComponentConfByType } from '../../components';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../store/componentsReducer';

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) {
    return <NoProp />;
  }
  const { type, props, fe_id } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return <NoProp />;
  }
  const { PropComponent } = componentConf;

  function changeProps(newProps: ComponentPropsType) {
    console.log('change', newProps);
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
