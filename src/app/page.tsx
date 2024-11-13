import Comments from "@/components/Comments";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 flex flex-col min-h-screen">

      <header className="p-4 bg-gray-800 text-white text-center">
      </header>
      
      <main className="flex flex-1 items-center justify-center">
        <Comments />
      </main>

      <footer className="p-4 bg-gray-800 text-white text-center">
      </footer>
      
    </div>
  );
}
