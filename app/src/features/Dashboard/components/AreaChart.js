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
import { Animation, ArgumentScale, EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';

export default function AreaChart({
    width,
    height = 500,
    data,
    valueField,
    argumentField,
    title,
    titleSize = 20,
    color
}) {
    const titleStyle = { margin: 'auto', fontSize: titleSize };
    const TitleText = props => <Title.Text {...props} style={titleStyle} />;

    return (
        <Paper>
            <Chart
                data={data}
                width={width}
                height={height}
            >
                <ArgumentScale factory={scaleTime} />
                <ArgumentAxis />
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
