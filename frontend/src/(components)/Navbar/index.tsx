
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link'


export default function Navbar() {
    const dispatch = useAppDispatch();
    const isSidebar = useAppSelector((state) => state.global.isSidbarCollapse)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)




    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black dark:px-4 dark:py-3">

            <div className="flex items-center gap-8">
                {!isSidebar ? null : (
                    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebar))}>
                        <Menu className='h-8 w-8 dark:text-white' />
                    </button>
                )}
                <div className="relative flex h-min w-[200px]">
                    <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white ' />
                    <input placeholder='Search....' type="text" className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white' />

                </div>
            </div>

            {/* icons */}
            <div className="flex items-center ">
                <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))} className={isDarkMode ? `rounded p-2 dark:hover:bg-gray-700` : `rounded p-2 hover:bg-gray-100`}>
                    {
                        isDarkMode ? (
                            <Sun className='h-6 w-6 dark:text-white' />
                        ) : (
                            <Moon className='h-6 w-6 dark:text-white' />

                        )
                    }
                </button>
                <Link
                    href='/settings'
                    className={isDarkMode ? `h-min w-min rounded p-2 dark:hover:bg-gray-700` : `h-min w-min rounded p-2 hover:bg-gray-100`}>
                    <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
                </Link>
                {/* this div for creating differentiationline */}
                <div className="ml-2 mr-2 hidden min-h-[2em] bg-gray-200 md:inline-block w-[0.1rem] "></div>

            </div>
        </div>
    )
};