import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Camera, Download, Loader, QrCode } from "lucide-react";
const Api_key = "a8RcXBf2AW64EoBseEbuk3IhAC9vnXJFtVXxhb4zLubFXCD5MLG1LnDc";

const App = () => {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("nature");
  const FetchImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        {
          headers: {
            Authorization: Api_key,
          },
        }
      );
      console.log(response.data);
      setPhoto([...photo, ...response.data.photos]);
    } catch (error) {
      toast.error("failed to fetch image", error);
    } finally {
      setLoading(false);
    }
  };
  const LoadMore = () => {
    setPage(page + 1);
  };
  const search = (e) => {
    e.preventDefault();
    const q = e.target[0].value.trim();
    setPhoto([]);
    setQuery(q);
  };
  useEffect(() => {
    FetchImage();
  }, [page, query]);
  return (
    <div className="min-h-screen flex items-center  flex-col bg-gray-100 py-8 gap-12">
      <div className="flex items-center space-x-3">
        <Camera className="text-[#f75a4f] " size={35} />
        <h1 className="text-4xl font-bold text-[#22f40e52] uppercase">
          Image Gallery
        </h1>
      </div>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Search image here.."
          className="px-4 p-2 rounded-l-lg  bg-white focus:outline-[#74C4E7] w-80"
        />
        <button className="bg-gradient-to-b from-[#4faef7] to-[#0ebd6852] p-2  cursor-pointer rounded-r-lg text-white px-5 hover:scale-105 transition-transform border-none outline-none">
          Search
        </button>
      </form>
      {photo.length === 0 && (
        <h1 className=" text-3xl font-bold text-center capitalize">Search Result Not Found!</h1>
      )}
      <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12 ">
        {photo.map((item, index) => (
          <div key={index} className=" bg-white rounded-lg overflow-hidden">
            <img
              src={item.src.medium}
              alt={item.alt}
              className="w-full h-[180px] hover:scale-110 transition-transform cursor-pointer object-cover rounded-t-lg duration-300"
            />
            <div className="p-3 ">
              <h1 className="text-lg font-medium text-gray-400 capitalize">
                {item.photographer}
              </h1>
              <a
                target="_blank"
                href={item.src.original}
                className="mt-2 block bg-gradient-to-b from-[#4faef7] to-[#0ebd6852] p-1  cursor-pointer rounded-sm text-white px-6 hover:scale-105 transition-transform border-none outline-none w-fit"
              >
                <span className="flex font-extrabold">
                  <Download className="mr-1" />
                  Download
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
      {loading && <Loader className="animate-spin text-[#74C4E7]" size={40} />}
      <button
        onClick={LoadMore}
        className="bg-gradient-to-b p-3 px-16 from-[#4faef7] to-[#0ebd6852] hover:scale-110 transition-transform cursor-pointer rounded-lg text-white duration-300 font-medium "
      >
        Load More
      </button>
      <ToastContainer />
    </div>
  );
};

export default App;
