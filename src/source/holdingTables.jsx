import React from "react";

class holdingTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUniqueClasses: [],
        };

        this.strSelectedClass = "";
    }

    getUniqueClasses(arrData) {
        let arrUniqueClasses = {};
        arrData.forEach((data) => {
            if (!arrUniqueClasses[data.asset_class]) {
                arrUniqueClasses[data.asset_class] = [];
            }

            arrUniqueClasses[data.asset_class].push(data);
        });

        return arrUniqueClasses;
    }

    componentDidMount() {
        fetch("https://canopy-frontend-task.now.sh/api/holdings")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ arrUniqueClasses: this.getUniqueClasses(data.payload) });
            });
    }

    handleClickRow(strSelectedId) {
        if (this.strSelectedClass !== strSelectedId) {
            this.strSelectedClass = strSelectedId;
        } else {
            this.strSelectedClass = "";
        }
        this.setState({});
    }

    renderAssetData(id) {
        const { arrUniqueClasses } = this.state;
        let arrHTML = [];
        arrUniqueClasses[id].forEach((data) => {
            arrHTML.push(
                <tr className="dataRow">
                    <td>{data.name || "-"}</td>
                    <td>{data.ticker || "-"}</td>
                    <td>{data.asset_class || "-"}</td>
                    <td>{data.avg_price || "-"}</td>
                    <td>{data.market_price || "-"}</td>
                    <td>{data.latest_chg_pct || "-"}</td>
                    <td>{data.market_value_ccy || "-"}</td>
                </tr>
            );
        });

        arrHTML = (
            <table style={{ width: "100%", textAlign: "left", padding: "2vw" }}>
                <thead style={{ width: "100%" }}>
                    <tr className="dataHead">
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Asset Class</th>
                        <th>Average Price</th>
                        <th>Market Price</th>
                        <th>Latest Change Percentage</th>
                        <th>Market Value in Base CCY</th>
                    </tr>
                </thead>
                <tbody style={{ width: "100%" }}>{arrHTML}</tbody>
            </table>
        );

        return arrHTML;
    }

    renderClasses() {
        let arrHTML = [];
        const { arrUniqueClasses } = this.state;
        for (let id in arrUniqueClasses) {

            arrHTML.push(
                <div className="row" style={{ cursor: "pointer" }} onClick={() => this.handleClickRow(id)}>
                    <div style={{ width: "2vw", display: "inline", fontSize: "1rem" }}>{this.strSelectedClass === id ? <b>-</b> : <b>+</b>}</div> <b>{id}</b> ({arrUniqueClasses[id].length})
                </div>
            );

            if (this.strSelectedClass === id) {
                arrHTML.push(this.renderAssetData(id));
            }
        }

        return arrHTML;
    }

    render() {
        return (
        <div style={{ padding: "5vw" }}>
            <div>Data Table</div>
            <div style={{ marginTop: "2vw", border: "1px solid grey" }}>
                {this.renderClasses()}
            </div>
           
        </div>
        );
    }
}
export default holdingTables;
