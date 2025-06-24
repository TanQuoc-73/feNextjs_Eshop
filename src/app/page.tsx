import Image from "next/image";
import { AuthProvider } from '../contexts/AuthContext'

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-4xl font-bold text-gray-800">Welcome to E-Shop</div>
      </div>
    </AuthProvider>
  );
}

export const metadata = {
  title: 'E-Shop',
  description: 'E-commerce website',
};
