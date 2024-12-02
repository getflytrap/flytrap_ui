import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type HistogramProps = {
  dailyCounts: number[];
};

/**
 * The `Histogram` component renders a bar chart using Chart.js to display
 * daily issue counts for the past 7 days. The chart automatically generates
 * labels based on the current date and maps the data to those days.
 *
 * @param dailyCounts - An optional array of 7 numbers representing issue counts.
 * @returns A responsive bar chart component.
 */
const Histogram = ({ dailyCounts }: HistogramProps) => {
  /**
   * Generates labels for the past 7 days based on the current date.
   */
  const generateLabels = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const labels = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      labels.push(daysOfWeek[currentDate.getDay()]);
    }

    return labels;
  };

  const labels = generateLabels();

  const data = {
    labels,
    datasets: [
      {
        label: "Issues",
        data: dailyCounts,
        backgroundColor: "#4BC0C0",
        borderColor: "#4BC0C0",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 4,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: "Day" },
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        title: { display: true, text: "Count" },
        ticks: { display: false },
      },
    },
  };

  return (
    <Box mt={4}>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default Histogram;
