import { db } from "@/lib/db";
import { Eye, ArrowDownToLine } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import SearchBar from "@/app/components/handleSearch";
import { Suspense } from "react";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;

  let query = db.from("template").select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data } = await query;
  if (!data) return null;

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4 md:p-10">
      <div className="flex justify-between w-full mb-24">
        <div>
        </div>
        <div>
          <Link href="/uploads" className="text-zinc-400 hover:text-white transition text-sm">
            Upload Your Templates
          </Link>
        </div>
      </div>
      <section className="flex flex-col items-center text-center mt-18 px-4">
        <h1 className="text-5xl md:text-8xl mb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
          Templezzy
        </h1>
        <h2 className="text-2xl md:text-4xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
          Build Eazy With Templezzy
        </h2>
        <p className="max-w-lg text-sm md:text-base text-zinc-400">
          Discover a curated collection of 25+ high-quality templates designed
          to speed up your workflow and elevate your next big project.
        </p>
      </section>

      <Suspense fallback={<div className="mt-24 h-[74px] w-full max-w-lg" />}>
        <SearchBar />
      </Suspense>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 md:mt-35 w-full max-w-7xl">
        {data?.map((datas) => (
          <div
            key={datas.id}
            className="bg-zinc-950 border border-zinc-900 p-5 w-full md:w-120 mx-auto flex flex-col h-full"
          >
            <img
              src={
                datas.preview_url ||
                "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
              }
              alt={datas.name}
              width={240}
              height={720}
              className="object-cover w-full aspect-video md:aspect-auto"
            />
            <p className="text-2xl md:text-3xl mb-3 font-medium mt-2 text-white truncate">
              {datas.name}
            </p>
            
          
            <div className="flex-grow">
              <p className="text-zinc-400 text-sm md:text-base line-clamp-2">
                {datas.desc}
              </p>
            </div>
      
            <p className="text-zinc-500 text-xs md:text-sm mt-3">
              Author : {datas.author}
            </p>
            
            <div className="flex items-center gap-4 flex-wrap mt-auto">
              <button className="w-fit mt-3 text-sm underline">
                <a
                  href={datas.preview_url || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-2 font-medium"
                >
                  Preview <Eye size={18} className="inline-block" />
                </a>
              </button>
              <button className="w-fit mt-3 text-sm md:text-md underline">
                <a
                  href={datas.repo_url || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-2 font-medium"
                >
                  Downloads{" "}
                  <ArrowDownToLine size={18} className="inline-block" />
                </a>
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}