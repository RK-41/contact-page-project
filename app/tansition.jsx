// This directive tells React to treat this component and its dependencies as client-side only
'use client';

import { motion } from 'framer-motion';

const Transition = ({ children }) => {
	// This component renders a motion.div element with animation effects
	return (
		<motion.div
			// Initial styles for the element before animation starts
			initial={{ x: -50, opacity: 0 }}
			// Styles for the element after animation completes
			animate={{ x: 0, opacity: 1 }}
			// Configuration for the animation (easing and duration)
			transition={{ ease: 'easeInOut', duration: 0.25 }}
		>
			{/* The content passed as children will be rendered inside this element */}
			{children}
		</motion.div>
	);
};

export default Transition;
