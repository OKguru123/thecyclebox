import React from 'react';
import Image from 'next/image';
import RecycleLoaderGif from '../../../assets/images/recycle loader.gif'; // Update with your correct path

const RecycleLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <Image
                src={RecycleLoaderGif}
                alt="Loading..."
                className="w-40 h-40 lg:w-52 lg:h-52"
            />
        </div>
    );
};

export default RecycleLoader;
