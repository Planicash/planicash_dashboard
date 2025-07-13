export type ChartDataPoint = {
    [key: string]: string | number;
};

export type OverviewChartProps = {
    data: ChartDataPoint[];
    dataKey: string;
    labelKey: string;
    height?: number;
};
