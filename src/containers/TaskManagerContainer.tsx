import React, { useCallback, useMemo, useState } from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { Filter, Task } from "../types";
import TaskManager from "../components/TaskManager";
import useLocalStorage from "../hooks/useLocalStorage";

const Container = tw.main`
  relative
  flex items-center flex-col
  p-6
  md:p-12
  bg-background
  h-screen
  z-0
`;

const H1 = styled.h1`
  ${tw`relative font-darkergrotesque text-5xl md:text-6xl font-black mb-6 text-center`}
  ::before {
    content: "";
    transform: translate(-50%, -100%);
    z-index: -1;
    ${tw`absolute w-full bg-pink h-3 md:h-4 top-full left-1/2`}
  }
`;

const TaskManagerContainer: React.FC = () => {
  const [localStorageTasks, setLocalStorageTasks] = useLocalStorage<Task[]>(
    "tasks",
    []
  );
  const [localStorageFilter, setLocalStorageFilter] = useLocalStorage<Filter>(
    "filter",
    "all"
  );

  const [tasks, setTasks] = useState<Task[]>(localStorageTasks);
  const [filter, setFilter] = useState<Filter>(localStorageFilter);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter(({ completed }) =>
      filter === "completed" ? completed : !completed
    );
  }, [tasks, filter]);

  const onAdd = useCallback(
    (task: Task) => {
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks);
      setLocalStorageTasks(updatedTasks);
    },
    [tasks, setTasks, setLocalStorageTasks]
  );

  const onRemove = useCallback(
    (deleteId: Task["id"]) => {
      const updatedTasks = tasks.filter(({ id }) => id !== deleteId);
      setTasks(updatedTasks);
      setLocalStorageTasks(updatedTasks);
    },
    [tasks, setTasks, setLocalStorageTasks]
  );

  const onClickCompleted = useCallback(
    (toggleId: string) => {
      const updatedTasks = tasks.map((task) =>
        task.id === toggleId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      setLocalStorageTasks(updatedTasks);
    },
    [tasks, setTasks, setLocalStorageTasks]
  );

  const onClickFilter = useCallback(
    (value: Filter) => {
      setFilter(value);
      setLocalStorageFilter(value);
    },
    [setFilter, setLocalStorageFilter]
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
