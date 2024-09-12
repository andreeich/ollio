import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<div className="relative min-h-screen h-full pt-navbar flex flex-col">
			<Navbar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
