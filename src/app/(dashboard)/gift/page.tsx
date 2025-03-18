"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { getCreditScoreApi, postDeductCount } from '@/store/app/credit/CreditSlice';
import RecycleLoader from '@/components/Common/Loader';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Image from 'next/image';
import backArrow from "../../../assets/images/back-arrow.svg";
import giftImage from "../../../assets/images/pana.png"; // Assuming you have a gift image.
import { useRouter } from 'next/navigation';
import { getLocalStorage } from '@/utils/helperFunctions';
import CommonButton from '@/components/Common/CommonButton';

interface GiftPageProps {
    selectedCard: {
        redemptionInstructions: string;
    } | null;
}

const GiftPage: React.FC<GiftPageProps> = ({ selectedCard }) => {
    const localData = getLocalStorage();
    const dispatch = useDispatch();
    const userPoints = useSelector((state: any) => state.CreditReducer.creditScore);

    const [valorCheck, setValorCheck] = useState({ key: 0, value: 5 });
    const [showPoints, setShowPoints] = useState({
        deductedPoints: 0,
        totalPoint: 0
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleBack, setIsModalVisibleBack] = useState({ show: false, msg: '' });
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getValue();
    }, [dispatch]);

    const getValue = async () => {
        let val = await dispatch(getCreditScoreApi());
        setShowPoints(prev => ({ ...prev, totalPoint: val?.totalPoints }));
    }

    const onSelectedItemsChange = (event: any) => {
        const key = event.target.value;
        const valueMap: any = {
            '500': 5,
            '1000': 10,
            '2000': 20,
            '5000': 50,
        };
        setValorCheck({ key: parseInt(key), value: valueMap[key] });
    };

    const handleCheck = async () => {
        setIsModalVisible(false);
        setIsModalVisibleBack({ show: false, msg: '' });
        if (userPoints < valorCheck.key) {
            setIsModalVisibleBack({ show: true, msg: "You don't have enough credit points" });
            return;
        }

        const email = localStorage.getItem("email");
        setLoader(true);

        try {
            const apiData = { email: localData.email, deductPoints: valorCheck.key };
            const data: any = await dispatch(postDeductCount(apiData));

            setLoader(false);

            if (data.success) {
                setShowPoints({ totalPoint: data.body.totalPoint, deductedPoints: data.body.deductedPoints });
                toggleModal();
            } else {
                setIsModalVisibleBack({ show: true, msg: data.message });
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleModalBack = () => {
        setIsModalVisibleBack({ ...isModalVisibleBack, show: false });
    };

    if (loader) {
        return <RecycleLoader />;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <button onClick={() => router.back()} className="flex items-center gap-2 self-start text-gray-700 hover:text-green-600 mb-6">
                <Image src={backArrow} alt="Back" className="w-6 h-6" />
                <h4 className="text-xl sm:text-2xl font-medium">Back</h4>
            </button>

            <div className="w-auto block sm:hidden bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-6" style={{ boxShadow: "-4px 4px 25px 0px #00000040" }}>
                {/* Image Section */}
                <div className="flex justify-center items-center">
                    <div className=" mb-6 w-[50%] xs:w-[40%] sm:w-[30%] 2xl:w-[40%] ">
                        <Image src={giftImage} alt="Gift Card" className="mx-auto w-full " />
                    </div>
                </div>

                {/* Heading & Description */}
                <div className="text-center mb-8">
                    <h1 className="text-xl sm:text-3xl font-bold text-[#006838]">The Box Cycle eGift Card</h1>
                    <p className="text-gray-600 text-xs sm:text-base">This is an electronic gift card that can be used with your choice of a range of major retailers.</p>
                </div>

                {/* Total Points Section */}
                <div className="flex justify-between items-center border-y border-gray-300 py-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Your Total Points</h2>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{showPoints.totalPoint}</span>
                </div>

                {/* Select Value Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-6">
                    <div className="flex flex-col justify-center items-center mb-6 sm:mb-0 w-full sm:w-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-md md:text-md lg:text-xl font-semibold text-gray-800">Select the value of your eGift Card</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center">
                            <FormControl fullWidth className="!mb-4 sm:!mb-0 sm:!mr-4 !w-full sm:!w-48">
                                <InputLabel id="gift-card-select-label">Select Value</InputLabel>
                                <Select
                                    labelId="gift-card-select-label"
                                    id="gift-card-select"
                                    value={valorCheck.key}
                                    label="Select Value"
                                    onChange={onSelectedItemsChange}
                                >
                                    <MenuItem value="500">$5</MenuItem>
                                    <MenuItem value="1000">$10</MenuItem>
                                    <MenuItem value="2000">$20</MenuItem>
                                    <MenuItem value="5000">$50</MenuItem>
                                </Select>
                            </FormControl>

                            <CommonButton onClick={handleCheck} className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto text-md lg:text-lg ">
                                Reedem
                            </CommonButton>
                        </div>
                    </div>

                    {/* Credits Costs & Deducted Points Section */}
                    <div className="flex flex-col items-center justify-center mt-6 sm:mt-0">
                        <div className="relative">
                            {/* This creates the oval-shaped border around the content */}
                            <div className="absolute inset-0 rounded-[100%] border-2 border-black transform rotate-12 w-[170px] h-[90px] lg:w-[210px] lg:h-[100px]"></div>
                            {/* This is the background oval shape */}
                            <div className="bg-[#e0f7e9] text-[#006838] rounded-[100%] flex flex-col items-center justify-center  w-[170px] h-[90px] lg:w-[210px] lg:h-[100px]" >
                                <p className="text-md sm:text-md lg:text-lg font-semibold">Credits costs</p>
                                <p className="text-4xl font-bold">{valorCheck.key}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Section */}
                {isModalVisible && (
                    <div className="modal bg-green-100 p-4 rounded-md shadow-md mt-4">
                        <h3 className="text-lg font-semibold text-green-800">Your eGift-card is on the way!</h3>
                        <p className="text-sm text-green-700">*Your eGift-card will be delivered to your email. Please allow a few minutes to receive it.</p>

                        {/* Show Deducted Points */}
                        {showPoints.deductedPoints && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-green-700">Points Deducted: <span className="text-green-800">{showPoints.deductedPoints}</span></p>
                            </div>
                        )}

                        <Button variant="contained" onClick={toggleModal} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                            Done!
                        </Button>
                    </div>
                )}

                {isModalVisibleBack.show && (
                    <div className="modal bg-red-100 p-4 rounded-md shadow-md mt-4">
                        <h3 className="text-lg font-semibold text-red-800">Sorry!</h3>
                        <p className="text-sm text-red-700">{isModalVisibleBack.msg}</p>
                        <Button variant="contained" onClick={toggleModalBack} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                            Close
                        </Button>
                    </div>
                )}

                {selectedCard && (
                    <div className="mt-6 bg-purple-50 p-4 rounded-md">
                        <div dangerouslySetInnerHTML={{ __html: selectedCard.redemptionInstructions }} />
                    </div>
                )}
            </div>
            <div className="w-auto hidden sm:block bg-white rounded-lg shadow-md p-6 sm:p-5 lg:p-6" style={{ boxShadow: "-4px 4px 25px 0px #00000040" }}>
                {/* Image Section */}
                <div className="flex justify-between items-center">
                    <div className=" mb-6 w-[50%] xs:w-[40%] sm:w-[30%] 2xl:w-[40%] ">
                        <Image src={giftImage} alt="Gift Card" className="mx-auto w-full " />
                    </div>
                    {/* Credits Costs & Deducted Points Section */}
                    <div className="flex flex-col items-center justify-center mt-6 sm:mt-0">
                        <div className="relative">
                            {/* This creates the oval-shaped border around the content */}
                            <div className="absolute inset-0 rounded-[100%] border-2 border-black transform rotate-12 w-[170px] h-[90px] lg:w-[210px] lg:h-[100px]"></div>
                            {/* This is the background oval shape */}
                            <div className="bg-[#e0f7e9] text-[#006838] rounded-[100%] flex flex-col items-center justify-center  w-[170px] h-[90px] lg:w-[210px] lg:h-[100px]" >
                                <p className="text-md sm:text-md lg:text-lg font-semibold">Credits costs</p>
                                <p className="text-4xl font-bold">{valorCheck.key}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heading & Description */}
                <div className="text-center mb-8">
                    <h1 className="text-xl sm:text-3xl font-bold text-[#006838]">The Box Cycle eGift Card</h1>
                    <p className="text-gray-600 text-xs sm:text-base">This is an electronic gift card that can be used with your choice of a range of major retailers.</p>
                </div>

                {/* Total Points Section */}
                <div className="flex justify-between items-center border-y border-gray-300 py-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Your Total Points</h2>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{showPoints.totalPoint}</span>
                </div>

                {/* Select Value Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div className="flex  justify-center items-center w-full sm:w-auto">
                        <h2 className="text-md md:text-md lg:text-xl font-semibold text-gray-800">Select the value of your eGift Card</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center">
                        <FormControl fullWidth className=" sm:!mb-0 !w-full sm:!w-48">
                            <InputLabel id="gift-card-select-label">Select Value</InputLabel>
                            <Select
                                labelId="gift-card-select-label"
                                id="gift-card-select"
                                value={valorCheck.key}
                                label="Select Value"
                                onChange={onSelectedItemsChange}
                            >
                                <MenuItem value="500">$5</MenuItem>
                                <MenuItem value="1000">$10</MenuItem>
                                <MenuItem value="2000">$20</MenuItem>
                                <MenuItem value="5000">$50</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="flex justify-end">
                    <CommonButton onClick={handleCheck} className="bg-green-700 rounded-lg hover:bg-green-800 text-white w-full sm:w-auto text-md lg:text-lg ">
                        Reedem
                    </CommonButton>
                </div>

                {/* Modal Section */}
                {isModalVisible && (
                    <div className="modal bg-green-100 p-4 rounded-md shadow-md mt-4">
                        <h3 className="text-lg font-semibold text-green-800">Your eGift-card is on the way!</h3>
                        <p className="text-sm text-green-700">*Your eGift-card will be delivered to your email. Please allow a few minutes to receive it.</p>

                        {/* Show Deducted Points */}
                        {showPoints.deductedPoints && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-green-700">Points Deducted: <span className="text-green-800">{showPoints.deductedPoints}</span></p>
                            </div>
                        )}

                        <Button variant="contained" onClick={toggleModal} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                            Done!
                        </Button>
                    </div>
                )}

                {isModalVisibleBack.show && (
                    <div className="modal bg-red-100 p-4 rounded-md shadow-md mt-4">
                        <h3 className="text-lg font-semibold text-red-800">Sorry!</h3>
                        <p className="text-sm text-red-700">{isModalVisibleBack.msg}</p>
                        <Button variant="contained" onClick={toggleModalBack} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                            Close
                        </Button>
                    </div>
                )}

                {selectedCard && (
                    <div className="mt-6 bg-purple-50 p-4 rounded-md">
                        <div dangerouslySetInnerHTML={{ __html: selectedCard.redemptionInstructions }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GiftPage;
