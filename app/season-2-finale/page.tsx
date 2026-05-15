import Link from "next/link";

const finalists = [
  {
    id: 1,
    name: "Contestant 1",
    image: "/finalist1.jpg",
  },
  {
    id: 2,
    name: "Contestant 2",
    image: "/finalist2.jpg",
  },
  {
    id: 3,
    name: "Contestant 3",
    image: "/finalist3.jpg",
  },
  {
    id: 4,
    name: "Contestant 4",
    image: "/finalist4.jpg",
  },
  {
    id: 5,
    name: "Contestant 5",
    image: "/finalist5.jpg",
  },
  {
    id: 6,
    name: "Contestant 6",
    image: "/finalist6.jpg",
  },
  {
    id: 7,
    name: "Contestant 7",
    image: "/finalist7.jpg",
  },
  {
    id: 8,
    name: "Contestant 8",
    image: "/finalist8.jpg",
  },
  {
    id: 9,
    name: "Contestant 9",
    image: "/finalist9.jpg",
  },
  {
    id: 10,
    name: "Contestant 10",
    image: "/finalist10.jpg",
  },
];

export default function Season2FinalePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden px-6 py-16">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 blur-[160px] rounded-full"></div>

      </div>

      {/* HOME */}
      <div className="mb-12">

        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500 transition font-bold"
        >
          HOME
        </Link>

      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">

        <h1 className="text-5xl md:text-8xl font-black text-cyan-400">
          SEASON 2 FINALE
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Vote for South Africa's Top 10 finalists.
        </p>

      </div>

      {/* FINALISTS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

        {finalists.map((finalist) => (

          <div
            key={finalist.id}
            className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-300"
          >

            <div className="h-[320px] overflow-hidden">

              <img
                src={finalist.image}
                alt={finalist.name}
                className="w-full h-full object-cover"
              />

            </div>

            <div className="p-6 text-center">

              <h2 className="text-2xl font-black text-white">
                {finalist.name}
              </h2>

              <button className="mt-6 w-full px-5 py-4 rounded-2xl bg-pink-500 hover:bg-pink-400 transition font-black">

                VOTE NOW

              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}