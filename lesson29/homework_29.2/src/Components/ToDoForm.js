import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addTask } from "../Store/Store.js"; 
import ToDoList from "./ToDoList.js";

const taskSchema = z.object({
  task: z
    .string()
    .min(5, { message: "Task must be at least 5 characters long" })
    .max(100, { message: "Task must be no more than 100 characters long" })
});

function ToDoForm() {
  const dispatch = useDispatch(); 
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
  });

  function onSubmit(data) {
    const newTask = { text: data.task, completed: false };
    dispatch(addTask(newTask)); 
    reset();
  }  

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="max-w-[1330px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">To Do List</h1>
        <div className="mx-auto min-h-[300px] rounded-lg mt-5 bg-[rgb(194,210,218)] w-[800px] shadow-md transition-colors duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center mt-5 pt-8">
            <input
              type="text"
              {...register("task")}
              placeholder="Enter task"
              className="border border-gray-300 rounded-md p-2 w-64 mr-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
          <div className="h-6">
            {errors.task && (
              <p className="text-red-500 text-center">{errors.task.message}</p>
            )}
          </div>

          <ToDoList />
        </div>
      </div>
    </div>
  );
}

export default ToDoForm;