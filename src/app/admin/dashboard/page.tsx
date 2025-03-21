"use client";
import React, { useEffect, useState } from "react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupsIcon from "@mui/icons-material/Groups";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink"; // Use this as an example icon
import LiquorIcon from "@mui/icons-material/Liquor"; // Use this as an example icon
import bottel from "../../../assets/images/plastic.svg";
import Mbottel from "../../../assets/images/matelB.svg";
import { useDispatch } from "@/store/hooks";
import { getItemsApi } from "@/store/app/admin/DashboardSlice";
import Image from "next/image";
import RecycleLoader from "@/components/Common/Loader";
import { Skeleton } from "@mui/material";
// import { Edit } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EditMaterialForm from "@/components/EditMaterialForm/EditMaterialForm";

interface ItemsType {
  activeUser: number;
  inActiveUser: number;
  userThisMonth: number;
  userLastMonth: number;
  machine: number;
  giftRequest: number;
  giftThisMonthRequest: number;
  giftLastMonthRequest: number;
  totalCreditScore: number;
  materialPlastic: number;
  materialaluminium: number;
  materialGlass: number;
  materialThisMonth: number;
  materialThisLast: number;
  materialTotal: number;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<ItemsType>();
  const [openEditMaterial, setOpenEditMaterial] = useState(false);
  const getData = async () => {
    const result = await dispatch(getItemsApi());

    setItems(result);
  };
  useEffect(() => {
    getData();
  }, []);

  const data = [
    {
      title: "Total Recycled Bottel",
      thisMonth: items?.materialThisMonth,
      lastMonth: items?.materialThisLast,
      allTime: items?.materialTotal,
      icon: <Image src={Mbottel} width={85} height={80} alt={"Bottel"} />,
    },
    {
      title: "Total Users",
      thisMonth: items?.userThisMonth || 0,
      lastMonth: items?.userLastMonth || 0,
      allTime: (items && items?.activeUser + items?.inActiveUser) || 0,
      icon: <GroupsIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
    },
    {
      title: "Total Gift Request",
      thisMonth: items?.giftThisMonthRequest,
      lastMonth: items?.giftLastMonthRequest,
      allTime: items?.giftRequest,
      icon: <CardGiftcardIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
    },
    {
      title: "Materials Collected",
      materials: [
        {
          name: "Aluminum",
          count: items?.materialaluminium,
          icon: <BatteryStdIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          name: "Plastic",
          count: items?.materialPlastic,
          icon: <Image src={bottel} width={70} height={70} alt={"Bottel"} />,
        },
        {
          name: "Glass",
          count: items?.materialGlass,
          icon: <LiquorIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
      ],
    },
  ];

  if (!items && items == undefined) {
    return (
      // <RecycleLoader />
      <div className="">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-start lg:p-4 ">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg ">
              <div
                className="mb-4 border-b-2 py-3 px-3 rounded-t-lg"
                style={{
                  background:
                    "linear-gradient(93deg, rgba(16,120,56,1) 0%, rgba(84,165,62,1) 100%)",
                }}
              >
                <h3 className="text-xl font-semibold text-white ">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center pt-3 pb-5 px-3">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  className="w-full"
                  height={220}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-start ">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-4">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg ">
            <div
              className="mb-4 border-b-2 py-3 px-3 rounded-t-lg flex justify-between items-center"
              style={{
                background:
                  "linear-gradient(93deg, rgba(16,120,56,1) 0%, rgba(84,165,62,1) 100%)",
              }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {item.title}
              </h3>
              {item.title === "Materials Collected" && (
                <EditIcon
                  onClick={() => setOpenEditMaterial(true)}
                  className="ml-2 text-white text-lg sm:text-xl cursor-pointer hover:text-gray-200 transition-colors duration-200"
                />
              )}
            </div>

            {item.materials ? (
              <div className="px-4 py-5 grid grid-cols-3 gap-4">
                {item.materials.map((material, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-5"
                  >
                    <p className="text-sm font-semibold text-gray-500">
                      {material.name}
                    </p>
                    <div className="rounded-full bg-[#f2f9ff] border-2 border-[green] w-20 h-20 flex justify-center items-center">
                      {material.icon}
                    </div>
                    <p className="text-xl font-bold text-gray-800 mt-2">
                      {material.count}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center pt-3 pb-5 px-3">
                <div className="flex-1 flex flex-col justify-center items-center gap-3 border-r border-[green] pr-2">
                  <p className="text-sm lg:text-lg font-semibold text-gray-500">
                    This Month
                  </p>
                  <div className="rounded-full bg-[#f2f9ff] border-2 border-[green] w-32 h-32 lg:w-40 lg:h-40 flex flex-col justify-center items-center gap-2 lg:gap-4">
                    {item.icon}
                    <p className="text-xl lg:text-2xl font-bold text-gray-800">
                      {item.thisMonth}
                    </p>
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="flex flex-col gap-10">
                    <div className="text-center">
                      <p className="text-xl lg:text-2xl font-bold text-gray-800">
                        {item.lastMonth}
                      </p>
                      <p className="text-sm lg:text-lg font-semibold text-gray-500">
                        Last Month
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl lg:text-2xl font-bold text-gray-800">
                        {item.allTime}
                      </p>
                      <p className="text-sm lg:text-lg font-semibold text-gray-500">
                        All Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {openEditMaterial && (
        <EditMaterialForm
          open={openEditMaterial}
          onClose={() => setOpenEditMaterial(false)}
          onSubmit={(data) => {
            // console.log("Updated Materials:", data);
            // Update your materials state or trigger an API call as needed
            getData();
          }}
          // totalRecycledBottle={items?.materialTotal}
          // existingMaterials={{
          //   aluminum: items?.materialaluminium,
          //   plastic: items?.materialPlastic,
          //   glass: items?.materialGlass,
          // }}
        />
      )}
    </div>
  );
};

export default Dashboard;
