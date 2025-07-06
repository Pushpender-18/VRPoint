export default function PlayBtn({btnHandler}) {
	return (
		<div className="bg-[#237597] w-8 h-8 ml-3 play-btn hover:bg-[#23759790] active:w-7 active:h-7" onClick={btnHandler}></div>
	);

}