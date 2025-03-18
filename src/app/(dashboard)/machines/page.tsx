"use client"
import { axiosGet } from "@/utils/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
const imgUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

type ContainerData = {
  id: number;
  image: string;
  title: string;
  number: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
};

const Machines: React.FC = () => {
  const [containerData, setContainerData] = useState<ContainerData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // const fetchContainer = async (page: number) => {
  //   setLoading(true);
  //   try {
  //     const result = await axiosGet(`machine/list?limit=10&&page=${page}`);
  //     if (result.data.status === 200) {
  //       setContainerData(result.data.body); 
  //       setTotalPages(result.data.body.totalPages); 
  //     } else {
  //       toast.error(result.data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to fetch container data. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchContainer(currentPage);
  // }, [currentPage]);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     console.log(currentPage,"currentPage")
  //     setCurrentPage(prevPage => prevPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(prevPage => prevPage - 1);
  //   }
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!containerData) {
    return <div>No data available</div>;
  }

  return (
    <div className="my-8 ">
      {/* <div className="flex flex-col gap-5">
      <h2 className="text-xl xl:text-2xl font-medium mb-4 text-center">Containers</h2>
      <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
        {containerData.map((container) => (
          <div key={container.id}
            className=" flex flex-col bg-[#E9E9E9] gap-3 cursor-pointer"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <div
              className="group border-[1px] rounded-lg bg-[#E9E9E9]  h-[200px] "
            >
              <Image
                src={imgUrl + container.image}
                alt={container.title}
                width={400}
                height={400}
                className="mb-4 h-full w-full object-contain"
              />
            </div>
            <p className="text-black rounded-b-lg text-center text-sm sm:text-base md:text-lg p-4 bg-white text-[14px]">
              Machine Number: {container.number}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full gap-5 mt-4">
        <button
          className="hover:bg-[#006838] text-[#006838] hover:text-white border border-[#006838] py-1 px-4 2xl:px-6 rounded-3xl text-[12px] sm:text-[13px] xl:text-[14px] 2xl:text-[16px] transition duration-300 mr-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="hover:bg-[#006838] text-[#006838] hover:text-white border border-[#006838] py-1 px-4 2xl:px-6 rounded-3xl text-[12px] sm:text-[13px] xl:text-[14px] 2xl:text-[16px] transition duration-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      </div> */}
    </div>
  );
};

export default Machines;
