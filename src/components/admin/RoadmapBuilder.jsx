import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 250, y: 5 }, data: { label: 'Start Module' } }
];
const initialEdges = [];

const RoadmapBuilder = ({ roadmap, onClose, fetchAPI }) => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [isSaving, setIsSaving] = useState(false);

    // Initialize from roadmap data if exists
    useEffect(() => {
        if (roadmap && roadmap.graphData) {
            if (roadmap.graphData.nodes?.length > 0) setNodes(roadmap.graphData.nodes);
            if (roadmap.graphData.edges?.length > 0) setEdges(roadmap.graphData.edges);
        }
    }, [roadmap]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onAddNode = () => {
        const newNode = {
            id: (nodes.length + 1).toString(),
            position: { x: Math.random() * 300, y: Math.random() * 300 },
            data: { label: `New Module ${nodes.length + 1}` },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetchAPI(`/api/admin/roadmaps/${roadmap._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ graphData: { nodes, edges } })
            });
            alert('Roadmap Graph Saved');
            onClose();
        } catch (e) {
            console.error("Failed to save graph", e);
            alert('Failed to save roadmap graph');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col pt-16 animate-fade-in">
            {/* Header Toolbar */}
            <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 absolute top-0 w-full z-10">
                <div>
                    <h2 className="text-xl font-bold text-white">Roadmap Builder: {roadmap?.title}</h2>
                    <p className="text-sm text-gray-400">Visual mapping of skills and dependencies</p>
                </div>
                <div className="space-x-4">
                    <button onClick={onAddNode} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">+ Add Node</button>
                    <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold transition-colors">
                        {isSaving ? 'Saving...' : 'Save Graph'}
                    </button>
                    <button onClick={onClose} className="bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors">Cancel</button>
                </div>
            </div>

            {/* React Flow Canvas */}
            <div className="flex-1 bg-gray-900 border border-gray-700 m-4 rounded-xl overflow-hidden shadow-2xl">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    className="bg-gray-900"
                >
                    <Controls className="bg-gray-800 fill-white text-black" />
                    <MiniMap
                        nodeStrokeColor={(n) => '#2563eb'}
                        nodeColor={(n) => '#1f2937'}
                        maskColor="rgba(0, 0, 0, 0.7)"
                    />
                    <Background color="#374151" gap={16} />
                </ReactFlow>
            </div>

            {/* Legend / Info panel */}
            <div className="h-48 bg-gray-800 border-t border-gray-700 p-6 flex gap-8">
                <div className="w-1/3">
                    <h3 className="font-bold text-white mb-2">Instructions</h3>
                    <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                        <li>Click "Add Node" to create new modules.</li>
                        <li>Drag from node dots to connect dependencies.</li>
                        <li>Select a node and press Backspace to delete.</li>
                        <li>Double-click a node label to edit its name (Coming soon).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RoadmapBuilder;
