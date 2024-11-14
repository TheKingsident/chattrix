import Comments from "@/components/Comments";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-gray-900 flex flex-col min-h-screen">

      <Header />
      
      <main className="flex flex-1 items-center justify-center">
        <Comments />
      </main>

      <Footer />
      
    </div>
  );
}
