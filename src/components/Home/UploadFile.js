/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

export default function UploadFile({ selectFile, active }) {
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        if (!active) {
            setThumbnail("");
        }
    }, [active]);

    const handleFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setThumbnail(undefined);
            return;
        } else {
            setThumbnail(URL.createObjectURL(e.target.files[0]));
            selectFile(e.target.files[0]);
        }
    };
    return (
        <div className={`h-32 w-56 rounded-lg bg-white shadow-md fixed ml-10 ${active ? "block" : "hidden"}`} style={{ bottom: "100px" }}>
            <div className="flex items-center justify-center">
                <label className="w-64 flex flex-col items-center px-4 py-6 text-blue cursor-pointer hover:text-blue-600">
                    {thumbnail ? (
                        <img src={thumbnail} className="h-20 w-auto object-cover" />
                    ) : (
                        <>
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-base leading-normal">Select a file</span>
                        </>
                    )}
                    <input type="file" className="hidden" onChange={(e) => handleFile(e)} />
                </label>
            </div>
        </div>
    );
}
