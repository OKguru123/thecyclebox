"use client";
import UserFormDialog from "@/components/Common/AddUserForm";
import Table from "@/components/Common/Table";
import { deleteUserApi, getUsersApi } from "@/store/app/admin/AdminUserSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { getLocalStorage } from "@/utils/helperFunctions";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleId: number;
  state: string;
}

const Users = () => {
  const dispatch = useDispatch();
  const localUserData = getLocalStorage();
  // const [usersList, setUserList] = useState<any[]>([]);
  const [editdata, setEditdata] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const users: IUser[] = useSelector(
    (state: any) => state.AdminUserReducer.data
  );

  const columns = [
    { Header: "No", accessor: "no" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile Number", accessor: "mobile" },
    { Header: "Role", accessor: "role" },
    { Header: "Status", accessor: "status" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let result = await dispatch(getUsersApi());
      setLoading(false);
    };
    fetchData();
  }, []);

  const getUserValue = useMemo(() => {
    if (!users || users.length === 0) return [];
    return users
      .filter((ele: IUser) => ele.id !== localUserData.id)
      .map((ele: IUser, index: number) => {
        return {
          no: index + 1,
          id: ele.id,
          name: `${ele.firstName} ${ele.lastName}`,
          email: ele.email,
          mobile: ele.phoneNumber,
          role: ele.roleId === 2 ? "Admin" : "User",
          status:
            ele.state === "Active" ? (
              <span className="text-[#22c55e]"> Active</span>
            ) : (
              <span className="text-[red]"> Inactive</span>
            ),
        };
      });
  }, [users]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditdata({});
  };
  const handleDelete = async (id: string | undefined) => {
    // console.log(id);

    const result = await dispatch(deleteUserApi(id));
    if (result.status === 200) {
      toast.success(result.message);
      await dispatch(getUsersApi());
    }
  };
  const handleEdit = (val: any) => {
    let name = users.find((e) => e.id === val.id);
    setEditdata({
      firstName: name?.firstName,
      lastName: name?.lastName,
      email: name?.email,
      phonenumber: name?.phoneNumber,
      role: name?.roleId === 2 ? "Admin" : "User",
      state: name?.state,
      id: name?.id,
    });
    handleClickOpen();
  };

  const handleSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Handle form submission logic
  };

  return (
    <>
      <div className="max-w-sm pb-4">
        <div className="font-bold text-[25px] mb-2">Users</div>
      </div>
      <div className="h-full overflow-y-auto w-[100%] bg-[white] rounded overflow-hidden shadow-lg p-5">
        <Table
          isLoading={loading}
          isAction={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          columns={columns}
          data={getUserValue}
          buttonText="Add User"
          buttonCallback={handleClickOpen}
        />
      </div>
      {open && (
        <UserFormDialog
          editdata={editdata}
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Users;
