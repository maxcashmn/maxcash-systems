import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card } from '../ui/Card';

interface LoanData {
  month: string;
  amount: number;
  repaid: number;
  pending: number;
}

interface LoanChartProps {
  data: LoanData[];
  title?: string;
  height?: number;
}

const COLORS = ['#f97316', '#22c55e', '#ef4444'];

export const LoanChart: React.FC<LoanChartProps> = ({
  data,
  title = 'Loan Activity',
  height = 300,
}) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill={COLORS[0]} name="Loans Disbursed" />
          <Bar dataKey="repaid" fill={COLORS[1]} name="Repaid" />
          <Bar dataKey="pending" fill={COLORS[2]} name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

// Also export as default for convenience
export default LoanChart;
