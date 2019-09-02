import * as d3 from 'd3';
import { GRAPH_HEIGHT, GRAPH_WIDTH, MARGIN } from './constants';

export const svg = d3.select('.canvas').append('svg')
  .attr('width', GRAPH_WIDTH + MARGIN.left + MARGIN.right)
  .attr('height', GRAPH_HEIGHT + MARGIN.top + MARGIN.bottom);

export const graph = svg.append('g')
  .attr('width', GRAPH_WIDTH)
  .attr('height', GRAPH_HEIGHT)
  .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);

//scales
export const x = d3.scaleTime().range([0, GRAPH_WIDTH]);
export const y = d3.scaleLinear().range([GRAPH_HEIGHT, 0]);

//axesGroup
export const xAxisGroup = graph.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${GRAPH_HEIGHT})`);
export const yAxisGroup = graph.append('g')
  .attr('class', 'y-axis');

//line path element
export const path = graph.append('path');

//create dotted lines
export const dottedLines = graph.append('g')
  .attr('class', 'lines')
  .style('opacity', 0);

export const xDottedLine = dottedLines.append('line')
  .attr('stroke', '#aaaaaa')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

export const yDottedLine = dottedLines.append('line')
  .attr('stroke', '#aaaaaa')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

export const line = d3.line()
  .x(function(d) {
    return x(new Date(d.date));
  })
  .y(function(d) {
    return y(d.distance);
  });
