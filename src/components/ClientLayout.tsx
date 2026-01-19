
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import DashboardHeader from '@/components/dashboard/common/Header';
import DashboardFooter from '@/components/dashboard/common/Footer';
import { Toaster } from 'react-hot-toast';

interface ClientLayoutProps {
	children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
	const pathname = usePathname();

	// Check for dashboard pages
	const isDashboard = pathname.startsWith('/dashboard');
	const isLogin = pathname === '/dashboard/login';
	const isReset = pathname === '/dashboard/reset-password';
	const isResetMail = pathname === '/dashboard/reset-password-mail';

	// Hide header/footer for login and reset-password
	if (isLogin || isReset || isResetMail) {
		return <>{children}</>;
	}

	if (isDashboard) {
		return (
			<>	
			<Toaster />
				<DashboardHeader />
				{children}
				<DashboardFooter />
			</>
		);
	}

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
