import Task from "./Task";

// Para contarle a Storybook sobre el componente que estamos documentando,
// creamos una exportación predeterminada que contiene:
export default {
  component: Task, //the component itself
  title: "Task", //how to refer to the component in the sidebar of the Storybook app
};

const Template = (args) => <Task {...args} />;

// 3 estados
export const Default = Template.bind({}); //a standard JavaScript technique for making a copy of a function.
Default.args = {
  task: {
    id: "1",
    title: "Task Title",
    state: "TASK_INBOX",
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};
