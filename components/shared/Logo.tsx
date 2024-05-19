'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link
			href={'/'}
			className="text-current/80 text-3xl uppercase font-bold flex items-center pt-2 gap-3"
		>
			<Image src={'/logo.png'} width={50} height={50} className="object-cover" alt="Logo" />
			Amore
		</Link>
	);
}
