"use client";

// import { 
// 	// useState, 
// 	useEffect } from 'react';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import Sec2Img from './images/service-sec2-img.png';
import Sec3Img1 from './images/service-sec3-img1.png';
import Sec3Img2 from './images/service-sec3-img2.png';
import Sec3Img3 from './images/service-sec3-img3.png';
import Sec3Img4 from './images/service-sec3-img4.png';
import Sec3Img5 from './images/service-sec3-img5.png';
import Sec3Img6 from './images/service-sec3-img6.png';
import Sec4Stars from './images/service-sec4-stars.png';
import Sec4Liam from './images/service-sec4-liam.png';
import Sec4Hasan from './images/service-sec4-hasan.png';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPeopleGroup } from 'react-icons/fa6';

import CustomImage from '../(site)/_components/Image';
// import React from 'react';

const service = () => {
	

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY'
	// 			);
	// 			setMovies(response.data.results);
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	return (
		<div>
			<section className="px-16 py-24 flex items-center justify-between">
				<div className="">
					<p className="text-[#D3874A]">SEAMLESS</p>
					<h1 className="text-[40px] pb-[24px] pt-[16px] text-[#252A2E]">
						Comprehensive Wedding Planning <br /> Services for Your Dream Day
					</h1>
					<p className="text-[18px] text-[#252A2E]">
						Our Full Wedding Planning service offers comprehensive assistance to couples, <br />{' '}
						ensuring every detail is taken care of. From venue selection to vendor coordination,{' '}
						<br />
						well make your dream wedding a reality.
					</p>
				</div>
				{/* <Sec2Img /> */}
				<CustomImage imgUrl={Sec2Img} alt={"images"}/>
				{/* <img src={Sec2Img} alt="" /> */}
			</section>
			<section className="px-16 py-28 text-center flex flex-col items-center gap-[80px]">
				<div className="">
					<p className="text-[#D3874A]">SERVICES</p>
					<h1 className="text-[40px] pb-[24px] pt-[16px] text-[#252A2E]">The services we offer</h1>
				</div>
				<div className="grid grid-cols-3 gap-12">
					<div className="bg-[#DBDBDB] px-[30px] py-[30px] flex flex-col items-center rounded">
					<CustomImage imgUrl={Sec3Img1} alt={"images"}/>
						{/* <img src={Sec3Img1} alt="" /> */}
						<h3 className="font-semibold text-[24px] py-4">Wedding Ceremony</h3>
						<p className="text-[16px]">
							{' '}
							From breathtaking venues to seamless coordination, we make sure your ceremony is a
							dream come true.
						</p>
					</div>
					<div className="bg-[#DBDBDB] px-[30px] py-[30px] flex flex-col items-center rounded">
                        {/* <Image src={Sec3Img2} alt="Example Image" /> */}
						<CustomImage imgUrl={Sec3Img2} alt={"images"}/>
						<h3 className="font-semibold text-[24px] py-4">Photography</h3>
						<p>
							Capture every moment beautifully with our expert photographers, ensuring your memories
							last a lifetime.
						</p>
					</div>
					<div className="bg-[#DBDBDB] px-[30px] py-[30px] flex flex-col items-center rounded">
                        {/* <Image src={exampleImage} alt="Example Image" /> */}
						<CustomImage imgUrl={Sec3Img2} alt={"images"}/>
						<h3 className="font-semibold text-[24px] py-4">Decoration</h3>
						<p>
							Transform your venue into a breathtaking paradise, meticulously reflecting your unique
							style and vision.
						</p>
					</div>
					<div className="bg-[#DBDBDB] px-[30px] py-[30px] flex flex-col items-center rounded">
					<CustomImage imgUrl={Sec3Img4} alt={"images"}/>
						{/* <img src={Sec3Img4} alt="" /> */}
						<h3 className="font-semibold text-[24px] py-4">Cosmetic</h3>
						<p>
							Enhance your natural beauty flawlessly, ensuring you radiate confidence on your
							special and unique day.
						</p>
					</div>
					<div className="bg-[#DBDBDB] px-[30px] py-[30px] flex flex-col items-center rounded">
						<CustomImage imgUrl={Sec3Img5} alt="" />
						<h3 className="font-semibold text-[24px] py-4">Music & DJ</h3>
						<p>
							Set the perfect mood with our talented musicians and DJs, expertly keeping the
							celebration alive and vibrant.
						</p>
					</div>
					<div className="bg-[#DBDBDB] px-[30px] py-[30px] flex flex-col items-center rounded">
						<CustomImage imgUrl={Sec3Img6} alt="" />
						<h3 className="font-semibold text-[24px] py-4">Fine Dining</h3>
						<p>
							Elevate your reception with an array of exquisite culinary delights, meticulously
							crafted to tantalize every palate.
						</p>
					</div>
				</div>
				<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] hover:bg-[#D3874A] hover:text-white transition-all">
					To Learn More Contact Us
				</button>
			</section>
			<section className="px-16 py-28 flex flex-col items-center gap-[80px]">
				<div className="text-center">
					<p className="text-[#D3874A]">Wedding Halls</p>
					<h1 className="text-[40px] pb-[24px] pt-[16px] text-[#252A2E]">
						Beautiful wedding halls we offer
					</h1>
				</div>
				<div className="grid grid-cols-3 gap-12">
					<div className="bg-[#DBDBDB] p-[20px] flex flex-col rounded">
						<img
							className="rounded"
							src="https://adore-three.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbackground.8721e622.jpeg&w=1920&q=75"
							alt=""
						/>

						{/* <Carusel /> */}
						<span className="flex items-center w-full justify-between">
							<h3 className="font-semibold text-[24px] py-4">Yakka Saroy</h3>
							<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">15.6 mln</strong>
						</span>
						<span className="flex items-center w-full justify-between">
							<span className="flex gap-2 pb-3">
								<FaLocationDot style={{ color: 'white' }} />
								<p className="text-[16px]">
									Navoiy viloyati Navbaxor tumani <br /> Karvon mahallasi Nishod 409
								</p>{' '}
							</span>
							<span className="flex items-center gap-3">
								<FaPeopleGroup />
								<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">5000</strong>
							</span>
						</span>
						<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] bg-[#D3874A] hover:bg-transparent text-white hover:text-black transition-all">
							Book this wending hall
						</button>
					</div>
					<div className="bg-[#DBDBDB] p-[20px] flex flex-col rounded">
						<img
							className="rounded"
							src="https://adore-three.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbackground.8721e622.jpeg&w=1920&q=75"
							alt=""
						/>
						{/* <Carusel /> */}
						<span className="flex items-center w-full justify-between">
							<h3 className="font-semibold text-[24px] py-4">Yakka Saroy</h3>
							<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">15.6 mln</strong>
						</span>
						<span className="flex gap-2 pb-3">
							<FaLocationDot style={{ color: 'white' }} />
							<p className="text-[16px]">
								Navoiy viloyati Navbaxor tumani Karvon mahallasi Nishod 409
							</p>{' '}
						</span>
						<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] bg-[#D3874A] hover:bg-transparent text-white hover:text-black transition-all">
							Book this wending hall
						</button>
					</div>
					<div className="bg-[#DBDBDB] p-[20px] flex flex-col rounded">
						<img
							className="rounded"
							src="https://adore-three.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbackground.8721e622.jpeg&w=1920&q=75"
							alt=""
						/>
						{/* <Carusel /> */}
						<span className="flex items-center w-full justify-between">
							<h3 className="font-semibold text-[24px] py-4">Yakka Saroy</h3>
							<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">15.6 mln</strong>
						</span>
						<span className="flex gap-2 pb-3">
							<FaLocationDot style={{ color: 'white' }} />
							<p className="text-[16px]">
								Navoiy viloyati Navbaxor tumani Karvon mahallasi Nishod 409
							</p>{' '}
						</span>
						<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] bg-[#D3874A] hover:bg-transparent text-white hover:text-black transition-all">
							Book this wending hall
						</button>
					</div>
					<div className="bg-[#DBDBDB] p-[20px] flex flex-col rounded">
						<img
							className="rounded"
							src="https://adore-three.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbackground.8721e622.jpeg&w=1920&q=75"
							alt=""
						/>
						{/* <Carusel /> */}
						<span className="flex items-center w-full justify-between">
							<h3 className="font-semibold text-[24px] py-4">Yakka Saroy</h3>
							<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">15.6 mln</strong>
						</span>
						<span className="flex gap-2 pb-3">
							<FaLocationDot style={{ color: 'white' }} />
							<p className="text-[16px]">
								Navoiy viloyati Navbaxor tumani Karvon mahallasi Nishod 409
							</p>{' '}
						</span>
						<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] bg-[#D3874A] hover:bg-transparent text-white hover:text-black transition-all">
							Book this wending hall
						</button>
					</div>
					<div className="bg-[#DBDBDB] p-[20px] flex flex-col rounded">
						<img
							className="rounded"
							src="https://adore-three.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbackground.8721e622.jpeg&w=1920&q=75"
							alt=""
						/>
						{/* <Carusel /> */}
						<span className="flex items-center w-full justify-between">
							<h3 className="font-semibold text-[24px] py-4">Yakka Saroy</h3>
							<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">15.6 mln</strong>
						</span>
						<span className="flex gap-2 pb-3">
							<FaLocationDot style={{ color: 'white' }} />
							<p className="text-[16px]">
								Navoiy viloyati Navbaxor tumani Karvon mahallasi Nishod 409
							</p>{' '}
						</span>
						<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] bg-[#D3874A] hover:bg-transparent text-white hover:text-black transition-all">
							Book this wending hall
						</button>
					</div>
					<div className="bg-[#DBDBDB] p-[20px] flex flex-col rounded">
						<img
							className="rounded"
							src="https://adore-three.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbackground.8721e622.jpeg&w=1920&q=75"
							alt=""
						/>
						{/* <Carusel /> */}
						<span className="flex items-center w-full justify-between">
							<h3 className="font-semibold text-[24px] py-4">Yakka Saroy</h3>
							<strong className="font-semibold text-[24px] py-4 text-[#D3874A]">15.6 mln</strong>
						</span>
						<span className="flex gap-2 pb-3">
							<FaLocationDot style={{ color: 'white' }} />
							<p className="text-[16px]">
								Navoiy viloyati Navbaxor tumani Karvon mahallasi Nishod 409
							</p>{' '}
						</span>
						<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] bg-[#D3874A] hover:bg-transparent text-white hover:text-black transition-all">
							Book this wending hall
						</button>
					</div>
				</div>
				<button className="px-6 py-3 border border-[#D3874A] rounded-full text-[16px] hover:bg-[#D3874A] hover:text-white transition-all">
					Explore More
				</button>
			</section>
			<section className="px-16 py-28 flex flex-col gap-[80px]">
				<div className="">
					<h1 className="text-[40px] pb-[24px] text-[#252A2E]">Happy Couples</h1>
					<p className="text-[18px] text-[#252A2E]">
						Read what our clients have to say about our services.
					</p>
				</div>
				<div className="flex justify-between">
					<div className="flex flex-col gap-8">
						{/* <img className="w-[115px] h-[18px]" src={Sec4Stars} alt="" /> */}
						<CustomImage imgUrl={Sec4Stars} className="w-[115px] h-[18px]" alt={"images"}/>
						<p>
							Dream Day made our wedding day absolutely perfect. They took care of every detail{' '}
							<br />
							and made sure everything ran smoothly. We couldnt be happier!
						</p>
						<span className="flex gap-5 items-center">
						<CustomImage className="w-[112px] h-[56px] rounded" imgUrl={Sec4Liam} alt={"images"}/>
							{/* <img className="w-[112px] h-[56px] rounded" src={Sec4Liam} alt="" /> */}
							<p>Liam Martinez & Mia Rodriguez</p>
						</span>
					</div>
					<div className="flex flex-col gap-8">
						{/* <img className="w-[115px] h-[18px]" src={Sec4Stars} alt="" /> */}
						<CustomImage className="w-[115px] h-[18px]" imgUrl={Sec4Stars} alt={"images"}/>
						<p>
							Dream Day exceeded our expectations. Their team went above and beyond to create <br />
							the wedding of our dreams. We highly recommend their services!
						</p>
						<span className="flex gap-5 items-center">
						<CustomImage imgUrl={Sec4Hasan} alt={"images"}/>
							{/* <img className="w-[112px] h-[56px]" src={Sec4Hasan} alt="" /> */}
							<p>Hasan Ali & Dania Saad</p>
						</span>
					</div>
				</div>
			</section>
		</div>
	);
};

export default service;
