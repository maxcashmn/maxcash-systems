import React from 'react';
import { Card } from '../ui/Card';
import { AreaChart } from './AreaChart';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';
import { LineChart } from './LineChart';

interface DashboardChartProps {
  type: 'area' | 'bar' | 'pie' | 'line';
  data: Array<Record<string, any>>;
  dataKeys?: string[];
  title?: string;
  height?: number;
  colors?: string[];
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  type,
  data,
  dataKeys = [],
  title,
  height = 300,
  colors,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return <AreaChart data={data} dataKeys={dataKeys} title={title} height={height} colors={colors} />;
      case 'bar':
        return <BarChart data={data} dataKeys={dataKeys} title={title} height={height} colors={colors} />;
      case 'pie':
        return <PieChart data={data} title={title} height={height} colors={colors} />;
      case 'line':
        return <LineChart data={data} dataKeys={dataKeys} title={title} height={height} colors={colors} />;
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return renderChart();
};
