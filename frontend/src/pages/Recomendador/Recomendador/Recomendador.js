import React from 'react'
import Carousel from 'nice-react-carousel';
import Sidebar from '../Sidebar/Sidebar'


const Recomendador =() => {
	
	return (
		<>
		<div className="recomendador-wrapper">
	
			<div className="recomendador-carousel-wrapper">
			<Carousel mode="itemsWidth" itemsBySlide={3}  itemsToShow={3} dots>
			  <div>Slider 1</div>
			  <div>Slider 2</div>
			  <div>Slider 3</div>
			  <div>Slider 1</div>
			  <div>Slider 2</div>
			  <div>Slider 3</div>
			  <div>Slider 3</div>
			</Carousel>
			</div>
				<Sidebar/>
		</div>

		</>
	)
}

export default Recomendador