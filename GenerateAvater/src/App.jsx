import React, { useEffect, useState } from "react";
import { ArrowUpRight, Download, Copy } from "lucide-react";

import {toast, ToastContainer} from "react-toastify"

const DATA = [
  {
    lable: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    lable: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    lable: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },

  {
    lable: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    lable: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    lable: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    lable: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women",
  },
];

const App = () => {
  const [src, setsrc] = useState(null);
  const [option, setoption] = useState("male");
  const genrateNumrandom = () => {
    const random = Math.floor(Math.random() * 99) + 1;
    return random;
  };
  const Generate = () => {
    const obj = DATA.find((i) => i.value === option);
    const url = obj.url;
    if (option === "male" || option === "female") {
      const imageUrl = `${url}/${genrateNumrandom()}.jpg`;
      setsrc(imageUrl);
    } else {
      const uniqueUrl = Date.now();
      const imageUrl = `${url}${uniqueUrl}`;

      setsrc(imageUrl);
    }
  };
  const Downloads=(url)=>{
    const a=document.createElement("a")
    a.href=url
    a.download=`${Date.now()}.jpg`
    a.click()
    a.remove()
  }
  const copy=()=>{
    navigator.clipboard.writeText(src)
    toast.success("Image Url copied",{position:"top-center"})
  }
  const ONoptionChange = (e) => {
    const value = e.target.value;
    setoption(value);
  };
  useEffect(() => {
    Generate();
  }, [option]);

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center text-white overflow-hidden px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 p-6 sm:p-10 flex flex-col items-center gap-6">
        
        {/* Avatar Image */}
        <img
          src={src || "/avtar.webp"}
          alt="Avatar"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-red-300 object-cover"
        />

        {/* Title & Description */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Avatar Generator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Generate unlimited avatars for your website.
          </p>
        </div>

        {/* Dropdown & URL Display */}
        <div className="w-full space-y-4">
          <select
            className="bg-slate-800 border border-slate-100 rounded-md p-2 w-full cursor-pointer text-sm sm:text-base"
            value={option}
            onChange={ONoptionChange}
          >
            {DATA.map((item, index) => (
              <option key={index} value={item.value}>
                {item.lable}
              </option>
            ))}
          </select>
          <div className="bg-slate-900/60 w-full py-3 px-2 rounded-lg text-xs sm:text-sm text-slate-400 break-all">
            {src}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
          <button
            className="bg-gradient-to-r from-rose-500 to-orange-400 font-medium rounded-lg px-4 py-2 sm:px-5 sm:py-3 cursor-pointer hover:scale-105 transition-transform border-none flex items-center justify-center"
            onClick={Generate}
          >
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Change
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-orange-300 font-medium rounded-lg px-4 py-2 sm:px-5 sm:py-3 cursor-pointer hover:scale-105 transition-transform border-none flex items-center justify-center"
            onClick={() => Downloads(src)}
          >
            <Download className="mr-1 h-4 w-4" />
            Download
          </button>
          <button
            className="bg-gradient-to-r from-rose-500 to-cyan-400 font-medium rounded-lg px-4 py-2 sm:px-5 sm:py-3 cursor-pointer hover:scale-105 transition-transform border-none flex items-center justify-center"
            onClick={() => copy(src)}
          >
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
