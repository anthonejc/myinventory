import Link from 'next/link';

export default function Footer() {
  const links = [
    { name: 'Technology', href: '#technology' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-600">
          {links.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="hover:text-gray-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">I</span>
            </div>
            <span className="text-gray-900 font-semibold">InventoryPro</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 InventoryPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}