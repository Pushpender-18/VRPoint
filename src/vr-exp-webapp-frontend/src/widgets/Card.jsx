export default function Card({ headingTxt, subheadingTxt }) {
	return (
		<div className="flex flex-col my-28 p-14 bg-gradient-to-bl from-[#43A7CB15] to-[#43A7CB05] border-[#BED1D9] border-1 rounded-2xl">
			<div className="w-28 h-28 bg-[#ffffff10] mb-12 rounded-full"></div>
			<h1 className="text-5xl text-[#43A7CB] font-semibold">{headingTxt}</h1>
			<h3 className="w-3xs text-[#BED1D9] font-light mt-3">{subheadingTxt}</h3>
		</div>
	);
}