import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { ComponentPropsType } from '../../components';
import { getNextSelectedId, insertNewComponent } from './utils';
import cloneDeep from 'lodash.clonedeep';
import { arrayMove } from '@dnd-kit/sortable';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },
    // 修改 selectedId
    changeSelectedId: (
      state: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      state.selectedId = action.payload;
    },
    // 添加新组件
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const newComponent = action.payload;
      // const { selectedId, componentList } = state;
      // const index = componentList.findIndex((c) => c.fe_id === selectedId);
      // if (index < 0) {
      //   state.componentList.push(newComponent);
      // } else {
      //   state.componentList.splice(index + 1, 0, newComponent);
      // }
      // state.selectedId = newComponent.fe_id;
      insertNewComponent(state, newComponent);
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps
        };
      }
    },
    // 删除选中组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = state;
      const newSelectedId = getNextSelectedId(removeId, componentList);
      state.selectedId = newSelectedId;
      const index = componentList.findIndex((c) => c.fe_id === removeId);
      componentList.splice(index, 1);
    },
    // 隐藏/显示 组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state;
      const { fe_id, isHidden } = action.payload;

      let newSelectedId = '';
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;

      const curComp = componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },
    // 锁定/解锁组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    // 复制选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      );
      if (selectedComponent == null) return;
      state.copiedComponent = cloneDeep(selectedComponent);
    },
    // 粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state;
      if (copiedComponent == null) return;
      copiedComponent.fe_id = nanoid();
      insertNewComponent(state, copiedComponent);
    },
    // 选中上一个
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (selectedIndex < 0) return; // 未选中组件
      if (selectedIndex <= 0) return; // 已经选中了第一个，无法再向上选中
      state.selectedId = componentList[selectedIndex - 1].fe_id;
    },
    // 选中下一个
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (selectedIndex < 0) return; // 未选中组件
      if (selectedIndex + 1 === componentList.length) return; // 已经选中了最后一个，无法再向下选中
      state.selectedId = componentList[selectedIndex + 1].fe_id;
    },
    // 移动组件位置
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curComponentList } = state;
      const { oldIndex, newIndex } = action.payload;
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex);
    }
  }
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  moveComponent
} = componentsSlice.actions;

export default componentsSlice.reducer;
