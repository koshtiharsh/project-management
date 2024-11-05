import React from "react";
import ReactDOM from 'react-dom'
import Header from '../Header';
import { X } from 'lucide-react';

type Props = {

    children: React.ReactNode
    isOpen: boolean;
    onClose: () => void;
    name: string
}

export default function Modal({
    children,
    isOpen,
    onClose,
    name
}: Props) {

    if (!isOpen) return null;


    // when we wantt to create any component on top of 
    // any thing we will have to do like this 
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex w-full h-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
                <Header name={name}
                    buttonComponent={
                        <button onClick={onClose} className='flex h-7 w-7 items-center justify-center rounded-full text-white bg-blue-primary hover:bg-blue-600 '>
                            <X size={18} />
                        </button>
                    }
                    isSmallText
                />
                {children}
            </div>
        </div>,
        document.body,

    );
};