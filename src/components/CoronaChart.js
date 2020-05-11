import React from "react";
import {
    Chart,
    ChartAxis,
    ChartGroup,
    ChartLine,
    ChartThemeColor,
    ChartVoronoiContainer
} from "@patternfly/react-charts";

import { Alert } from "@patternfly/react-core";

const CoronaChart = ({ koronky }) =>{
    if (koronky.length > 0) {
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
            {/*<ChartAxis dependentAxis tickValues={[0,1,2,3,4,5].map((x)=>x*2000)} />*/}
            {/*<ChartAxis tickValues={[2, 3, 4]} />*/}
            {/*<ChartAxis tickValues={[ koronky[0][1][0]['date'], koronky[0][1][50]['date'], koronky[0][1].last()['date']]} />*/}
            <ChartAxis tickValues={[koronky[0][1][0]['date'], koronky[0][1][koronky[0][1].length - 1]['date']]}/>
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
            <Alert variant="info" isInline title="No country is selected"/>
        </div>}}

export default CoronaChart;
