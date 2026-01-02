import { Button } from "../ui/Button";
import * as React from "react";

export const Header= () =>{
    return (
        <>
        <header className="w-full bg-white shadow-sm py-4 px-8 flex flex-col items-center justify-between">
            <div className="announcement">
                <p className="text-sm text-gray-600">Welcome to the English Learning App!</p>
            </div>
            <div className="main-header">
                <h1 className="text-2xl font-bold text-gray-800">English Learning App</h1>
            
                <div className="action">
                    <Button variant="primary">Login</Button>
                    <Button variant="outline" className="ml-4">Sign Up</Button>
                </div>
            </div>
            
        </header>
        </>
    )
}