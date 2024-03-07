'use client';

import { motion } from 'framer-motion';

const Transition = ({ children }) => {
	return (
		<motion.div
			initial={{ x: -50, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.25 }}
		>
			{children}
		</motion.div>
	);
};

export default Transition;
