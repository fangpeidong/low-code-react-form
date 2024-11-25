import { FC } from 'react';
import { Typography, Input } from 'antd';
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface';

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { Paragraph } = Typography;
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };
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
