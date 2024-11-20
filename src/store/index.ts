import { configureStore } from '@reduxjs/toolkit'
import componentsReducer, { ComponentsStateType } from './componentsReducer';

export type StateType = {
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    components: componentsReducer
  },
})