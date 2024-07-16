import Link from 'next/link';

const FindRates = ({ optionSelected }) => {
  return (
    <div className="mt-4" style={{marginTop: '45px'}}>
      <Link href="/${optionSelected}" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         Find Rates
      </Link>
    </div>
  );
};

export default FindRates;