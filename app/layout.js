import './globals.css';

export const metadata = {
  title: 'Marina World Cup 2026',
  description: 'Marina City World Cup prediction website'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ku" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
