
"use client"

import React from 'react';
import { AlertTypes } from '../../data-types/characterType';


interface SuccesAlertProps {
    alert: AlertTypes;
}

interface FailAlertProps {
    alert: AlertTypes;
}

export const SuccesAlert: React.FC<SuccesAlertProps> = ({ alert }) => {

    return (
        <div className='flex items-center justify-center text-white font-bold' >
            {alert.success ? (
                <div role="alert" className="alert alert-success ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Success</span>
                </div>
            ) : null}

        </div>
    )
};


export const FailAlert: React.FC<FailAlertProps> = ({ alert }) => {

    return (
        <>
            {alert.fail ? (
                <div role="alert" className="alert alert-error animate-slide-in-out text-white font-bold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error! Task failed.</span>
                </div>
            ) : null}
        </>
    )
};