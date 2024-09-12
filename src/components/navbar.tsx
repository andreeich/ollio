import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div
			className={cn(
				"z-50  fixed top-0 w-full h-navbar transition-all",
				"bg-base-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm",
			)}
		>
			<div className="container flex items-center justify-between h-full w-full">
				<Link to="/">
					<img
						src="/logo.svg"
						width={78}
						height={32}
						className="dark:hidden"
						alt="ExpertSync"
					/>
					<img
						src="/logo-white.svg"
						width={78}
						height={32}
						className="hidden dark:block"
						alt="ExpertSync"
					/>
				</Link>
			</div>
		</div>
	);
};
