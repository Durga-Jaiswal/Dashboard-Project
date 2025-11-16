// src/components/Reports/UsersByCityChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { User } from '../../types/user';


interface ChartData {
  name: string;
  value: number;
  [key: string]: any;

}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface UsersByCityChartProps {
  users: User[];
}

const UsersByCityChart = ({ users }: UsersByCityChartProps) => {
  const processData = (users: User[]): ChartData[] => {
    const cityCounts = users.reduce((acc: Record<string, number>, user) => {
      const city = user.address.city;
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(cityCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const chartData = processData(users);

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No user data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Users by City</h2>
      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Tooltip
              formatter={(value, _, props) => [
                `${props?.payload?.name}: ${value} user${Number(value) > 1 ? 's' : ''}`,
                'Count'
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsersByCityChart;