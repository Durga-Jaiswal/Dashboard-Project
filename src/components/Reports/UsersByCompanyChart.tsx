import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { User } from '../../types/user';

interface CompanyData {
  name: string;
  users: number;
}

interface UsersByCompanyChartProps {
  users: User[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const UsersByCompanyChart = ({ users }: UsersByCompanyChartProps) => {
  const processData = (users: User[]): CompanyData[] => {
    const companyCounts = users.reduce((acc: Record<string, number>, user) => {
      const companyName = user.company.name;
      acc[companyName] = (acc[companyName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(companyCounts)
      .map(([name, users]) => ({
        name,
        users,
      }))
      .sort((a, b) => b.users - a.users);
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
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Users by Company</h2>
      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 80,
            }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              width={25}
            />
            <Tooltip
              formatter={(value) => [`${value} users`, 'Count']}
              labelFormatter={(label) => `Company: ${label}`}
              contentStyle={{
                fontSize: '12px',
                padding: '5px 10px',
                borderRadius: '4px'
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '10px',
                fontSize: '12px'
              }}
            />
            <Bar
              dataKey="users"
              name="Number of Users"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsersByCompanyChart;