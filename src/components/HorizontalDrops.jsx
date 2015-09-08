
const React = require('react'),
      d3 = require('d3'),
      _ = require('lodash');

const HorizontalLine = React.createClass({
    render: function () {
        return (
            <line x1="0" y1={this.props.y} x2={this.props.w} y2={this.props.y} />
        );
    }
});

const Tick = React.createClass({
    render: function () {
        return (
            <circle cx={this.props.x}
                    cy={this.props.y}
                    r="15" />
        );
    }
});

const HorizontalDrops = React.createClass({
    getDefaultProps: function () {
        return {
            window: 1
        }
    },

    componentWillMount: function () {
        this.xScale = d3.scale.linear();

        this.update_d3(this.props);
    },

    componentWillReceiveProps: function (newProps) {
        this.update_d3(newProps);
    },

    update_d3: function (props) {
        var ticks = _.values(props.ticks);

        this.xScale
            .domain([(new Date()).getTime() - this.props.window,
                     d3.max(ticks, function (d) { return d.time; })])
            .range([0, 500]);
    },

    render: function () {
        return (
            <svg height="100" width="500">
                <HorizontalLine y="50" w="500" />
                {_.values(this.props.ticks).map(function (tick) {
                    return (
                        <Tick x={this.xScale(tick.time)}
                              y="50" />
                    );
                 }, this)}
            </svg>
        );
    }
});

module.exports = HorizontalDrops;
