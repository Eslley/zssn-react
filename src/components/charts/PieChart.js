import Chart from "react-google-charts";

function PieChart({ title, data, legend }) {

  const options = {
    title: title,
    legend: { textStyle: {fontSize: 16}},
    slices: {
      0: { color: "red" },
      1: { color: "#3366CC" },
    }
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
