import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Inventory Management?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses already using InventoryPro to streamline their operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/signup" 
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Start Free Trial
          </Link>
          <Link 
            href="/login" 
            className="border border-blue-400 hover:border-blue-300 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}