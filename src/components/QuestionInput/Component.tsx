import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import {
  QuestionInputPropsType,
  QuestionInputDefaultPropsType
} from './interface';

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { Paragraph } = Typography;
  const { title, placeholder } = { ...QuestionInputDefaultPropsType, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
