import { Task } from "../../types";
import tw from "twin.macro";
import CheckIcon from "../CheckIcon";
import styled from "@emotion/styled";
import TrashIcon from "../TrashIcon";

const ListItem = styled.li`
  ${tw`
    flex items-center
    h-20
    font-darkergrotesque font-semibold text-3xl
    p-4
    border-b
    border-gray
    select-none	
  `}
  &:last-of-type {
    ${tw`border-none`}
  }
`;

const CheckBoxContainer = styled.div`
  ${tw`relative h-6 w-6 cursor-pointer rounded border border-solid border-gray`}

  input[type='checkbox'] {
    display: none;
  }
`;

type TaskItemNameProps = {
  completed: boolean;
};

const TaskItemName = styled.div<TaskItemNameProps>`
  ${tw`relative mx-6 flex-1`}

  > span {
    ${({ completed }) => (completed ? tw`opacity-25` : tw`opacity-100`)}
  }

  ::after {
    ${({ completed }) => (completed ? tw`block` : tw`hidden`)}
    content: "";
    width: 125%;
    ${tw`absolute w-full bg-pink h-1 top-5 left-0`}
`;

const Button = tw.button`opacity-10 hover:opacity-100`;

interface TaskItemProps {
  id: Task["id"];
  name: Task["name"];
  completed: Task["completed"];
  toggleCompleted: () => void;
  remove: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  completed,
  toggleCompleted,
  remove,
}) => {
  return (
    <ListItem>
      <CheckBoxContainer onClick={toggleCompleted}>
        <input
          type="checkbox"
          name={`task-${id}`}
          checked={completed}
          aria-checked={completed}
          readOnly
        />
        {completed && <CheckIcon color="#e13868" />}
      </CheckBoxContainer>
      <TaskItemName completed={completed}>
        <span>{name}</span>
      </TaskItemName>
      <Button onClick={remove}>
        <TrashIcon />
      </Button>
    </ListItem>
  );
};

export default TaskItem;
