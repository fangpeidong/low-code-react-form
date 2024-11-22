import type { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import QustionParagraphConf, {
  QuestionParagraphPropsType
} from './QustionParagraph';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConf, {
  QuestionTextareaPropsType
} from './QuestionTextarea';
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio';
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType
} from './QuestionCheckbox';

// 各个组件的propsType
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

// 组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QustionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本',
    components: [QuestionTitleConf, QuestionInfoConf, QustionParagraphConf]
  },
  {
    groupId: 'inputGroup',
    groupName: '输入框',
    components: [QuestionInputConf, QuestionTextareaConf]
  },
  {
    groupId: 'chooseGroup',
    groupName: '选择',
    components: [QuestionRadioConf, QuestionCheckboxConf]
  }
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
