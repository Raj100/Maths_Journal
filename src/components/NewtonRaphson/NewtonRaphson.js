import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as d3 from 'd3';
import * as math from 'mathjs';

function NewtonRaphson() {
    const [equation, setEquation] = useState('');
    const [initialGuess, setInitialGuess] = useState('');
    const [tolerance, setTolerance] = useState(1e-6);
    const [maxIterations, setMaxIterations] = useState(100);
    const [result, setResult] = useState(null);
    const [iterationSteps, setIterationSteps] = useState([]);

    const chartRef = useRef();

    useEffect(() => {
        if (iterationSteps.length > 0) {
            drawChart();
        }
    }, [iterationSteps]);

    const drawChart = () => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, iterationSteps.length])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([Math.min(...iterationSteps.map(step => step.root)), Math.max(...iterationSteps.map(step => step.root))])
            .range([height, 0]);

        const line = d3.line()
            .x((d, i) => x(i))
            .y(d => y(d.root));

        svg.append("path")
            .datum(iterationSteps)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        svg.selectAll(".dot")
            .data(iterationSteps)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", (d, i) => x(i))
            .attr("cy", d => y(d.root))
            .attr("r", 3);
    };

    const handleSolve = () => {
        const initialGuessNum = parseFloat(initialGuess);
    
        if (isNaN(initialGuessNum) || equation.trim() === '') {
            toast.error('Please enter a valid equation and initial guess value.');
            return;
        }
    
        try {
            const root = newtonRaphsonMethod(equation, initialGuessNum, tolerance, maxIterations);
    
            setResult(root.root);
            setIterationSteps(root.steps);
        } catch (error) {
            toast.error(error.message);
        }
    };
    

    const newtonRaphsonMethod = (eq, initialGuess, tol, maxIter) => {
        if (!eq) {
            throw new Error('The equation is undefined.');
        }
    
        const expression = eq;
        const derivative = math.derivative(eq,'x');
        const func = math.compile(eq);
        const funcDerivative = math.compile(derivative.toString());
    
        let x = initialGuess;
        let iteration = 0;
        let steps = [];
    
        do {
            const f = func.evaluate({ x });
            const fPrime = funcDerivative.evaluate({ x });
    
            const newX = x - f / fPrime;
    
            steps.push({ iteration, root: newX });
    
            iteration++;
            x = newX;
        } while (Math.abs(func.evaluate({ x })) > tol && iteration < maxIter);
    
        return { root: x, steps };
    };
    
    
    return (
        <div className=' w-full'>
        <ToastContainer />
        <div>
            <h1 className='text-2xl'>Newton-Raphson Method Solver</h1>
            <div>
                <label>Equation:</label>
                <input className='border p-1 rounded-md m-2' type="text" value={equation} onChange={e => setEquation(e.target.value)} />
            </div>
            <div>
                <label>Initial Guess:</label>
                <input className='border p-1 rounded-md m-2' type="text" value={initialGuess} onChange={e => setInitialGuess(e.target.value)} />
            </div>
            <div>
                <label>Tolerance:</label>
                <input className='border p-1 rounded-md m-2' type="text" value={tolerance} onChange={e => setTolerance(parseFloat(e.target.value))} />
            </div>
            <div>
                <label>Max Iterations:</label>
                <input className='border p-1 rounded-md m-2' type="text" value={maxIterations} onChange={e => setMaxIterations(parseInt(e.target.value))} />
            </div>
        </div>
        <button className='p-2 bg-blue-500 text-white rounded-md' onClick={handleSolve}>Solve</button>
        <div className='h-10 w-10' id="chart" ref={chartRef}></div>

        {result !== null && (
            <div>
                <h3 className='text-center'>Results</h3>
                <p>Approximate root: {result}</p>
            </div>
        )}
        {iterationSteps.length > 0 && (
            <div>
                <h3>Iterations:-</h3>
                {iterationSteps.map((step, index) => (
                    <ul key={index}>
                        <li>Iteration {step.iteration}: root = {step.root}</li>
                    </ul>
                ))}
            </div>
        )}

    </div>
    );
}

export default NewtonRaphson;
