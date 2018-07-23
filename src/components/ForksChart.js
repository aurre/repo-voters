import React from 'react';
import { connect } from 'react-redux'
import {
    VictoryBar, VictoryChart, Bar
} from 'victory';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';



class ForksChart extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            style: {
                data: { fill: "tomato" }
            }
        };
    }

    render() {
        const handleMouseOver = () => {
            const fillColor = this.state.clicked ? "blue" : "tomato";
            const clicked = !this.state.clicked;
            this.setState({
                clicked,
                style: {
                    data: { fill: fillColor }
                }
            });
        };
        const data = this.props.reposInfoFromGithub.map((repo, index) => {
            index = index + 1
            return {
                x: repo.name, y: repo.forks
            }
        })

        return (
            <Card className="chartCard">
                <CardHeader
                    title="Forks"
                />
                <VictoryChart height={400} width={400}
                    domainPadding={{ x: 50, y: [0, 20] }}
                >
                    <VictoryBar
                        dataComponent={
                            <Bar events={{ onMouseOver: handleMouseOver }} />
                        }
                        style={this.state.style}
                        data={data}
                    />
                </VictoryChart>
            </Card>
        );
    }
}


const mapState = (state) => {
    return {
        reposInfoFromGithub: state.reposInfoFromGithub
    }
}

export default connect(mapState, null)(ForksChart)