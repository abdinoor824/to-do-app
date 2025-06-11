'use client';

import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [todoData, setTodoData] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("You must be logged in to create a todo!");
      return;
    }

    try {
      const response = await axios.post("/api/todo", formData);
      toast.success(response.data.msg);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch {
      toast.error("Fill the title and the description!");
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios("/api/todo");
      const todos = response.data.todos;

      if (session) {
        const userEmail = session.user.email;
        setTodoData(todos.filter((todo) => todo.userEmail === userEmail));
      } else {
        setTodoData([]);
      }
    } catch {
      toast.error("Failed to load todos");
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api/todo", { params: { mongoId: id } });
    toast.success(response.data.msg);
    fetchTodos();
  };

  const updateTodo = async (id) => {
    const response = await axios.put("/api/todo", {}, { params: { mongoId: id } });
    toast.success(response.data.msg);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [session]);

  // 🔒 If not logged in, show only the navbar
  if (status === "unauthenticated") {
    return (
      <>
        <ToastContainer theme="dark" />
        <p className="text-center text-red-500 mt-10">Login to create and view your todos.</p>
      </>
    );
  }

  // 🌀 Show loading state while session is being fetched
  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <ToastContainer theme="dark" />

      <form
        onSubmit={onSubmitHandle}
        className="flex items-start flex-col gap-2 w-[80%]  max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          value={formData.title}
          type="text"
          name="title"
          placeholder="Enter title"
          className="px-3 py-2 border-1 w-full"
          onChange={onChangeHandler}
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter description"
          className="px-3 py-2 border-1 w-full"
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto sm:rounded-lg mt-24 mx-2">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1">Title</th>
              <th scope="col" className="px-1">Description</th>
              <th scope="col" className="px-1">Status</th>
              <th scope="col" className="px-1 py-2 sm:px-1 flex justify-around">Action</th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => (
              <Todo
                key={index}
                id={index}
                title={item.title}
                description={item.description}
                complete={item.isCompleted}
                mongoId={item._id}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
