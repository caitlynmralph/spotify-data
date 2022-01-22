import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["mydata.csv",new URL("./files/c95803afbe6d7949e2d88cf6ca1a49813e12aa9dd506415cb0d804e86e4bc1fa9409281fc47c7f883d65f9bd088bc8b184d0216408fa752e4e167247a0e19c41",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# 2021 in music

This works way better on a big screen (sorry). Request your data from Spotify [here](https://support.spotify.com/us/article/data-rights-and-privacy-settings/).`
)});
  main.variable(observer()).define(["html","sameTrack","sameArtist"], function(html,sameTrack,sameArtist){return(
html`Each dot is one play. Mouse over to highlight the <span style="font-weight: 600; color: ${sameTrack};">same track</span> and the <span style="font-weight: 600; color: ${sameArtist};">same artist</span>. Times are in EST.`
)});
  main.variable(observer("viewof stack")).define("viewof stack", ["checkbox"], function(checkbox){return(
checkbox({
  options: [{ value: true, label: "Stack dots" }]
})
)});
  main.variable(observer("stack")).define("stack", ["Generators", "viewof stack"], (G, _) => G.input(_));
  main.variable(observer("viewof artistHighlight")).define("viewof artistHighlight", ["autoSelect","artistCounts"], function(autoSelect,artistCounts){return(
autoSelect({
  options: [...artistCounts.keys()],
  placeholder: "Search for an artist . . ."
})
)});
  main.variable(observer("artistHighlight")).define("artistHighlight", ["Generators", "viewof artistHighlight"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","html","width","height","margin","y","stack","x","chartData","radius","tooltip","artistHighlight"], function(d3,html,width,height,margin,y,stack,x,chartData,radius,tooltip,artistHighlight)
{
  const container = d3.select(
    html`<div style="position:relative;"><div class="tooltip"><div class="tooltip-contents"></div></div></div>`
  );

  const tooltipDiv = container.select(".tooltip");

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(
      d3
        .axisLeft(y)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b"))
    )
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").remove())
    .call((g) =>
      g
        .selectAll("text")
        .style("text-transform", "uppercase")
        .style("font-weight", 600)
        .style("font-size", "9px")
        .style("fill", "#666")
    );

  if (!stack) {
    const xAxis = d3.axisTop(x);

    xAxis
      .tickValues(d3.range(0, 24 * 60 + 1, width < 600 ? 180 : 60))
      .tickFormat((d, i) => {
        if ((d == 0) | (d == 1440)) return "12 AM";
        else if (d == 720) return "12 PM";
        else return (d / 60) % 12;
      });

    svg
      .append("g")
      .attr("transform", `translate(0, ${margin.top - 20})`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) =>
        g
          .selectAll("text")
          .style("text-transform", "uppercase")
          .style("font-weight", 600)
          .style("font-size", "9px")
          .style("fill", "#666")
      );
  }

  const dots = svg
    .append("g")
    .selectAll("g")
    .data(chartData)
    .enter()
    .append("g")
    .selectAll("circle")
    .data((d) => d.value)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => (stack ? x(i) : x(d.minutes)))
    .attr("cy", (d) => y(d.date))
    .attr("r", radius)
    .call(tooltip, tooltipDiv);

  dots
    .filter((d) => d.artist == artistHighlight)
    .classed("highlight-artist", true)
    .raise();

  dots.on("mouseover", function (d) {
    const thisTrack = d3.select(this).datum();
    dots
      .filter((o) => o.artist == thisTrack.artist)
      .classed("same-artist", true)
      .raise()
      .filter((o) => o.track == thisTrack.track)
      .classed("same-track", true)
      .raise();
  });

  dots.on("mouseout", function (d) {
    dots
      .classed("same-track", false)
      .classed("same-artist", false)
      .classed("highlight-artist", (d) => d.artist == artistHighlight);
  });

  return container.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Tooltip is from [@clhenrick](https://observablehq.com/@clhenrick/tooltip-d3-convention).`
)});
  main.variable(observer("viewof base")).define("viewof base", ["Inputs"], function(Inputs){return(
Inputs.color({ label: "Base", value: "#e5e2dc" })
)});
  main.variable(observer("base")).define("base", ["Generators", "viewof base"], (G, _) => G.input(_));
  main.variable(observer("viewof sameArtist")).define("viewof sameArtist", ["Inputs"], function(Inputs){return(
Inputs.color({ label: "Same artist", value: "#e6ab02" })
)});
  main.variable(observer("sameArtist")).define("sameArtist", ["Generators", "viewof sameArtist"], (G, _) => G.input(_));
  main.variable(observer("viewof sameTrack")).define("viewof sameTrack", ["Inputs"], function(Inputs){return(
Inputs.color({ label: "Same track", value: "#e7298a" })
)});
  main.variable(observer("sameTrack")).define("sameTrack", ["Generators", "viewof sameTrack"], (G, _) => G.input(_));
  main.variable(observer("viewof highlightArtist")).define("viewof highlightArtist", ["Inputs"], function(Inputs){return(
Inputs.color({
  label: "Highlight artist",
  value: "#7570b3"
})
)});
  main.variable(observer("highlightArtist")).define("highlightArtist", ["Generators", "viewof highlightArtist"], (G, _) => G.input(_));
  main.variable(observer("artistCounts")).define("artistCounts", ["d3","data"], function(d3,data)
{
  return new Map(
    d3
      .flatRollup(
        data,
        (v) => v.length,
        (d) => d.artist
      )
      .sort((a, b) => b[1] - a[1])
      .map((d, i) => [d[0], [d[1], i + 1]])
  );
}
);
  main.variable(observer("trackCounts")).define("trackCounts", ["d3","data"], function(d3,data)
{
  return new Map(
    d3
      .flatRollup(
        data,
        (v) => v.length,
        (d) => d.track + d.artist
      )
      .sort((a, b) => b[1] - a[1])
      .map((d, i) => [d[0], [d[1], i + 1]])
  );
}
);
  main.variable(observer()).define(["html","base","highlightArtist","sameArtist","sameTrack"], function(html,base,highlightArtist,sameArtist,sameTrack){return(
html`
  <style>
    circle {
      fill: ${base};
    }
    .highlight-artist {
      fill: ${highlightArtist};
    }
    .same-artist {
      fill: ${sameArtist};
    }
    .same-track {
      fill: ${sameTrack};
    }

    div.tooltip {
      box-sizing: border-box;
      position: absolute;
      display: none;
      top: 0;
      left: -100000000px;
      padding: 8px 12px;
      font-family: sans-serif;
      font-size: 12px;
      color: #333;
      background-color: #fff;
      border: 1px solid #777;
      border-radius: 4px;
      pointer-events: none;
      z-index: 1;
    }
    div.tooltip p {
      margin: 0;
    }

    div.tooltip .time {
      color: #777;
    }
    div.tooltip .track-count {
      color: ${sameTrack};
    }
    div.tooltip .artist-count {
      color: ${sameArtist};
    }
  </style
`
)});
  main.variable(observer("tooltip")).define("tooltip", ["d3","height","width","sameTrack","sameArtist"], function(d3,height,width,sameTrack,sameArtist){return(
(selectionGroup, tooltipDiv) => {
  // padding between the tooltip and mouse cursor
  const MOUSE_POS_OFFSET = 8;

  selectionGroup.each(function () {
    d3.select(this)
      .on("mouseover.tooltip", handleMouseover)
      .on("mousemove.tooltip", handleMousemove)
      .on("mouseleave.tooltip", handleMouseleave);
  });

  function handleMouseover() {
    // show/reveal the tooltip, set its contents,
    // style the element being hovered on
    showTooltip();
    setContents(d3.select(this).datum());
  }

  function handleMousemove(event) {
    // update the tooltip's position
    const [mouseX, mouseY] = d3.pointer(event, this);
    setPosition(mouseX, mouseY);
  }

  function handleMouseleave() {
    hideTooltip();
  }

  function showTooltip() {
    tooltipDiv.style("display", "block");
  }

  function hideTooltip() {
    tooltipDiv.style("display", "none");
  }

  function setPosition(mouseX, mouseY) {
    tooltipDiv
      .style(
        "top",
        mouseY < height / 2 ? `${mouseY + MOUSE_POS_OFFSET}px` : "initial"
      )
      .style(
        "right",
        mouseX > width / 2
          ? `${width - mouseX + MOUSE_POS_OFFSET}px`
          : "initial"
      )
      .style(
        "bottom",
        mouseY > height / 2
          ? `${height - mouseY + MOUSE_POS_OFFSET}px`
          : "initial"
      )
      .style(
        "left",
        mouseX < width / 2 ? `${mouseX + MOUSE_POS_OFFSET}px` : "initial"
      )
      .style("text-align", mouseX < width / 2 ? "left" : "right");
  }

  function setContents(datum) {
    // customize this function to set the tooltip's contents however you see fit
    tooltipDiv
      .select(".tooltip-contents")
      .html(
        `<p><span style="font-weight: 600; color: ${sameTrack}">${
          datum.track
        }</span> &ndash; <span style="color: ${sameArtist}">${
          datum.artist
        }</span></p><p class="time">${
          d3.timeFormat("%b %d ")(datum.date) + datum.time
        }</p>`
      );
  }
}
)});
  main.variable(observer("radius")).define("radius", function(){return(
2.5
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("mydata.csv").csv({ typed: true })
)});
  main.variable(observer("chartData")).define("chartData", ["data","artistCounts","trackCounts","d3"], function(data,artistCounts,trackCounts,d3)
{
  const thisData = data.map((d) => {
    d.artistCount = artistCounts.get(d.artist);
    d.trackCount = trackCounts.get(d.track + d.artist);
    return d;
  });
  return Array.from(
    d3.group(thisData, (d) => d.date),
    ([key, value]) => ({ key: key, value: value })
  );
}
);
  main.variable(observer("y")).define("y", ["d3","margin","height"], function(d3,margin,height){return(
d3
  .scaleTime()
  .domain([new Date("2021-01-01"), new Date("2021-12-31")])
  .range([margin.top, height - margin.bottom])
)});
  main.variable(observer("xStack")).define("xStack", ["d3","chartData","margin","width"], function(d3,chartData,margin,width){return(
d3
  .scaleLinear()
  .domain([0, d3.max(chartData, (d) => d.value.length)])
  .range([margin.left, width - margin.right])
)});
  main.variable(observer("xMinutes")).define("xMinutes", ["d3","margin","width"], function(d3,margin,width){return(
d3
  .scaleLinear()
  .domain([0, 1440])
  .range([margin.left, width - margin.right])
)});
  main.variable(observer("x")).define("x", ["stack","xStack","xMinutes"], function(stack,xStack,xMinutes){return(
stack ? xStack : xMinutes
)});
  main.variable(observer("margin")).define("margin", function(){return(
{
  top: 50,
  bottom: 10,
  left: 30,
  right: 15
}
)});
  main.variable(observer("height")).define("height", ["chartData","radius","margin"], function(chartData,radius,margin){return(
chartData.length * (radius * 2) + margin.top + margin.bottom
)});
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  main.import("autoSelect", child1);
  return main;
}
