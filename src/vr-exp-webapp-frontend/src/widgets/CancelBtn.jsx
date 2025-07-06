export default function CancelBtn({btnHandler}) {
	return (
		<div className="w-12 h-12 bg-[#D1495B20] flex justify-center items-center border-6 border-[#D1495B] rounded-full text-[#D1495B] text-2xl font-bold hover:bg-[#D1495B30] active:text-[19px]" onClick={btnHandler}>X</div>
	);
}