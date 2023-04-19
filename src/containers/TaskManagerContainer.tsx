import React, { useCallback, useMemo, useState } from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { Filter, Task } from "../types";
import TaskManager from "../components/TaskManager";

const Container = tw.main`
  relative
  flex items-center flex-col
  p-12
  bg-background
  h-screen
  z-0
`;

const H1 = styled.h1`
  ${tw`relative font-darkergrotesque text-6xl font-black mb-6`}
  ::before {
    content: "";
    transform: translate(-50%, -100%);
    z-index: -1;
    ${tw`absolute w-full bg-pink h-4 top-full left-1/2`}
  }
`;

const TaskManagerContainer: React.FC = () => {
  const defaultTasks: Task[] = [
    { id: uuidv4(), name: "item 1", completed: false },
    { id: uuidv4(), name: "item 2", completed: false },
  ];

  const [tasks, setTasks] = useState<Task[]>(defaultTasks ?? []);
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter(({ completed }) =>
      filter === "completed" ? completed : !completed
    );
  }, [tasks, filter]);

  const onAdd = useCallback(
    (task: Task) => {
      setTasks((prev) => [task, ...prev]);
    },
    [setTasks]
  );

  const onRemove = useCallback(
    (deleteId: Task["id"]) => {
      setTasks((prev) => prev.filter(({ id }) => id !== deleteId));
    },
    [setTasks]
  );

  const onClickCompleted = useCallback(
    (toggleId: string) => {
      const updatedTasks = tasks.map((task) =>
        task.id === toggleId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    },
    [tasks, setTasks]
  );

  const onClickFilter = useCallback(
    (value: Filter) => {
      setFilter(value);
    },
    [setFilter]
  );

  return (
    <Container>
      <H1>Jam City Task Manager</H1>
      <TaskManager
        tasks={filteredTasks}
        filter={filter}
        onClickFilter={onClickFilter}
        add={onAdd}
        remove={onRemove}
        toggleCompleted={onClickCompleted}
      />
    </Container>
  );
};

export default TaskManagerContainer;
