import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const session = await auth();

    if (!session) {
        redirect("/login");
    }


    return (<div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Protected Dashboard</h1>
        <p>{session?.user?.email ? session?.user?.email : "User is not logged in"}</p>
        {
            session?.user?.email && (
                <form action={handleAuth} className="mt-4">
                    <button 
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                        Sign out
                    </button>
                </form>
            )
        }
    </div>
    );
}