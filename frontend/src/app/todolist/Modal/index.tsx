import { useEffect, useState } from "react"
import { Status, useCreateNewTodoMutation } from '../../../state/api';
import { SubmitHandler, useForm } from "react-hook-form";
import type { FieldValues } from 'react-hook-form'
import { log } from "console";
import { Cross, Loader, X } from "lucide-react";
import { getCurrentUser } from "aws-amplify/auth";
import { CircularProgress } from "@mui/material";

type Props = {
    setModal: (arg: boolean) => void,
    modal: boolean
}

type inputs = {
    name: string,
    deadline: string,
    Status: boolean
}

export default function Modal({ setModal, modal }: Props) {

    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm()


    const [createTask, { isLoading }] = useCreateNewTodoMutation();


    const [currentUser, setCurrentUser] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            const user = await getCurrentUser();
            console.log(user)
            setCurrentUser(user?.userId)
        }
        fetchData()
    }, [])


    const onsubmit = async (data: FieldValues) => {
        if (currentUser.length > 0) {
            data.cognitoId = currentUser;
            data.status = false

            await createTask(data)
            if (!isLoading) {
                setModal(false)
            }
        }


    }


    const inputstyles = 'w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none'

    return (
        <div className="z-50 absolute flex w-full items-center justify-center inset-0 bg-opacity-50 bg-gray-600">

            <form className="form flex flex-col gap-5 bg-white w-full max-w-2xl p-2 rounded-lg dark:bg-dark-secondary" onSubmit={handleSubmit(onsubmit)}>

                <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Add New Task</h1>
                    <X onClick={() => setModal(false)} className="cursor-pointer" />
                </div>
                <input type="text" {...register('name', {
                    required: "Name of task is required"
                })} className={inputstyles} />

                <input type="datetime-local" {...register('deadline', {
                    required: "deadline of task is required"
                })} className={inputstyles} />

                <button className="bg-blue-600 text-white rounded-md p-2" disabled={isSubmitting}>{isLoading ? <CircularProgress size="20px" color="inherit" /> : "Add"}</button>
            </form>
        </div>
    )
};