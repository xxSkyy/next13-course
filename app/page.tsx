import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-2xl mx-auto gap-y-4 flex flex-col">
        <h1 className="text-6xl">Journal app, thats all.</h1>
        <p className="text-2xl text-white/70">Track mood and be ok. ok ok </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-500 p-4 rounded-lg text-lg">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
