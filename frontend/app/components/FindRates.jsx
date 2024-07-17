'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createSearch } from '../apicalls/api';


const FindRates = ({ control, handleSubmit }) => {
    const router = useRouter();
    const [Id,setId] = useState(null);

    const handleClick =  async (data) => {
        try{
            const response = await createSearch(data);
            console.log('response from backend:',response)
            setId(response.id);

            router.push(`/price?id=${response.id}`);
    
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="mt-4" style={{marginTop: '45px'}}>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit(handleClick)}
            >
                Find Rates
            </button>
        </div>
    );
};

export default FindRates;
