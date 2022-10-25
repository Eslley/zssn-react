import Chart from "react-google-charts";

function PieChart({ title, data, legend }) {

  const options = {
    title: title,
    pieHole: 0.4,
    legend: { textStyle: {fontSize: 16}}
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default PieChart
