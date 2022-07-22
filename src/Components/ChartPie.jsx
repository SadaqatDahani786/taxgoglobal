import Chart from "chart.js/auto";
import styled from "styled-components";
import { useEffect, useRef } from "react";

/*
 ** ** =================================================
 ** ** ** STYLED COMPONENTS
 ** ** =================================================
 */
//Wrapper
const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
`;

//Chart
const ChartStyled = styled.canvas``;

/*
 ** ** =================================================
 ** ** ** COMPONENT [ChartPie]
 ** ** =================================================
 */
const ChartPie = ({ title = "", labels = [], data = [] }) => {
  //State
  const refCanvas = useRef(null);

  //Instantiate Chart
  useEffect(() => {
    const dataset = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data,
          backgroundColor: [
            "#1B065E",
            "#F2545B",
            "#F3F7F0",
            "#39A0ED",
            "#246A73",
          ],
        },
      ],
    };

    //Config
    const config = {
      type: "pie",
      data: dataset,
      options: {
        responsive: false,
        // aspectRatio: 5,
        // maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: title,
          },
        },
      },
    };

    //Instantiate
    const ChartObj = new Chart(refCanvas.current.getContext("2d"), config);

    //Clean up
    return () => {
      ChartObj.destroy();
    };
  }, [labels, data]);

  return (
    <Wrapper>
      <ChartStyled id="myChart" ref={refCanvas} />
    </Wrapper>
  );
};

export default ChartPie;
