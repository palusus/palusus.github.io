import React from "react";
import {
    Chart,
    ChartAxis,
    ChartGroup,
    ChartLine,
    ChartThemeColor,
    ChartVoronoiContainer
} from "@patternfly/react-charts";

import {Alert, Button} from "@patternfly/react-core";
import SimpleEmptyState from "./Empty";

const CoronaChart = ({ koronky, setView}) =>{
    if (koronky.length > 0) {
        console.log("kory mam", koronky);
        const maximalInfection = koronky.map((country) => {console.log("zemka je", country);return country[1][country[1].length-1]["confirmed"]}).reduce((x, y) => {return Math.max(x, y)});
        console.log("max je", maximalInfection);
        return <Chart
            ariaDesc="Average number of pets"
            ariaTitle="Total cases over time"
            containerComponent={<ChartVoronoiContainer labels={({datum}) => {
                return `${datum.name}: ${datum.y} total cases at ${datum.x}`
            }} constrainToVisibleArea/>}
            // legendData={[{ name: 'Cats' }, { name: 'Dogs', symbol: { type: 'dash' } }, { name: 'Birds' }, { name: 'Mice' }]}
            legendData={koronky.map((x) => {
                return {name: x[0]};
            })}
            legendOrientation="vertical"
            legendPosition="right"
            themeColor={ChartThemeColor.multiUnordered}
            // maxDomain={{ y: 10000 }}
            // minDomain={{ y: 0 }}
            padding={{
                top: 50,
                left: 75,
                right: 150, // Adjusted to accommodate legend
                bottom: 50,
            }}
        >
            <ChartAxis dependentAxis tickValues={[0,1,2,3,4,5].map((x)=>Math.round(x*maximalInfection/5))} />
            {/*<ChartAxis tickValues={[2, 3, 4]} />*/}
            {/*<ChartAxis tickValues={[ koronky[0][1][0]['date'], koronky[0][1][50]['date'], koronky[0][1].last()['date']]} />*/}
            <ChartAxis tickValues={[koronky[0][1][0]['date'], koronky[0][1][Math.round(koronky[0][1].length/2)]['date'],koronky[0][1][koronky[0][1].length - 1]['date']]}/>
            {koronky[0] &&
            <ChartGroup>

                {koronky.map(koronka => {
                    return koronka &&
                        <ChartLine
                            data={koronka[1].map(entry => {
                                return {name: koronka[0], x: entry["date"], y: entry["confirmed"]}
                            })}
                        />
                })}
            </ChartGroup>
            }
        </Chart>
    } else {
    return <div>
        <SimpleEmptyState setView={setView}></SimpleEmptyState>
        {/*<Alert variant="info" isInline title={<div><p>No country is selected<br /><br /></p><Button onClick={() => setView("table")}>Show me full Table</Button></div>} />*/}

        </div>}}

export default CoronaChart;
