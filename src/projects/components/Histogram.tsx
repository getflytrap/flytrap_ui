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

const Histogram = ({ dailyCounts }: HistogramProps) => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
