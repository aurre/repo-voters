import React from 'react';
import { connect } from 'react-redux'
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme
} from 'victory';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './OpenIssuesChart.css'



class OpenIssuesChart extends React.Component {
    constructor() {
        super()
    }

    render() {
        const data = this.props.reposInfoFromGithub.map((repo, index) => {
            index = index + 1
            return {
                frameworks: index, openIssues: repo.open_issues_count
            }
        })
        return (
            <Card className="chartCard">
                <CardHeader
                    title="Open Issues"
                />
                <VictoryChart
                    // adding the material theme provided with Victory
                    domainPadding={20}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Vue", "React", "Angular.js", "Ember.js"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (x)}
                    />
                    <VictoryBar
                        data={data}
                        x="frameworks"
                        y="openIssues"
                    />
                </VictoryChart>
            </Card>
        )
    }
}



const mapState = (state) => {
    return {
        repos: state.repos,
        reposInfoFromGithub: state.reposInfoFromGithub
    }
}

export default connect(mapState, null)(OpenIssuesChart)