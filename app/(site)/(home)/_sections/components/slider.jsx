// import React from 'react'
import sliderimage from '../../../../../assets/slider2image.png';
import sliderimage2 from '../../../../../assets/sliderimage2.png';
import sliderimage3 from '../../../../../assets/sliderimage3.png';
import sliderimage4 from '../../../../../assets/sliderimage4.png';
import sliderimage5 from '../../../../../assets/sliderimage5.png';
import sliderimage6 from '../../../../../assets/sliderimage6.png';
import slider2image from '../../../../../assets/slider2image.png';
import slider2image2 from '../../../../../assets/slider2image2.png';
import slider2image3 from '../../../../../assets/slider2image3.png';
import slider2image4 from '../../../../../assets/slider2image4.png';
import slider2image5 from '../../../../../assets/slider2image5.png';
import './index.css';
import CustomImage from './../../../_components/Image';
// import { CustomImage } from '@/app/(site)/_components/Image';

const images = [
	{
		id: 1,
		image: sliderimage,
	},
	{
		id: 2,
		image: sliderimage2,
	},
	{
		id: 3,
		image: sliderimage3,
	},
	{
		id: 4,
		image: sliderimage4,
	},
	{
		id: 5,
		image: sliderimage5,
	},
	{
		id: 6,
		image: sliderimage6,
	},
];
const images2 = [
	{
		id: 1,
		image: slider2image,
	},
	{
		id: 2,
		image: slider2image2,
	},
	{
		id: 3,
		image: slider2image3,
	},
	{
		id: 4,
		image: slider2image4,
	},
	{
		id: 5,
		image: slider2image5,
	},
];

const Slider = () => {
	return (
		<div style={{ display: 'flex' }}>
			<div className="slider">
				<div className="slide-track">
					{images.map((item) => (
						<div key={item.id} className="slide">
							<CustomImage imgUrl={item.image} alt="image" />
						</div>
					))}
				</div>
				<div className="slide-track">
					{images.map((item) => (
						<div key={item.id} className="slide">
							<CustomImage imgUrl={item.image} alt="image" />
						</div>
					))}
				</div>
			</div>
			<div className="slider">
				<div className="slide-track">
					{images2.map((item) => (
						<div key={item.id} className="slide">
							<CustomImage imgUrl={item.image} alt="image" />
						</div>
					))}
				</div>
				<div className="slide-track">
					{images2.map((item) => (
						<div key={item.id} className="slide">
							<CustomImage imgUrl={item.image} alt="image" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Slider;
