import {
	ArcElement,
	Chart as ChartJS,
	ChartData,
	ChartOptions,
	Legend,
	Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { DARK_RANKING_COLOR, RANKING_COLOR } from '../constants/color';
import themeAtom from '../recoil/atoms/theme.atom';
ChartJS.register(ArcElement, Tooltip, Legend);

interface PollResultChartProps {
	options?: ChartOptions<'pie'>;
	labels: string[];
	data: number[];
}

const renderData = (
	labels: string[] = [],
	data: number[] = [],
	isDark: boolean = false,
	label?: string,
): ChartData<'pie', number[], string> => ({
	labels,
	datasets: [
		{
			label,
			data,
			backgroundColor: isDark ? DARK_RANKING_COLOR : RANKING_COLOR,
			borderColor: isDark ? '#0f172a' : '#ffffff',
			borderWidth: 1,
		},
	],
});

export default function PollResultChart({
	options,
	data,
	labels,
}: PollResultChartProps): JSX.Element {
	const { isDark } = useRecoilValue(themeAtom);

	const chartData = renderData(labels, data, isDark, '');
	return (
		<Pie
			data={chartData}
			options={{
				plugins: { legend: { labels: { font: { size: 18 } } } },
				...options,
			}}
		/>
	);
}
