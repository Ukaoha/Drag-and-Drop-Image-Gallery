import React from 'react';
import { ColorRing } from "react-loader-spinner";
import './Loader.css'
import { CircleLoader } from 'react-spinners';


const Loader = () => {
    return (
        <div className='wrapper'>
        <div className='loader'>
            {/* <ColorRing 
            visible={true}
            /> */}
            <CircleLoader color='blue' 

   size={50} />
            </div>
        </div>

    );
}

export default Loader;
