import { Rajdhani, DM_Sans } from 'next/font/google';
import Footer from '@/components/Footer';
import { ThemeProvider } from './themeContext';
import ThemeToggle from '@/components/ThemeToggle';
import BackButton from '@/components/BackButton';
import './globals.css';
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['600', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata = {
  title: 'SATYAMEV AI — Fake News Detector',
  description: 'AI-powered fake news detection platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ThemeProvider>

          <div className="animated-bg">
            <div className="blob1"></div>
            <div className="blob2"></div>
          </div>

          <BackButton />
          <ThemeToggle />
          {children}
          <Footer />

        </ThemeProvider>

      </body>
    </html>
  );
}