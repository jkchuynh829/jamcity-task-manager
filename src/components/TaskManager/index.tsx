import { Filter, Task } from "../../types";
import tw from "twin.macro";
import TaskItem from "../TaskItem";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const Container = tw.section`
  w-full
  max-w-2xl
`;
const List = tw.ul`
  flex
  flex-col
  shadow-2xl
  overflow-hidden
  rounded-md
  bg-white
`;
const Form = tw.form`mb-8`;
const FiltersContainer = tw.section`
  flex
  justify-end
  w-full
  h-10
  mb-4
  gap-3
  overflow-hidden
`;
const Input = tw.input`
  w-full
  flex items-center
  h-20 rounded-md
  font-darkergrotesque font-semibold text-3xl
  shadow-inner
  focus:shadow-2xl
  bg-white
  p-4
  outline-none
  focus:border-2
  focus:border-pink
`;

type ButtonProps = {
  selected?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${tw`
    text-lg
    flex
    justify-center
    items-center
    px-6
    font-darkergrotesque
    font-black
    rounded-lg
  `}
  ${({ selected = false }) => (selected ? tw`text-white bg-pink` : tw`bg-gray`)}
`;

interface TaskManagerProps {
  tasks: Task[];
  add: (task: Task) => void;
  remove: (id: string) => void;
  toggleCompleted: (id: string) => void;
  filter: Filter;
  onClickFilter: (value: Filter) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  add,
  remove,
  toggleCompleted,
  filter,
  onClickFilter,
}) => {
  const [value, setValue] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValue("");
    add({ id: uuidv4(), name: value, completed: false });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new task..."
        />
      </Form>
      <FiltersContainer>
        <Button
          selected={filter === "all"}
          onClick={() => onClickFilter("all")}
        >
          All
        </Button>
        <Button
          selected={filter === "active"}
          onClick={() => onClickFilter("active")}
        >
          Active
        </Button>
        <Button
          selected={filter === "completed"}
          onClick={() => onClickFilter("completed")}
        >
          Completed
        </Button>
      </FiltersContainer>
      <List>
        {tasks.map((task) => (
          <TaskItem
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleCompleted={() => toggleCompleted(task.id)}
            key={task.id}
            remove={() => remove(task.id)}
          />
        ))}
      </List>
    </Container>
  );
};

export default TaskManager;
