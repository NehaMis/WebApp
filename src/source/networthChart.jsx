import React from "react";
import "amcharts3/amcharts/amcharts";
import "amcharts3/amcharts/serial";
import "amcharts3/amcharts/themes/light";
import AmCharts from "@amcharts/amcharts3-react";

class networthChart extends React.Component {
    componentDidMount() {
        this.renderData();
    }

    getOneYearData(arrNetWorthData) {
        let todayDate = new Date();
        todayDate.setHours("00", "00", "00");

        let lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        lastYear.setHours("00", "00", "00");

        let arrFilteredData = arrNetWorthData.filter((data) => {
            let dataTrade = data.traded_on.split("-");
            dataTrade = new Date(dataTrade.pop() + "/" + dataTrade.pop() + "/" + dataTrade.pop() + ", 00:00:00");
            return dataTrade <= todayDate && dataTrade >= lastYear;
        });

        return arrFilteredData;
    }

    renderData() {
        fetch("https://canopy-frontend-task.now.sh/api/networth")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                var arrData = this.getOneYearData(data);

                AmCharts.makeChart("chartdiv", {
                    type: "serial",
                    categoryField: "traded_on",
                    chartCursor: {},
                    graphs: [
                        {
                            type: "column",
                            title: "Net Worth",
                            valueField: "net_worth",
                            fillAlphas: 0.8,
                            color: "blue",
                        },
                    ],
                    dataProvider: arrData,
                });
            });
    }

    render() {
        return (
            <div style={{ textAlign: "center", width: "100%", justifyContent: "center" }}>
                <div className="extraShadow" id="chartdiv" style={{ width: "50%", height: "50vh", border: "1px solid black", margin: "10% 0 0 25%" }}></div>
            </div>
        );
    }
}
export default networthChart;
