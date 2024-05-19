import { ReactNode } from 'react';
import Logo from '@/components/shared/Logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<section className="w-full md:max-w-7xl mx-auto flex items-center flex-col justify-between min-h-screen">
				<Logo />
				<main>{children}</main>
				<footer>
					<p>{new Date().getFullYear()}. All rights reserved</p>
				</footer>
			</section>
		</>
	);
}
