import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AmbientLight } from "three";

export default function Player() {
	function closeBtnHandler() {
		sessionStorage.removeItem("player-model-url");
		navigator("/home/");
	}
	const navigator = useNavigate();

	const modelUrl = sessionStorage.getItem("player-model-url");
	let model = null;
	if (modelUrl) {
		model = useGLTF(modelUrl);
	} else {
		useEffect(() => {
			navigator("/home/");
		})
	}

	return (
		<div className="w-screen h-screen bg-black relative">
			<div className="h-12 text-red-500 font-bold text-4xl flex justify-end py-4 px-8 hover:text-red-600 active:text-red-700" onClick={closeBtnHandler}>X</div>

			<Canvas>
				<ambientLight intensity={10}></ambientLight>
				<OrbitControls></OrbitControls>
				<mesh >
					<primitive object={model.scene}></primitive>
				</mesh>
			</Canvas>
		</div>);
}