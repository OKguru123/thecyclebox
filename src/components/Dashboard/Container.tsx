// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// type ContainerProps = {
//   containers: {
//     src: string;
//     label: string;
//   }[];
// };
// export type IContainerData = {
//   id: number;
//   image: string;
//   title: string;
//   number: string;
//   latitude: string;
//   longitude: string;
//   createdAt: string;
//   updatedAt: string;
// };

// const imgUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

// const Container = ({ containerData }: { containerData: IContainerData[] }) => {
//   const router = useRouter()



//   // if (containerData.length == 0) {
//   //   return <div>No data available</div>;
//   // }

//   return (
//     <div className="my-8 lg:my-10">
//       <ToastContainer />
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl xl:text-2xl font-medium">Containers</h2>
//         {/* <button className="hover:bg-[#006838] text-[#006838] hover:text-white border border-[#006838] py-1 px-4 2xl:px-6 rounded-3xl text-[12px] sm:text-[13px] xl:text-[14px] 2xl:text-[16px] transition duration-300" onClick={()=>router.push("/dashboard/machines")}>
//           View All
//         </button> */}
//       </div>
//       <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-10">
//         {containerData.length > 0 ? containerData.map((container: IContainerData, index: number) => (
//           <div key={container.id}
//             onClick={() => { console.log("box", container) }}
//             className="rounded-lg flex flex-col bg-[#E9E9E9] gap-3 cursor-pointer "
//             style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
//             <div
//               className="group  border-[1px] bg-[#E9E9E9] h-[200px] rounded-lg  transition-all duration-400 ease-out backface-hidden relative overflow-hidden "
//             >
//               <Image
//                 src={imgUrl + container.image}
//                 alt={container.title}
//                 width={400}
//                 height={400}
//                 className="mb-4 h-full w-full object-contain transition duration-100 delay-150 hover:delay-100 absolute z-[1] backface-hidden hover:scale-110 "
//               />

//             </div>
//             <p className="text-black rounded-b-lg text-center text-sm sm:text-base md:text-lg p-2 bg-white text-[14px]">
//               Machine : {container.number}
//             </p>
//           </div>

//         )) : <div>No data available</div>}
//       </div>

//     </div>
//   );
// };

// export default Container;








"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import BoxRecycle from "../../assets/images/box.png";
import { postScanApi } from "@/store/app/machine/MachineSlice";
import { useDispatch } from "@/store/hooks";
import { initializeSocket } from "@/utils/socket";


type ContainerProps = {
  containers: {
    src: string;
    label: string;
  }[];
};

export type IContainerData = {
  id: number;
  image: string;
  title: string;
  number: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
};

const imgUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const Container = ({ containerData, setIsLoading }: { containerData: IContainerData[]; setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<IContainerData | null>(null);
  const dispatch = useDispatch();
  const userData = localStorage.getItem("userInfo")


  const handleContainerClick = (container: IContainerData) => {
    setSelectedContainer(container);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {

    const userData = localStorage.getItem("userInfo")
    // socket.emit('consumer_msg', { selectedContainer });
    if (userData) {
      const user = JSON.parse(userData)
      const payload = {
        email: user.email,
        QRCode: selectedContainer?.title
      }
      try {
        let ScanerData = await dispatch(postScanApi(payload))
        if (ScanerData.success) {
          setIsLoading(true)
        }
        console.log("this is your data", ScanerData);
      } catch (e: any) {
        console.log("this is your error ", e)
      }
    }
    // console.log("Confirmed action for:", selectedContainer);
    setIsModalOpen(false);
    // Add further confirmation logic here
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedContainer(null);
  };

  return (
    <div className="my-8 lg:my-10">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl xl:text-2xl font-medium">Containers</h2>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-10">
        {containerData.length > 0 ? containerData.map((container: IContainerData) => (
          <div key={container.id}
            onClick={() => handleContainerClick(container)}
            className="rounded-lg flex flex-col bg-[#E9E9E9] gap-3 cursor-pointer"
            style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
            <div className="group border-[1px] bg-[#E9E9E9] h-[200px] rounded-lg transition-all duration-400 ease-out relative overflow-hidden">
              <Image
                src={imgUrl + container.image}
                alt={container.title}
                width={400}
                height={400}
                className="mb-4 h-full w-full object-contain transition duration-100 delay-150 absolute z-[1] hover:scale-110"
              />
            </div>
            <p className="text-black rounded-b-lg text-center text-sm sm:text-base md:text-lg p-2 bg-white text-[14px]">
              Machine : {container.number}
            </p>
          </div>
        )) : <div>No data available</div>}
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-72 xs:w-80 sm:w-[27rem] relative shadow-lg">
            <button onClick={handleCancel} className="absolute top-3 right-3 text-white">
              X
            </button>
            <div className="flex flex-col items-center">
              <p className="text-black rounded-b-lg text-center text-sm sm:text-base md:text-lg p-2 text-white text-[14px]">
                Machine : {selectedContainer && selectedContainer.number}
              </p>
              <Image
                src={selectedContainer ? imgUrl + selectedContainer.image : BoxRecycle}
                alt={selectedContainer ? selectedContainer.title : "Machine"}
                width={100}
                height={100}
              // className="mb-4 h-full w-full object-contain transition duration-100 delay-150 hover:delay-100 absolute z-[1] backface-hidden hover:scale-110 "
              />

              <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
              <p className="text-center mb-6">Are you sure you want to open this machine door?</p>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white rounded pl-[12px] pr-[14px] py-2 text-[14px]"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
