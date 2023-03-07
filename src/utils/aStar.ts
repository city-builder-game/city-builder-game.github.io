type TMapPoint = {
    x: number
    y: number
    z: number
    neighbours: TMapPoint[]
}

const ELEVATION_MOVEMENT_MOD = 180 / 15 / Math.PI;

export default function findShortestPath(start: TMapPoint, destination: TMapPoint) {
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map().set(start, 0);
    const fScore = new Map().set(start, heuristicCostEstimate(start, destination));

    while (openSet.length > 0) {
        const current = getLowestFScore(openSet, fScore);
        if (current === destination) {
            return reconstructPath(cameFrom, destination);
        }

        openSet.splice(openSet.indexOf(current), 1);
        for (const neighbour of current.neighbours) {
            const tentativeGScore =
                gScore.get(current) + trueMovementCost(
                    distanceBetween(current, neighbour),
                    current.z - neighbour.z
                );

            if (!gScore.has(neighbour) || tentativeGScore < gScore.get(neighbour)) {
                cameFrom.set(neighbour, current);
                gScore.set(neighbour, tentativeGScore);
                fScore.set(neighbour, tentativeGScore + heuristicCostEstimate(neighbour, destination));

                if (!openSet.includes(neighbour)) {
                    openSet.push(neighbour);
                }
            }
        }
    }

    return null;
}

function getLowestFScore(nodes: TMapPoint[], fScore: Map<TMapPoint, number>) {
    let lowestScore = Infinity;
    let lowestNode = nodes[0];

    for (const node of nodes) {
        const score = fScore.get(node) || Infinity;
        if (score < lowestScore) {
            lowestScore = score;
            lowestNode = node;
        }
    }

    return lowestNode;
}

function reconstructPath(cameFrom: Map<TMapPoint, TMapPoint>, current: TMapPoint) {
    const path = [current];

    while (cameFrom.has(current)) {
        current = cameFrom.get(current) || current;
        path.unshift(current);
    }

    return path;
}

function distanceBetween(p1: TMapPoint, p2: TMapPoint) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function trueMovementCost(distance: number, elevationChange: number) {
    return distance * Math.pow(
        2, (Math.atan(elevationChange / distance) * ELEVATION_MOVEMENT_MOD)
    );
}

function heuristicCostEstimate(p1: TMapPoint, p2: TMapPoint) {
    return distanceBetween(p1, p2);
}
