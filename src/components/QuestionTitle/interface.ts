export type QuestionTitlePropsType = {
  text?: string;
  level?: any; // 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
};

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '标题',
  level: 1,
  isCenter: false
};
