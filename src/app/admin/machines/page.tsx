"use client";
import FormDialog from "@/components/Common/AddMachineForm/index";
import Table from "@/components/Common/Table";
import {
  deleteMachinesApi,
  getMachinesApi,
} from "@/store/app/machine/MachineSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Machines = () => {
  const [machineList, setMachineList] = useState([]);
  const [editdata, setEditdata] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const machines = useSelector((state: any) => state.MachineReducer.data);

  useEffect(() => {
    setLoading(true);
    dispatch(getMachinesApi());
  }, [dispatch]);

  useEffect(() => {
    if (machines && machines.length > 0) {
      setLoading(false);
      setMachineList(
        machines?.map((ele: any, index: number) => {
          return {
            ...ele,
            indexNumber: index + 1,
            image: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${ele.image}`,
          };
        })
      );
      // console.log(machines);
    }
  }, [machines]);
  const columns = [
    { Header: "Image", accessor: "image" },
    { Header: "ID", accessor: "indexNumber" },
    { Header: "Title", accessor: "title" },
    { Header: "Machine Number", accessor: "number" },
  ];

  // const data = [
  //   { id: '1', title: 'Machine A', machineNumber: '123', image: 'https://via.placeholder.com/200' },
  //   { id: '2', title: 'Machine B', machineNumber: '456', image: 'https://via.placeholder.com/200' },
  //   // Add more rows as needed
  // ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditdata({});
  };

  const handleEdit = (val: any) => {
    // console.log("Edit", val);
    setEditdata(val);
    handleClickOpen();
  };

  const handleDelete = async (id: string | undefined) => {
    // console.log(`Delete ${id}`);
    const result = await dispatch(deleteMachinesApi(id));
    toast.success(result.message);
    await dispatch(getMachinesApi());
  };

  return (
    <>
      <div className="max-w-sm pb-4">
        <div className="font-bold text-[25px] mb-2">Machine</div>
      </div>
      <div className="h-full overflow-y-auto w-[100%] bg-[white] rounded overflow-hidden shadow-lg p-5">
        <Table
          isLoading={loading}
          isAction={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          columns={columns}
          data={machineList}
          buttonText="Add Machine"
          buttonCallback={handleClickOpen}
        />
      </div>
      {open && (
        <FormDialog editdata={editdata} open={open} onClose={handleClose} />
      )}
    </>
  );
};

export default Machines;
