'use client'
import TodoComponent from "@/(components)/TodoComponent";
import { Checkbox } from "@mui/material";
import { ArrowDownToDot, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useGetTodosByCognitoIdQuery } from "@/state/api";
import { getCurrentUser } from "aws-amplify/auth";


export default function Todo() {

  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser();
      console.log(user);
      setCurrentUser(user);
    };
    fetchData();
  }, []);

  const { data, isLoading, isError } = useGetTodosByCognitoIdQuery(currentUser?.userId, {
    skip: !currentUser,
  });

  let sortedData = data;  // Default to the original data, but we'll create a copy if necessary

  // Sort the data based on the deadline if data is available
  if (data && currentUser) {
    // Create a shallow copy of the data before sorting
    sortedData = [...data];  // This creates a new array based on the existing `data`

    sortedData.sort((a, b) => {
      const dateA = new Date(a.deadline); // Convert deadline to Date object
      const dateB = new Date(b.deadline); // Convert deadline to Date object

      // Ensure that both dates are valid before comparing
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0; // If either date is invalid, do not reorder
      }

      return dateA.getTime() - dateB.getTime(); // Compare date values
    });
  }

  console.log(sortedData);  // Log the sorted data
  return (


    <>
      {modal && <Modal setModal={setModal} modal={modal} />}
      <div className="flex overflow-x-auto m-4" >


        <div className="w ">

          <div className="shadow-md rounded-lg  w-[350px]  min-h-[50px] m-5  flex">
            <div className="w-2 bg-[#059669] min-h-[50px] rounded-l-lg">

            </div>
            <div className="flex items-center justify-between mr-4  w-full ml-4 font-medium text-xl" >
              <h1 className="dark:text-white">To-Do</h1>
              <div className="bg-gray-200 rounded-md cursor-pointer p-0.5 dark:bg-slate-500">
                <Plus className="w-6 h-6" onClick={() => setModal(true)} />


              </div>
            </div>
          </div>

          <div className="  w-[350px]   m-5 flex mt-2  flex-col  items-center dark:text-white" >


            {sortedData && sortedData.map((item) => {
              return (
                <>
                  {item.status == false ? <TodoComponent id={item.id} key={item.id} name={item.name} deadline={item.deadline} status={item.status} /> : ''}
                </>
              )
            })}


          </div>

          <div className="  w-[350px]   m-5 flex mt-2  flex-col  items-center dark:text-white" >


            {sortedData && sortedData.map((item) => {
              return (
                <>
                  {item.status == true ? <TodoComponent id={item.id} key={item.id} name={item.name} deadline={item.deadline} status={item.status} /> : ''}
                </>
              )
            })}


          </div>
        </div>


        {/* <div className="w">

  <div className="shadow-md rounded-lg  w-[350px]  min-h-[50px] m-5  flex">
    <div className="w-2 bg-[#059669] min-h-[50px] rounded-l-lg">

    </div>
    <div className="flex items-center justify-between mr-4  w-full ml-4 font-medium text-xl" >
      <h1>To-Do</h1>
      <div className="bg-gray-200 rounded-md cursor-pointer p-0.5">
        <Plus className="w-6 h-6" />


      </div>
    </div>
  </div>

  <div className="  w-[350px]  min-h-[500px] m-5 flex mt-2  flex-col  items-center">
   

  </div>
</div> */}



      </div>
    </>
  )
};