import { redirect, RedirectType } from "next/navigation";

const Account = () => {

    redirect("/account/personal-info", RedirectType.replace);

    return (
        <>
        </>
     );
}
export default Account;