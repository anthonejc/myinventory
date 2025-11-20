export default function Features() {
  const features = [
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Get instant insights into your inventory levels, sales trends, and performance metrics."
    },
    {
      icon: "🔄",
      title: "Automated Tracking",
      description: "Automatically track stock movements, reorder points, and supplier information."
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Access your inventory data anywhere, anytime with our responsive design."
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Enterprise-grade security with regular backups and 99.9% uptime guarantee."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance ensures quick loading times and smooth user experience."
    },
    {
      icon: "🎯",
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing tools and workflows."
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your inventory efficiently and grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}