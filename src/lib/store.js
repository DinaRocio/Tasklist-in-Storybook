// Una implementación simple de redux store/actions/reducer.
// Una verdadera aplicación sería más compleja y estaría separada en diferentes archivos.

const { createSlice, configureStore } = require("@reduxjs/toolkit");

const defaultTasks = [
  { id: "1", title: "something", state: "TASK_INBOX" },
  { id: "2", title: "something", state: "TASK_INBOX" },
  { id: "3", title: "something", state: "TASK_INBOX" },
  { id: "4", title: "something", state: "TASK_INBOX" },
];
const TaskBoxData = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

// El store es creado aquí.

const TaskSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
});

// Las acciones contenidas en este slice son importadas para uso de nuestros componentes.

export const { updateTaskState } = TaskSlice.actions;

// La configuración del store de nuestra app va aquí

const store = configureStore({
  reducer: {
    taskbox: TaskSlice.reducer,
  },
});

export default store;
