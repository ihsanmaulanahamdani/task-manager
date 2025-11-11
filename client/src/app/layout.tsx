import type { Metadata } from 'next';
import './globals.css';
import { DependencyProvider } from '@/presentation/providers/DependencyProvider';
import { AuthProvider } from '@/presentation/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Simple task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <DependencyProvider>
          <AuthProvider>{children}</AuthProvider>
        </DependencyProvider>
      </body>
    </html>
  );
}
