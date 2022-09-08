import React from "react";

import * as TaskStories from "../Task/Task.stories";
import TaskList from "./Tasklist";

export default {
  component: TaskList,
  title: "Tasklist",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  // Los decoradores son una forma de proporcionar wrappers arbitrarios a las stories.
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Dar forma a las stories a través de la composición de argumentos.
  // Los datos se heredaron de la historia predeterminada en Task.stories.js.
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
};

export const withPinnedTasks = Template.bind({});
withPinnedTasks.args = {
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { id: "6", title: "Task 6 Pinned", state: "TASK_PINNED" },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Loading.args,
  loading: false,
};
