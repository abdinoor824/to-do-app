"use client";

import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };
  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      //api
      const response = await axios.post("/api", formData);

      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await featchTodos();
    } catch (error) {
      toast.error("fill the title and the description !!");
    }
  };

  const [todoData, setTodoData] = useState([]);
  const featchTodos = async ()=>{
    const response = await axios('/api');
    setTodoData(response.data.todos)
  }


  const deleteTodo = async (id)=>{
     const response = await axios.delete("/api",{
      params:{
        mongoId:id
      }
     })
     toast.success(response.data.msg)
     featchTodos();
  }
  const updateTodo = async (id)=>{
    const response = await axios.put('/api',{},{
      params:{
        mongoId:id
      }
    })
    toast.success(response.data.msg)
      featchTodos();
  }
  useEffect (()=>{
    featchTodos();
  },[])

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
          className="px-3 py-2 border-1 w-full "
          onChange={onChangeHandler}
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter description"
          className="px-3 py-2 border-1 w-full"
        ></textarea>
        <button type="submit" className=" bg-orange-600 py-3 px-11 text-white">
          {" "}
          Add Todo
        </button>
      </form>

      <div class="relative overflow-x-auto sm:rounded-lg mt-24  mx-2">
        <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-1  ">
                title
              </th>
              <th scope="col" class="px-1  ">
                description
              </th>
              <th scope="col" class="px-1   ">
                status
              </th>
              <th scope="col" class="px-1 py-2 sm:px-1 flex justify-around">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {todoData.map((item,index)=>{
            return <Todo key={index} id ={index}  title={item.title} description={item.description} complete={item.isCompleted} mongoId ={item._id} deleteTodo ={deleteTodo}  updateTodo={ updateTodo}/>
          })}
          </tbody>
        </table>
      </div>
    </>
  );
}
