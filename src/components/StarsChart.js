import React from 'react';
import { connect } from 'react-redux'
import {
    VictoryPie, VictoryLabel
} from 'victory';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './OpenIssuesChart.css'




class StarsChart extends React.Component {
    render() {
        const data = this.props.reposInfoFromGithub.map((repo, index) => {
            index = index + 1
            return {
                x: repo.name, y: repo.stargazers_count

            }
        })
        return (
            <Card className="chartCard">
                <CardHeader
                    title="Stars"
                />
                <svg viewBox="0 0 400 400">
                    <VictoryPie
                        standalone={false}
                        width={400} height={400}
                        data={data}
                        innerRadius={68} labelRadius={100}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                    />
                    <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 20 }}
                        x={200} y={200}
                        text="Stars!"
                    />
                </svg>
            </Card>
        );
    }
}


const mapState = (state) => {
    return {
        repos: state.repos,
        reposInfoFromGithub: state.reposInfoFromGithub
    }
}

export default connect(mapState, null)(StarsChart)