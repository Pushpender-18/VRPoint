
export default function Hero() {
	return (
		<section id="hero-section" className="w-screen h-[80vh] mt-16 mb-2 flex items-center justify-center gap-4">
			<div id="hero-txt" className="w-7xl flex flex-col ">
				<h1 className="w-2xl text-7xl font-bold text-[#43A7CB]">Explore the Virtual Reality-verse</h1>
				<h3 className="w-xl mt-2 text-2xl text-[#BED1D9] font-light">Discover, collect, and trade unique virtual reality experiences.</h3>
				<div className="w-2xs bg-[#43A7CB] text-[#06121B] flex justify-center items-middle mt-16 py-4 px-8 rounded-2xl font-bold text-2xl hover:bg-[#43A7CBab]">Start Exploring</div>
			</div>
		</section>
	);
}