import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";

import geometricalShapesSm from "./assets/geometric-shapes-sm.svg";
import geometricalShapesLg from "./assets/geometric-shapes-lg.svg";

export function MainPage() {
	const isMd = useMediaQuery("(min-width: 768px)");

	return (
		<div className="flex flex-col py-16 md:py-24 gap-16">
			<div className="container flex flex-col gap-8">
				<div className="flex flex-col md:items-center gap-8 md:gap-12">
					<div className="flex flex-col gap-4 md:gap-6 items-center md:text-center">
						<h1 className="font-medium text-display-lg/display-lg md:text-display-xl/display-xl text-gray-900">
							Зручні інструменти для розрахунку методик
						</h1>
						<p className="text-lg/lg sm:text-xl/xl text-gray-600">
							— Проект створений з метою спростити процес підрахунку методик
						</p>
					</div>
					<Button asChild size={isMd ? "2xl" : "xl"} className="md:w-fit">
						<Link to="/methodology-calculator">Розрахувати методику</Link>
					</Button>
				</div>
			</div>
			<div className="container flex flex-col gap-8">
				<img
					width={343}
					height={342}
					className="w-full md:hidden"
					src={geometricalShapesSm}
					alt="geometrical shapes"
				/>
				<img
					width={1216}
					height={304}
					className="w-full hidden md:inline"
					src={geometricalShapesLg}
					alt="geometrical shapes"
				/>
			</div>
		</div>
	);
}
