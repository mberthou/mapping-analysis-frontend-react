import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react'

type BarplotProps = {
  width: number;
  height: number;
  data: { name: string; value: number }[];
};

export const D3Barplot = ({ width, height, data }: BarplotProps) => {
  const svgRef = useRef(null);

  useEffect(
    () => {
          // Check that svg element has been rendered
          if(svgRef.current) {
              let svg = d3.select(svgRef.current);
              svg.selectAll("*").remove();

              // set the dimensions and margins of the graph
              var margin = {top: 30, right: 30, bottom: 80, left: 60},
                  canvas_width = width - margin.left - margin.right,
                  canvas_height = height - margin.top - margin.bottom;


              svg = svg.append("svg")
                .attr("width", canvas_width + margin.left + margin.right)
                .attr("height", canvas_height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

              // X axis
              var x_axis = d3.scaleBand()
                .range([ 0, canvas_width ])
                .domain(data.map(function(d) { return d.name; }))
                .padding(0.2);

              svg.append("g")
                .attr("transform", "translate(0," + canvas_height + ")")
                .call(d3.axisBottom(x_axis))
                .selectAll("text")
                  .attr("transform", "translate(-10,0)rotate(-45)")
                  .style("text-anchor", "end");

              // Add Y axis
              var y_axis = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => d.value)])
                .range([canvas_height, 0]);
              svg.append("g")
                .call(d3.axisLeft(y_axis));

              // Bars
              svg.selectAll("mybar")
                .data(data)
                .enter()
                .append("rect")
                  .attr("x", function(d) { return x_axis(d.name); })
                  .attr("y", function(d) { return y_axis(d.value); })
                  .attr("width", x_axis.bandwidth())
                  .attr("height", function(d) { return canvas_height - y_axis(d.value); })
                  .attr("fill", "#69b3a2");
            }
      },
    [svgRef.current, data])

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}/>
    </div>
  );
};
