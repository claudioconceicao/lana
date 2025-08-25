import Link from "next/link";

const LinkButton = ({ params }: { params: { listingId: string } }) => {
    return ( 
        <Link href="/" className="inline-block px-4 py-2 text-white rounded hover:bg-blue-600 transition-colors">
            
        </Link>
     );
}
 
export default LinkButton;