'use client'
import { useDeleteTodoMutation, useUpdateTaskStatusMutation, useUpdateTodoMutation } from "@/state/api"
import { Checkbox } from "@mui/material"
import { Delete, Trash } from "lucide-react"
import { useState } from "react"


type Props = {
  name: string,
  deadline: string
  status: boolean,
  id: number

}

export default function TodoComponent({ name, deadline, status, id }: Props) {

  const date = new Date(deadline)

  const formatted = date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  const [check, setCheck] = useState(status)
  const [updateTodo, { isLoading }] = useUpdateTodoMutation()
  const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodoMutation()

  const handleCheck = async () => {
    setCheck(!check);
    await updateTodo(id)

  }
  const [c, setC] = useState(false);

  function handleConfirm() {
    setC(true)


  }
  const handleDelete = async () => {

    await deleteTodo(id)
    setC(false)


  }
  return (
    <>
      {c && <div className="z-50 absolute flex w-full items-center justify-center inset-0 bg-opacity-50 bg-gray-600">
        <div className=" bg-white max-w-2xl p-6  rounded-lg ">
          <h1 className="font-semibold m-4 text-xl">Are you Sure you want Delete ? </h1>
         <div className=" flex items-center justify-evenly">
         <button onClick={() => setC(false) }  className="bg-blue-600 p-2 text-white rounded-lg">Cancel</button>
         <button onClick={handleDelete} className="bg-blue-600 p-2 text-white rounded-lg">Delete</button>
         </div>
        </div>
      </div>}
      <div className="shadow-md rounded-lg md:w-[350px]   w-[90%]  min-h-[50px]  flex mt-2 relative">


        <div className="w-[5px] bg-[#2563EB] min-h-[70px] rounded-l-lg">

        </div>
        <div className="flex items-center justify-center ">
          <Checkbox checked={check} onChange={handleCheck} />
          <h2 className="ml-2 font-semibold ">{name}</h2>
        </div>

        <div className="absolute right-3 bottom-2 bg-blue-100 p-1 rounded-lg">{formatted}</div>
        {status && <div onClick={handleConfirm} className="absolute right-3   p-1 rounded-lg"><Trash className="w-5 cursor-pointer" /></div>
        }
      </div>
    </>
  )
};