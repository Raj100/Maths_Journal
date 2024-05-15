import React, { useState } from 'react';

function BisectionMethod() {
    const [equation, setEquation] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [tolerance, setTolerance] = useState(1e-6);
    const [maxIterations, setMaxIterations] = useState(100);
    const [result, setResult] = useState(null);
    const [iterationSteps, setIterationSteps] = useState([]);

    const handleSolve = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);

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

    const bisectionMethod = (eq, a, b, tol, maxIter) => {
        const func = x => eval(eq.replace('^', '**').replace('x', x)); // Replace '^' with '**'

        console.log("Initial interval [a, b]:", [a, b]);

        if (func(a) * func(b) >= 0) {
            console.log("Function has the same sign at endpoints. Bisection method fails.");
            return { root: null, steps: [] };
        }

        let iteration = 0;
        let steps = [];
        while ((b - a) / 2 > tol && iteration < maxIter) {
            const c = (a + b) / 2;
            console.log("Iteration:", iteration, "Root:", c);

            steps.push({ iteration: iteration, root: c });

            if (func(c) === 0) {
                console.log("Found exact root:", c);
                return { root: c, steps: steps };
            } else if (func(c) * func(a) < 0) {
                b = c;
            } else {
                a = c;
            }
            iteration++;
        }

        console.log("Approximate root:", (a + b) / 2);
        steps.push({ iteration: iteration, root: (a + b) / 2 });
        return { root: (a + b) / 2, steps: steps };
    };

    return (
        <div>
            <h2>Bisection Method Solver</h2>
            <div>
                <label>Equation:</label>
                <input type="text" value={equation} onChange={e => setEquation(e.target.value)} />
            </div>
            <div>
                <label>Initial Interval [a, b]:</label>
                <input type="text" value={a} onChange={e => setA(e.target.value)} /> to&nbsp;
                <input type="text" value={b} onChange={e => setB(e.target.value)} />
            </div>
            <div>
                <label>Tolerance:</label>
                <input type="text" value={tolerance} onChange={e => setTolerance(parseFloat(e.target.value))} />
            </div>
            <div>
                <label>Max Iterations:</label>
                <input type="text" value={maxIterations} onChange={e => setMaxIterations(parseInt(e.target.value))} />
            </div>
            <button onClick={handleSolve}>Solve</button>
            {result !== null && (
                <div>
                    <h3>Result:</h3>
                    <p>Approximate root: {result}</p>
                    <p>Value of the function at the root: {eval(equation.replace('^', '**').replace('x', result))}</p>
                </div>
            )}
            {iterationSteps.length > 0 && (
                <div>
                    <h3>Iterations:</h3>
                    <ul>
                        {iterationSteps.map((step, index) => (
                            <li key={index}>Iteration {step.iteration}: Root {step.root}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BisectionMethod;
