"use client";
import Table from "@/components/Common/Table";
import { getGitRecordApi } from "@/store/app/admin/GiftSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface IUser {
    id: number,
    nickName: string,
    lastName: string,
    email: string,
    totalPoint: number,
    password: string,
    transactionType: string,
    roleId: number,
    point: string,
}

const Users = () => {
    const dispatch = useDispatch();
    const [usersList, setUserList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const users: IUser[] = useSelector((state: any) => state.GiftReducer.giftRecord);

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Total Points', accessor: 'totalPoint' },
        { Header: 'Transaction Type', accessor: 'transactionType' },
        { Header: 'Point', accessor: 'point' }
    ];

    useEffect(() => {
        // console.log(users);
        if (users && users.length > 0) {
            setLoading(false)
            setUserList((users).map((ele: IUser, index: number) => {
                return {
                    id: index + 1,
                    name: `${ele.nickName}`,
                    email: ele.email,
                    totalPoint: ele.totalPoint,
                    transactionType: ele.transactionType,
                    point: ele.point,

                }
            }))
        }
    }, [users])

    useEffect(() => {
        setLoading(true)
        dispatch(getGitRecordApi());
    }, [])


    return (
        <>
            <div className="max-w-sm pb-4">
                <div className="font-bold text-[25px] mb-2">Gift Record</div>
            </div>
            <div className="h-full overflow-y-auto w-[100%] bg-[white] rounded overflow-hidden shadow-lg p-5">
                <Table isLoading={loading} isAction={false} columns={columns} data={usersList} />
            </div>
        </>
    );
}

export default Users;