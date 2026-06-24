import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../ui/Card';

interface PaymentData {
  date: string;
  expected: number;
  actual: number;
  late: number;
}

interface PaymentChartProps {
  data: PaymentData[];
  title?: string;
  height?: number;
}

export const PaymentChart: React.FC<PaymentChartProps> = ({
  data,
  title = 'Payment Trends',
  height = 300,
}) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="expected"
            stroke="#f97316"
            name="Expected"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#22c55e"
            name="Actual"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke="#ef4444"
            name="Late"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PaymentChart;
