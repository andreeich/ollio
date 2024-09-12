import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";

import image404Sm from "./assets/image-404-sm.jpg";
import image404Lg from "./assets/image-404-lg.jpg";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function ErrorPage() {
	const isMd = useMediaQuery("(min-width: 768px)");

	return (
		<div className="relative min-h-screen h-full pt-navbar flex flex-col">
			<Navbar />
			<main className="flex-1">
				<div className="flex flex-col md:flex-row md:items-center py-16 md:py-24 gap-16 md:gap-20">
					<div className="container flex flex-col gap-8">
						<div className="flex flex-col gap-8 md:gap-12">
							<div className="flex flex-col gap-4 md:gap-6 items-start">
								<h1 className="font-semibold text-display-lg/display-lg md:text-display-xl/display-xl text-gray-900">
									Помилка 404
								</h1>
								<p className="text-lg/lg sm:text-xl/xl text-gray-600">
									Нам шкода, але схоже, що виникла помилка. Спробуйте
									повернутись до головної сторінки.
								</p>
							</div>
							<Button asChild size={isMd ? "2xl" : "xl"} className="md:w-fit">
								<Link to="/">Повернутись до головної</Link>
							</Button>
						</div>
					</div>
					<div className="container flex flex-col gap-8">
						<img
							width={343}
							height={240}
							className="w-full md:hidden"
							src={image404Sm}
							alt="404"
						/>
						<img
							width={696}
							height={912}
							className="w-full hidden md:inline"
							src={image404Lg}
							alt="404"
						/>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
