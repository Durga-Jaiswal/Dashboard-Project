import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import CountUp from 'react-countup';

interface DashboardProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ products, isLoading, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products.length) return <div>No products available</div>;

  const categories = [...new Set(products.map(p => p.category))].length;
  const highRatedProducts = products.filter(p => p.rating.rate >= 4).length;
  const expensiveProducts = products.filter(p => p.price > 100).length;
  const affordableProducts = products.filter(p => p.price <= 100).length;
  const averagePrice = (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2);

  type StatItem = {
    name: string;
    value: number;
    prefix?: string;
    suffix?: string;
    isCurrency?: boolean;
  };

  const stats: StatItem[] = [
    {
      name: 'Total Products',
      value: products.length,
      prefix: '',
      suffix: ''
    },
    {
      name: 'Categories',
      value: categories,
      prefix: '',
      suffix: ''
    },
    {
      name: 'Highly Rated (4+ ⭐)',
      value: highRatedProducts,
      prefix: '',
      suffix: ''
    },
    {
      name: 'Premium Products',
      value: expensiveProducts,
      prefix: '',
      suffix: ' >$100+'
    },
    {
      name: 'Affordable Products',
      value: affordableProducts,
      prefix: '',
      suffix: ' <$100'
    },
    {
      name: 'Avg. Price',
      value: parseFloat(averagePrice),
      prefix: '$',
      suffix: ''
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <div className="mt-2 text-3xl font-semibold text-indigo-600">
              {isVisible && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  decimals={stat.name === 'Avg. Price' ? 2 : 0}
                  separator=","
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;