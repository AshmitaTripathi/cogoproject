import Link from "next/link";

export default function GoBackButton () {
    return (
      <div className="mt-4">
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go back
        </Link>
      </div>
    );
  };
