import React from 'react'

const Todo = ({id, title,description,mongoId,complete, deleteTodo,  updateTodo}) => {
  return (
   <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class={`px-2 py-4 font-medium text-gray-900 whitespace-nowrap ${complete?"line-through":""}`}>
                   {title}
                </th>
                <td class={`px-2 py-4 ${complete?"line-through":""} `}>
                    {description}
                </td>
                <td class="px-2 py-4 ">
                    {complete?"completed":"pending"}
                </td>
                <td class="px-2 py-4">
                    

                  <td class="px-2 py-4 flex justify-around gap-1">
                    <button onClick={()=>deleteTodo(mongoId)} className='py-2 px-2 bg-red-500 text-white'>Delete</button>
                {complete?"":<button onClick={()=>updateTodo(mongoId)} className='py-2 px-2 bg-green-500 text-white '>Done</button>}
                </td>
                </td>
               
            </tr>
  )
}

export default Todo
