import Link from 'next/link';

const SeeSearchesButton = () => {
  return (
    <div className="mt-4">
      <Link href="/searches" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          See Searches
      </Link>
    </div>
  );
};

export default SeeSearchesButton;