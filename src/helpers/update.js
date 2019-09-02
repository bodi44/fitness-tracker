import * as d3 from 'd3';

import { GRAPH_HEIGHT } from '../constants';
import { dottedLines, graph, line, path, x, xAxisGroup, xDottedLine, y, yAxisGroup, yDottedLine } from '../graph';

const update = (data, activity) => {
  data = data.filter(item => item.activity === activity);

  //sort data
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  //set scale
  x.domain(d3.extent(data, d => new Date(d.date)));
  y.domain([0, d3.max(data, d => d.distance)]);

  //update path data
  path.data([data])
    .attr('fill', 'none')
    .attr('stroke', '#00bfa5')
    .attr('stroke-width', 2)
    .attr('d', line);

  //create circles for data
  const circles = graph.selectAll('circle').data(data);

  //remove unwanted points
  circles.exit().remove();

  //update current points
  circles
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.distance));

  // add new points
  circles.enter()
    .append('circle')
    .attr('r', 4)
    .attr('cx', d => {
      x(new Date(d.date));
    })
    .attr('cy', d => {
      y(d.distance);
    })
    .attr('fill', '#cccccc');

  graph.selectAll('circle')
    .on('mouseover', (data, index, selection) => {
      d3.select(selection[index])
        .transition().duration(100)
        .attr('r', 8)
        .attr('fill', '#ffffff');

      xDottedLine
        .attr('x1', x(new Date(data.date)))
        .attr('x2', x(new Date(data.date)))
        .attr('y1', GRAPH_HEIGHT)
        .attr('y2', y(data.distance));

      yDottedLine
        .attr('x1', 0)
        .attr('x2', x(new Date(data.date)))
        .attr('y1', y(data.distance))
        .attr('y2', y(data.distance));

      dottedLines.style('opacity', 1);
    })
    .on('mouseleave', (data, index, selection) => {
      d3.select(selection[index])
        .transition().duration(100)
        .attr('r', 4)
        .attr('fill', '#cccccc');

      dottedLines.style('opacity', 0);
    });

  //create axes
  const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d'));
  const yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => `${d} m`);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  //rotate axis text
  xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end');
};

export default update;
