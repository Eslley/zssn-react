import { useEffect } from "react";
import { Chart } from "react-google-charts";

function ColumnChart({ title, data}) {

  return (
    <Chart options={{title: title}} chartType="ColumnChart" width="100%" height="400px" data={data} />
  )
}

export default ColumnChart