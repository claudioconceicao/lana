"use client";
import {Input} from '@heroui/input'
import { useState } from 'react';

const CustomInput = (params: { label: string; placeholder: string }) => {
    const [isHover, setIsHover] = useState(false);

    const handleHover = () => {
        setIsHover(!isHover);
    }

  return (
    <div className="relative border w-full h-1/2 border-gray-100 hover:${handleHover} p-2">
        <label>{params.label}</label>
        <input type='text' onFocus={handleHover} placeholder={params.placeholder} className='h-md border-0'/>
        <Input />
    </div>
  );
};

export default CustomInput;
