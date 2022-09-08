import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";

import * as TaskStories from "../Task/Task.stories";
import TaskList from "./Tasklist";

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
  status: "idle",
  error: null,
};

// Un mock simple de redux store
const MockStore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  // Campo de configuración que evita que nuestro estado simulado sea tratado como una historia.
  excludeStories: /.*MockedState$/,
  // Los decoradores son una forma de proporcionar wrappers arbitrarios a las stories.
};

const Template = () => <TaskList />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => <MockStore taskboxState={MockedState}>{story()}</MockStore>,
];

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
    ];

    return (
      <MockStore
        taskboxState={{
          ...MockedState,
          tasks: pinnedtasks,
        }}
      >
        {story()}
      </MockStore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <MockStore
      taskboxState={{
        ...MockedState,
        status: "loading",
      }}
    >
      {story()}
    </MockStore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <MockStore
      taskboxState={{
        ...MockedState,
        tasks: [],
      }}
    >
      {story()}
    </MockStore>
  ),
];
