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
    //Data
    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const dataset = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data,
          backgroundColor: [
            "red",
            "aquablue",
            "deeppink",
            "white",
            "gray",
            "black",
          ],
        },
      ],
    };

    //Config
    const config = {
      type: "pie",
      data: dataset,
      options: {
        responsive: true,
        aspectRatio: 5,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
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
