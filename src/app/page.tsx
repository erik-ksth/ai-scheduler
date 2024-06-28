"use client";

import { useState, useEffect } from "react";
import runScheduler from "./api/generate-schedule";
import "ldrs/helix";
import type {} from "ldrs";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements[0] as HTMLInputElement;
    if (input.value !== "") {
      setTasks([...tasks, input.value]);
      input.value = "";
    }
  };

  const handleDelete = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const handleCreateSchedule = async () => {
    setLoading(true);
    try {
      const response = await runScheduler(tasks);
      setResponse(response);
    } catch (error) {
      console.error("Error creating schedule:", error);
      setResponse("Failed to create schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <h1 className="text-center text-4xl font-bold my-10">AI SCHEDULER</h1>
        <div className="flex min-h-screen flex-col md:flex-row gap-4 items-center md:items-start p-4 md:p-10">
          <div className=" md:w-1/2 md:h-screen">
            <form onSubmit={handleSubmit} className="text-center">
              <input
                type="text"
                className="text-black"
                placeholder="Enter a task"
              />
              <button type="submit">Submit</button>
            </form>
            <div className="flex flex-col md:px-5 md:py-3 md:my-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>{task}</div>
                  <FaRegTrashCan
                    className="my-3 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={handleClearAll}>Clear All</button>
            </div>
            <div className="text-center">
              {!loading ? (
                <button onClick={handleCreateSchedule}>Create Schedule</button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="flex items-start justify-center w-full md:px-10">
              {!response && !loading ? (
                <div className="text-center">
                  <p>No schedule created yet</p>
                </div>
              ) : (
                <></>
              )}
              {loading ? (
                <div className="text-center">
                  <l-helix size="45" speed="2.5" color="white"></l-helix>
                </div>
              ) : (
                <div className="whitespace-pre-wrap leading-8" dangerouslySetInnerHTML={{ __html: response }}></div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
