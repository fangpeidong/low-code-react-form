import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
import componentsReducer, { ComponentsStateType } from './componentsReducer';

export type StateType = {
  // components: ComponentsStateType;
  components: StateWithHistory<ComponentsStateType>;
};

export default configureStore({
  reducer: {
    components: undoable(componentsReducer, {
      limit: 20, // 限制 undo 20 步
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ])
    })
  }
});
