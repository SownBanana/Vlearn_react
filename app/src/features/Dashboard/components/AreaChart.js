import React from 'react'
import { Paper } from '@material-ui/core'
import {
    Chart,
    AreaSeries,
    ArgumentAxis,
    ValueAxis,
    Title,
    Tooltip,
    ZoomAndPan
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, ArgumentScale, EventTracker, ValueScale } from '@devexpress/dx-react-chart';
import { scaleTime, scaleLog } from 'd3-scale';

export default function AreaChart({
    width,
    height = 500,
    data,
    valueField = "data",
    argumentField = "time",
    title,
    titleSize = 20,
    color
}) {
    const titleStyle = { margin: 'auto', fontSize: titleSize };
    const TitleText = props => <Title.Text {...props} style={titleStyle} />;
    const scale = () => scaleLog().base(1);

    return (
        <Paper>
            <Chart
                data={data}
                width={width}
                height={height}
            >
                <ArgumentScale factory={scaleTime} />
                <ArgumentAxis />
                <ValueScale />
                <ValueAxis />
                <AreaSeries
                    valueField={valueField}
                    argumentField={argumentField}
                    color={color}
                />
                <Animation />
                <EventTracker />
                {/* <HoverState /> */}
                <ZoomAndPan />
                <Tooltip />
                <Title
                    text={title}
                    textComponent={TitleText}
                />
            </Chart>
        </Paper>
    )
}
