import React from "react";
import Image from "next/image";
import LeftBottle from "../../assets/images/redeem-left-bottle.png";
import RightBottle from "../../assets/images/redeem-right-bottle.png";
import RedeemBg from "../../assets/images/redeem-bg.png";
import { useRouter } from "next/navigation";

const Coupon: React.FC = () => {
  const router = useRouter();
  const data = {
    heading: "Redeem your Coupons",
    btnText: "Redeem",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${RedeemBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`bg-[#8cc63f] rounded-xl px-0 py-4 xs:py-0 sm:py-3 lg:py-0 md:px-4 lg:p-4  flex items-center justify-between space-y-0 space-x-6 mb-10 lg:mb-[3rem]`}
    >
      <div className="flex justify-start w-auto">
        <Image
          src={LeftBottle}
          alt="Bottle Icon"
          className="w-[200px] sm:w-[120px] lg:w-[160px] xl:w-[200px] hover:scale-110 transition duration-300 delay-150 hover:delay-100 "
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
        <div className="text-center lg:text-left flex-grow">
          <h2 className="text-white text-[10px] xs:text-[15px] sm:text-[10px] md:text-[16px] lg:text-[22px] xl:text-[28px] ">
            {data.heading}
          </h2>
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto ">
          <button onClick={() => { router.push("/gift") }} className="bg-white text-black py-1 sm:py-2 lg:py-2 px-4 sm:px-6 lg:px-10 rounded-full shadow-md hover:bg-gray-200  text-[10px] xs:text-[14px] sm:text-[12px] md:text-[15px] lg:text-[16px] hover:scale-110 transition duration-100 delay-150 hover:delay-100 ">
            {data.btnText}
          </button>
        </div>
      </div>
      <div className="flex justify-end w-auto">
        <Image
          src={RightBottle}
          alt="Bottle Icon"
          className="w-[200px] sm:w-[120px] lg:w-[160px] xl:w-[200px] hover:scale-110 transition duration-300 delay-150 hover:delay-100 "
        />
      </div>
    </div>
  );
};

export default Coupon;
