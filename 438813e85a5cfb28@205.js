// https://observablehq.com/@d3/state-choropleth@205
import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["unemployment201907.csv",new URL("./files/cb5ff1d35f294eda2a2b76c78e4edafe5e2ceab0d3d01cfa812aef51b24723c12b1b2193e4efbe65e6297121616b18402dc806cdd8552bef6c680cb6b6b61055",import.meta.url)],["states-albers-10m.json",new URL("./files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# İssizlik Haritası

İşssizlik oranları, Ekim 2020. Verisi:`
)});
  main.variable(observer("chart")).define("chart", ["d3","legend","color","data","topojson","us","path","format"], function(d3,legend,color,data,topojson,us,path,format)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 975, 610]);

  svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => legend({color, title: data.title, width: 260}));

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .attr("fill", d => color(data.get(d.properties.name)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}
${format(data.get(d.properties.name))}`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(new Map(d3.csvParse(await FileAttachment("unemployment201907.csv").text(), ({name, rate}) => [name, +rate])), {title: "İşssizlik Oranları (%)"})
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleQuantize([1, 7], d3.schemeBlues[6])
)});
  main.variable(observer("path")).define("path", ["d3"], function(d3){return(
d3.geoPath()
)});
  main.variable(observer("format")).define("format", function(){return(
d => `${d}%`
)});
  main.variable(observer("us")).define("us", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("states-albers-10m.json").json()
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
