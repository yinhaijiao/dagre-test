import React, { useState } from "react";
import ReactFlow, { Controls, Background, isNode } from "react-flow-renderer";
import dagre from "dagre";
import { getGraphData } from "./Elements";
import { dotString } from "./data/sample";
import "./layouting.css";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export default function App() {
  const [elements, setElements] = useState(getGraphData(dotString));

  const onLayout = () => {
    dagreGraph.setGraph({ rankdir: "TB" });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: 150, height: 50 });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    const layoutedElements = elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        // nodeWithPosition example: {width: 150, height: 50, x: 1105, y: 325}
        el.position = {
          x: nodeWithPosition.x + Math.random() / 1000,
          y: nodeWithPosition.y
        };
      }
      return el;
    });

    setElements(layoutedElements);
  };

  return (
    <div className="rootflow">
      <ReactFlow elements={elements} onLoad={() => onLayout()}>
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}
