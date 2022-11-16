import { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType,
    Position,
    EdgeMarker,
    CoordinateExtent,
} from 'reactflow';

import dagre from 'dagre';

import 'reactflow/dist/style.css';
import { Goal } from '../scenes/HelloWorldScene';
import GoalModal from './goalModal';
import React from 'react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeExtent: CoordinateExtent = [
    [0, 0],
    [1000, 1000],
];


function goalsToEdges(goals: Goal[]) {
    return goals && goals.filter((goal) => goal['parent_id']).map((goal) => {
        return {
            id: `e${goal['id']}->${goal['parent_id']}`,
            source: goal['id'],
            target: goal['parent_id']
        }
    });
}

function goalToNode(goal: Goal) {
    return {
        id: goal['id'],
        position: { x: 0, y: 0 },
        style: { backgroundColor: goal.status === 'wip' ? 'yellow' : goal.status === 'done' ? 'lightgreen' : '' },
        data: { label: goal['name'] }
    };
}


const Flow = (props: any) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const goals: Goal[] = [{
        "id": "1",
        "parent_id": null,
        "name": "goal 1",
        "type": "personal",
        "status": "done",
        "created_at": "2022-11-15T14:21:42.000Z",
        "completed_at": "2022-11-15T14:21:42.000Z",
        "user_id": "1"
    },
    {
        "id": "2",
        "status": "done",
        "parent_id": "1",
        "name": "goal 2",
        "type": "personal",
        "created_at": "2022-11-15T14:21:42.049Z",
        "user_id": "1"
    },
    {
        "id": "3",
        "status": "wip",
        "parent_id": "1",
        "name": "goal 3",
        "type": "personal",
        "created_at": "2022-11-15T14:21:42.063Z",
        "user_id": "1"
    },
    {
        "id": "4",
        "parent_id": "3",
        "name": "goal 4",
        "type": "personal",
        "status": "tbd",
        "created_at": "2022-11-15T14:21:42.070Z",
        "user_id": "1"
    },
    {
        "id": "5",
        "parent_id": "3",
        "name": "goal 5",
        "type": "personal",
        "status": "tbd",
        "created_at": "2022-11-15T14:21:42.077Z",
        "user_id": "1"
    }];

    useEffect(() => {
        // console.log("goals:", goals);
        // const relevantGoals = goals.filter((g: Goal) => g['type'] == props.type);
        const relevantGoals = goals;
        // console.log(`goals for type ${props.type}:`);
        // console.log(relevantGoals);
        const nodes = relevantGoals.map(goalToNode);
        const edges = goalsToEdges(relevantGoals);
        // console.log("nodes:", nodes);
        setNodes(nodes);
        // console.log("edges:", edges);
        // @ts-ignore
        setEdges(edges);
    }, []);


    const onConnect = useCallback(
        (connection) => {
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    const onLayout = (direction: string = 'TB') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: 150, height: 50 });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const layoutedNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? Position.Left : Position.Top;
            node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
            // we need to pass a slightly different position in order to notify react flow about the change
            // @TODO how can we change the position handling so that we dont need this hack?
            node.position = {
                x: nodeWithPosition.x + Math.random() / 1000,
                y: nodeWithPosition.y,
            };

            return node;
        });

        setNodes(layoutedNodes);
    };

    const unselect = () => {
        setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
    };

    const changeMarker = () => {
        setEdges((eds) =>
            eds.map((e) => ({
                ...e,
                markerEnd: {
                    type: (e.markerEnd as EdgeMarker).type === MarkerType.Arrow ? MarkerType.ArrowClosed : MarkerType.Arrow,
                },
            }))
        );
    };

    const [modalData, setModalData] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const onNodeClick = (event: any, node: any) => {
        // console.log('click node', node)
        fetch(`http://localhost:3001/api/goals/${node.id}/qnas`)
            .then(response => response.json())
            .then(qnas => {
                // console.log(qnas);
                setModalData({...qnas, name: node.data.label});
                setIsOpen(true);
            });
    };

    // console.log("rendeing nodes", nodes);

    function handleCloseModal(event: any, data: any) {
        console.log(event, data);
        setIsOpen(false);
    }

    function handleAfterOpen(event: any, data: any) {
        console.log(event, data);
    }

    return (
        <div className="layoutflow" style={{ height: 800 }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    elementsSelectable={true}
                    nodeExtent={nodeExtent}
                    onInit={() => onLayout('TB')}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                >
                    <Controls />
                    <GoalModal
                        dynData={modalData}
                        isOpen={modalIsOpen}
                        onCloseModal={handleCloseModal}
                        onAfterOpen={handleAfterOpen}
                    ></GoalModal>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default Flow;
