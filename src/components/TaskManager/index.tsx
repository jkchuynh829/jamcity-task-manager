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
  mb-12
`;
const Form = tw.form`
  flex flex-row justify-between
  h-8 md:h-12 rounded-md overflow-hidden
  font-darkergrotesque font-semibold text-xl md:text-2xl
  shadow-inner
  focus:shadow-2xl
  focus:border-2
  focus:border-pink
  bg-white
  mb-4 md:mb-8
`;
const FiltersContainer = tw.section`
  flex
  justify-end
  w-full
  h-10
  gap-3
  overflow-hidden
  mb-4 md:mb-8
`;
const Input = tw.input`
  flex-1
  w-full h-full
  flex items-center
  p-4
  outline-none
`;

const FormButton = styled.button<{ disabled: boolean }>`
  ${tw`
    flex justify-center items-center
    h-full w-36
    bg-pink
    text-white
    font-darkergrotesque font-semibold text-xl md:text-2xl
  `}
  ${({ disabled }) => (disabled ? tw`bg-gray` : tw`bg-pink text-white`)}
`;

type ButtonProps = {
  selected?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${tw`
    text-lg
    flex-1
    flex
    justify-center
    items-center
    px-6
    font-darkergrotesque
    font-semibold md:font-black
    rounded-lg
  `}
  ${({ selected = false }) =>
    selected ? tw`text-white bg-pink font-black` : tw`bg-gray`}
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
        <FormButton onClick={onSubmit} disabled={!value}>
          Add Task
        </FormButton>
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
