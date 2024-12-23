'use client'

import { useAppDispatch, useAppSelector } from "@/app/redux"
import { setIsSidebarCollapsed } from "@/state"
import { Project, useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api"
import { signOut } from "aws-amplify/auth"
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, HomeIcon, Icon, Layers3, ListTodo, LockIcon, LucideHome, LucideIcon, Menu, Search, Settings, ShieldAlert, User, UsersIcon, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {  usePathname } from "next/navigation"

import { useState } from "react"



export default function Sidebar() {


    const [showProjects, setShowProject] = useState(true)
    const [showPriority, setShowPriority] = useState(true)
    const dispatch = useAppDispatch();
    const isSidebar = useAppSelector((state) => state.global.isSidbarCollapse)

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebar ? "w-0 hidden" : 'w-64'}`
    const { data: projects } = useGetProjectsQuery()
    const {data:currentUser} = useGetAuthUserQuery({});
    const handleSignOut = async ()=>{
        try{
            await signOut()

        }catch(e){
            console.log('error sign in out ',e)
        }
    }
    
    if(!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;

    return (
        <div className={sidebarClassNames}>
            <div className="flex h-[100%] w-full flex-col justify-start">
                {/* toplogo */}
                <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                    <div className="text-xl font-black text-gray-800 dark:text-white">
                        EDLIST
                    </div>
                    {isSidebar ? null : (
                        <button className="py3
                        o" onClick={() => dispatch((setIsSidebarCollapsed(!isSidebar)))}><X className="h-6 w-6 hover:text-gray-500 dark:text-white" /></button>
                    )}

                </div>
                {/* team */}
                <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
                    <Image width={40} height={40} src="/logo.png" alt="logo" />
                    <div>
                        <h3 className="text-mg font-bold tracking-wide dark:text-gray-200">
                            Project Team
                        </h3>
                        <div className="flex mt-1 items-start gap-2">

                            <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 darK:text-gray-400" />
                            <p className="text-xs text-gray-500">Private</p>
                        </div>
                    </div>
                </div>

                {/* navbar links */}
                <nav className="z-10 w-full">
                    <SidebarLink icon={HomeIcon} label="Home" href="/" />
                    <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
                    <SidebarLink icon={Search} label="Search" href="/search" />
                    <SidebarLink icon={Settings} label="Settings" href="/settings" />
                    <SidebarLink icon={User} label="Users" href="/users" />
                    <SidebarLink icon={UsersIcon} label="Teams" href="/teams" />
                    <SidebarLink icon={ListTodo} label="ToDo-List" href="/todolist" />
                </nav>

                <button
                    onClick={() => setShowProject((prev) => !prev)}
                    className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
                >
                    <span className="">Projects</span>
                    {
                        showProjects ? (
                            <ChevronUp className="h-5 w-5" />

                        ) : <ChevronDown className="h-5 w-5" />
                    }
                </button>

                {/* project list */}
                {showProjects && projects?.map((project:Project) => (
                    <SidebarLink key={project.id} icon={Briefcase} label={project.name} href={`/projects/${project.id}`} />
                ))}

                <button
                    onClick={() => setShowPriority((prev) => !prev)}
                    className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
                >
                    <span className="">Priorities</span>
                    {
                        showPriority ? (
                            <ChevronUp className="h-5 w-5" />

                        ) : <ChevronDown className="h-5 w-5" />
                    }
                </button>
                {
                    showPriority && (
                        <>
                            <>
                                <SidebarLink
                                    icon={AlertCircle}
                                    label="Urgent"
                                    href="/priority/urgent"
                                />
                                <SidebarLink
                                    icon={ShieldAlert}
                                    label="High"
                                    href="/priority/high"
                                />
                                <SidebarLink
                                    icon={AlertTriangle}
                                    label="Medium"
                                    href="/priority/medium"
                                />
                                <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
                                <SidebarLink
                                    icon={Layers3}
                                    label="Backlog"
                                    href="/priority/backlog"
                                />
                            </>
                        </>
                    )
                }

            </div>
            <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
            <div className="flex w-full items-center ">
                    <div className='align-center flex h-9 w-9 justify-center'>
                        {!!currentUserDetails?.profilePictureUrl? (
                             <Image
                             src={`/${currentUserDetails.profilePictureUrl}}`}
                             alt="error image"
                             width={400}
                             height={200}
                             className='h-auto w-full rounded-full  object-cover'
                         />
                        ):(
                            <User className='h-6 w-6 cursor-pointer self-center rounded-full dark:text-white' />
                        )}

                        <span className='mx-3 text-gray-800 dark:text-white' > 
                            {currentUserDetails?.username}
                        </span>
                        <button onClick={handleSignOut} className='hidden rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500 md:block'>signOut</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive =
        pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href} className="w-full">
            <div
                className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
                    } justify-start px-8 py-3`}
            >
                {isActive && (
                    <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
                )}

                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                    {label}
                </span>
            </div>
        </Link>
    );
};
