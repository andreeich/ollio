export const Footer = () => {
	return (
		<footer className="w-full bg-base-white dark:bg-gray-950 py-12 z-50 ">
			<div className="container flex flex-col md:flex-row items-center gap-12 md:gap4 md:justify-between">
				<img
					src="/logo.svg"
					width={78}
					height={32}
					className="dark:hidden"
					alt="Ollio"
				/>
				<img
					src="/logo-white.svg"
					width={78}
					height={32}
					className="hidden dark:block"
					alt="Ollio"
				/>
				<p className="text-md/md text-gray-500">
					© 2024 Ollio. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
