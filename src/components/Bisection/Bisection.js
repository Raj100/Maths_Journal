import React, { useState,useRef,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as d3 from 'd3';

function BisectionMethod() {
    const [equation, setEquation] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [tolerance, setTolerance] = useState(1e-3);
    const [maxIterations, setMaxIterations] = useState(100);
    const [result, setResult] = useState(null);
    const [iterationSteps, setIterationSteps] = useState([]);


    const chartRef = useRef();

    useEffect(() => {
        if (iterationSteps.length > 0) {
            console.log(iterationSteps); // Add this line
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
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);

        if (isNaN(aNum) || isNaN(bNum) || equation.trim() === '') {
            toast.error('Please enter valid equation and interval values.');
            return;
        }

        console.log("Equation:", equation);
        console.log("Initial Interval [a, b]:", [aNum, bNum]);
        console.log("Tolerance:", tolerance);
        console.log("Max Iterations:", maxIterations);

        const { root, steps } = bisectionMethod(equation, aNum, bNum, tolerance, maxIterations);

        console.log("Root:", root);
        console.log("Steps:", steps);

        setResult(root);
        setIterationSteps(steps);
    };
    const func = x => eval(eq.replaceAll('x', x)); // Replace '^' with '**'

    const bisectionMethod = (eq, a, b, tol, maxIter) => {
        eq = eq.replaceAll('^', '**');
        const func = x => eval(eq.replaceAll('x', x).replaceAll('X', x));
    
        console.log("Initial interval [a, b]:", [a, b]);
    
        if (func(a) * func(b) >= 0) {
            console.log("Function has the same sign at endpoints. Bisection method fails.");
            toast.error('Function has the same sign at endpoints. Change the end points. Bisection method fails.');
            return { root: null, steps: [] };
        }
    
        let iteration = 0;
        let steps = [];
        let prev=0.0;
        let current=0.0;
       do
            {
            const c = (a + b) / 2;
            console.log("Iteration:", iteration, "Root:", c);
            prev=current;
            current=c;
            steps.push({upper: a, lower: b, iteration: iteration, root: c });

            console.log("current",current);
            console.log("prev",prev);
            console.log("Math.abs(prev - current)", Math.abs(prev - current))
            console.log("tol",tol);
    
    
            if (func(c) === 0) {
                console.log("Found exact root:", c);
                return { root: c, steps: steps };
            } else if (func(c) * func(a) < 0) {
                b = c;
            } else {
                a = c;
            }
            iteration++;
        } while( Math.abs(prev - current) > tol && iteration < maxIter);

        console.log("Approximate root:", (a + b) / 2);
        steps.push({  upper: a, lower: b, iteration: iteration, root: (a + b) / 2 });
        return { upper: a, lower: b, root: (a + b) / 2, steps: steps };
    };
    
    return (
        <div className=' w-full'>
                        <ToastContainer/>
            <div className=''>
            <h1 className='text-2xl'>Bisection Method Solver</h1>
            <div>
                <label>Equation:</label>
                <input className='border p-1 rounded-md m-2' type="text" value={equation} onChange={e => setEquation(e.target.value)} />
            </div>
            <div>
                <label>Initial Interval [a, b]:</label>
                <input className='border p-1 rounded-md m-2' type="text" value={a} onChange={e => setA(e.target.value)} /> to&nbsp;
                <input className='border p-1 rounded-md m-2' type="text" value={b} onChange={e => setB(e.target.value)} />
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
                    <h3 className='tetx-center'>Results</h3>
                    <p>Approximate root: {result}</p>
                    {/* <p>Value of the function at the root: {eval(eq.replace('^', '**'))}</p> */}
                </div>
            )}
            {iterationSteps.length > 0 && (
                <div>
                    <h3>Iterations:-</h3>
                        {iterationSteps.map((step, index) => (
                            <ul key={index}>
                            <li >Iteration {step.iteration}: root between {step.upper} and {step.lower} </li>
                            <li>Root: {step.root}</li>
                            </ul>
                        ))}
                </div>
            )}

        </div>
    );
}

export default BisectionMethod;
