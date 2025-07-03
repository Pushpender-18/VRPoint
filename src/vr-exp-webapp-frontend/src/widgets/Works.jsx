import Card from "./Card";

export default function Works() {
	return (
		<section id="works" className="w-7xl mx-auto pt-16 flex flex-col items-center">
			<h1 className="text-6xl text-[#43A7CB] font-bold">How It Works?</h1>
			<div className="w-7xl flex justify-between">
				<Card imgPath="icons/compass.png" headingTxt="Explore" subheadingTxt="Lose Yourself in Unique, Immersive VR Experiences" />
				<Card imgPath="icons/edit.png" headingTxt="Create" subheadingTxt="Fuel your imagination — design realities no one’s seen before." />
				<Card imgPath="icons/shopping-cart.png" headingTxt="Buy/Sell" subheadingTxt="Not Just Assets. Trade Entire Realities" />
			</div>
		</section >
	);
}