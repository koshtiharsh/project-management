'use client'
import Navbar from "@/(components)/Navbar"
import Sidebar from "@/(components)/Sidebar"
import StoreProvider, { useAppSelector } from "./redux"
import { useEffect } from "react"



export function DashboardWrapperLayout({ children }: { children: React.ReactNode }) {

    const isSidebar = useAppSelector((state) => state.global.isSidbarCollapse)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {

            document.documentElement.classList.remove('dark')

        }
    })

    return (

        <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
            {/* sidebar  */}
            <Sidebar />
            <main className={`flex  w-full flex-col bg-gray-50  dark:bg-dark-bg ${isSidebar ?'': 'md:pl-64'}`}>
                {/* navbar */}
                <Navbar />

                {children}
            </main>
        </div>

    )
};


export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <DashboardWrapperLayout>
                {children}
            </DashboardWrapperLayout>
        </StoreProvider>
    )
};