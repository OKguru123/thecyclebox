// "use client"
// import Container from "@/components/Dashboard/Container";
// import WelcomeSection from "@/components/Dashboard/WelcomeSection";
// import Layout from "@/components/PageLayout/Layout";
// import BoxRecycle from "../../../assets/images/the-box-recycle.png";
// import Coupon from "@/components/Dashboard/Coupon";
// import WrappedMapComponent from "@/components/Dashboard/WrappedMapComponent";
// import { getLocalStorage } from "@/utils/helperFunctions";
// import { useDispatch, useSelector } from "@/store/hooks";
// import { useEffect } from "react";
// import { getUserMachinesApi } from "@/store/app/machine/MachineSlice";
// import initializeSocket from "@/utils/socket";

// const containers = [
//   { src: BoxRecycle, label: "Container 01" },
//   { src: BoxRecycle, label: "Container 02" },
//   { src: BoxRecycle, label: "Container 03" },
//   { src: BoxRecycle, label: "Container 04" },
//   { src: BoxRecycle, label: "Container 05" },
//   { src: BoxRecycle, label: "Container 06" },
//   { src: BoxRecycle, label: "Container 07" },
//   { src: BoxRecycle, label: "Container 08" },
//   { src: BoxRecycle, label: "Container 09" },
// ];

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const containerData = useSelector((state: any) => state.MachineReducer.machineData)

//   useEffect(() => {
//     dispatch(getUserMachinesApi())
//   }, [])

//   useEffect(() => {
//     const socket = initializeSocket();
//     console.log("this is your data", socket)
//     // Connect to socket and setup listeners

//     socket.on('user_credit_added', (data) => {
//       console.log('User credit added:', data);
//       // setReceivedMessages((prev) => [...prev, data]);
//     });
//   }, []);

//   return (
//     <>
//       <div className="h-full overflow-y-auto">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-start ">
//           Dashboard
//         </h1>
//         <WelcomeSection />
//         <Container containerData={containerData} />
//         <Coupon />
//         <div className="overflow-x-hidden w-full">
//           <h2 className="text-xl xl:text-2xl font-medium mb-4">Map</h2>
//           <WrappedMapComponent containerData={containerData} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

"use client";
import Container from "@/components/Dashboard/Container";
import WelcomeSection from "@/components/Dashboard/WelcomeSection";
import Layout from "@/components/PageLayout/Layout";
import BoxRecycle from "../../../assets/images/the-box-recycle.png";
import Coupon from "@/components/Dashboard/Coupon";
import WrappedMapComponent from "@/components/Dashboard/WrappedMapComponent";
import { getLocalStorage } from "@/utils/helperFunctions";
import { useDispatch, useSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getUserMachinesApi } from "@/store/app/machine/MachineSlice";
import initializeSocket from "@/utils/socket";
import { getCreditScoreApi } from "@/store/app/credit/CreditSlice";

const containers = [
  { src: BoxRecycle, label: "Container 01" },
  { src: BoxRecycle, label: "Container 02" },
  { src: BoxRecycle, label: "Container 03" },
  { src: BoxRecycle, label: "Container 04" },
  { src: BoxRecycle, label: "Container 05" },
  { src: BoxRecycle, label: "Container 06" },
  { src: BoxRecycle, label: "Container 07" },
  { src: BoxRecycle, label: "Container 08" },
  { src: BoxRecycle, label: "Container 09" },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const containerData = useSelector(
    (state: any) => state.MachineReducer.machineData
  );

  // Add loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [successdata, setSuccessData] = useState<any>({});

  useEffect(() => {
    dispatch(getUserMachinesApi());
    const checkmark = document.querySelector(".checkmark");
    if (checkmark) {
      checkmark.classList.add("draw");
    }
  }, []);

  useEffect(() => {
    const socket = initializeSocket();

    const userData = localStorage.getItem("userInfo");
    if (userData) {
      const email = JSON.parse(userData).email;

      socket.emit("register_user", email);
    }

    socket.on("user_credit_added", (data) => {
      console.log("🎉 Credit Added: ", data);
      if (data.success) {
        dispatch(getCreditScoreApi());
      }
      setSuccessData(data);
      setIsLoading(false);
    });

    return () => {
      socket.off("user_credit_added");
    };
  }, []);

  const handleClose = () => {
    setSuccessData({});
  };

  return (
    <>
      <div className="h-full overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-start ">
          Dashboard
        </h1>
        <WelcomeSection />
        <Container containerData={containerData} setIsLoading={setIsLoading} />
        <Coupon />
        <div className="overflow-x-hidden w-full">
          <h2 className="text-xl xl:text-2xl font-medium mb-4">Map</h2>
          <WrappedMapComponent containerData={containerData} />
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
          <div className="flex flex-col items-center">
            <div id="loading-container">
              <svg
                className="loading-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 160 160"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="55"
                  fill="none"
                  stroke="green"
                  strokeWidth="20"
                />
                <g transform="translate(80, 80)">
                  <circle
                    cx="0"
                    cy="0"
                    r="55"
                    fill="none"
                    stroke="white"
                    strokeWidth="12"
                    strokeDasharray="0, 345"
                    strokeLinecap="round"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0"
                      to="360"
                      begin="0s"
                      dur="0.75s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-dasharray"
                      values="0, 345; 172.5, 172.5; 0, 345"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              </svg>
            </div>
            <p className="text-black text-2xl font-bold dots">
              Processing
              <span className="dots-container">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </span>
            </p>
          </div>
        </div>
      )}

      {/* {/ Success message with credit points /} */}
      {!isLoading && successdata.success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className=" p-6 rounded-lg text-center shadow-lg bg-white">
            <h2 className="text-black text-2xl font-bold mb-4">
              {successdata.message}
            </h2>
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
            <div className="checkmark-circle">
              <div className="background bg-[#5b8e16]"></div>
              <div className="checkmark draw"></div>
            </div>
            <div className="mb-3">
              <span className="zoom-text font-bold text-black">
                Congratulations🥳
              </span>
            </div>
            <p className="text-lg text-black">
              You got:{" "}
              <strong className="font-bold text-xl">
                {successdata?.body?.point}
              </strong>{" "}
              points
            </p>
            <p className="text-lg text-black">
              Your updated credit points:{" "}
              <strong>{successdata?.body?.totalPoint}</strong>
            </p>
            <button
              onClick={handleClose}
              className="mt-4 text-white py-2 px-4 rounded-lg bg-[#5b8e16]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
