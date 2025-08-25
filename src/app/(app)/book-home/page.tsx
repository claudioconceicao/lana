"use client";
import { useRouter } from "next/navigation";

const BookHome = () => {
    const router = useRouter();

    const handleClick = () => {
        console.log("Order Placed")
        router.push("/")
    }
    return (  
        <>
            <h1>Reservar casa</h1>
            <button onClick={handleClick}></button>
        </>
    );
}
 
export default BookHome;
