import { Inter } from 'next/font/google';
import './globals.css';
import Transition from './tansition';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Contact Page Project',
	description:
		'This project demonstrates a React application that uses a form to collect user data and submits it to a Google Apps Script endpoint for processing and storage in a Google Sheet.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Transition>{children}</Transition>
			</body>
		</html>
	);
}
