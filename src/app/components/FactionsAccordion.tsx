"use client";

import React, { useState, useEffect } from 'react';
import allfactions from './characters/AllFactions'
import Image from 'next/image';

const FactionsAccordion: React.FC = () => {

    return (
        <>
            {allfactions.map((fac) => (
                // <div key={fac.id} className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg h-4/5 w-96">
                //     <div className="m-0.5 overflow-hidden rounded-md h-96 flex justify-center items-center">
                //         <div className="w-full h-full object-cover">
                //             <Image src={fac.picture} alt={fac.name} />
                //         </div>
                //     </div>
                //     <div className="p-6 text-center h-52">
                //         <h4 className="mb-1 text-xl font-semibold text-slate-800">
                //             {fac.name}
                //         </h4>
                //         <p className="text-base text-slate-600 mt-4 font-light ">
                //             {fac.description}
                //         </p>
                //     </div>
                // </div>
            <div key={fac.id} className="border-b border-slate-200 w-100">
                <button className="w-full flex justify-between items-center py-5 text-slate-800">
                    <div className="w-20 h-20 object-cover">
                        <Image key={fac.id} src={fac.picture} alt={fac.name} />
                    </div>
                    <span>{fac.name}</span>
                    <span id="icon-1" className="text-slate-800 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path fill-rule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
                <div id="content-1" className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="pb-5 text-sm text-slate-500">
                        {fac.description}
                    </div>
                </div>
            </div>

            ))}

        </>
    )
};

export default FactionsAccordion;