const vertexShaderText = [
    "precision mediump float;",
    "",
    "attribute vec2 vertPosition;",
    "attribute vec3 vertColor;",
    "varying vec3 fragColor;",
    "",
    "void main(){",
    "   fragColor = vertColor;",
    "   gl_Position = vec4(vertPosition, 0.0, 1.0);",
    "}",
].join("\n");

const fragmentShaderText = [
    "precision mediump float;",
    "",
    "varying vec3 fragColor;",
    "void main(){",
    "   gl_FragColor = vec4(fragColor, 1.0);",
    "}",
].join("\n");

function main() {
    /**
     * @type {HTMLCanvasElement} canvas
     */
    const canvas = document.querySelector("#myCanvas");

    /**
     * @type {WebGLRenderingContext} gl
     */
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.log(
            "WebGl not supported without, falling back without experimental web-gl"
        );
        gl = canvas.getContext("experimental-webgl");
    }
    if (!gl) {
        alert("Your browser doesn't support webGl");
    }

    //set canvas
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //make shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(
            "ERROR! cannot compile vertex shader",
            getShaderInfoLog(vertexShader)
        );
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(
            "ERROR! cannot compile fragment shader",
            gl.getShaderInfoLog(fragmentShader)
        );
        return;
    }

    //link program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
            "ERROR! cannot link program",
            gl.getProgramInfoLog(program)
        );
        return;
    }

    //validate program
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error(
            "ERROR! cannot validate program",
            gl.getProgramInfoLog(program)
        );
        return;
    }

    //create buffer
    const triangleVertices = [
        // SEGITIGA DASAR
        0.0, 0.8,       1.0, 1.0, 0.0,
        -0.7, -0.8,     0.7, 0.0, 1.0, 
        0.7, -0.8,      0.1, 1.0, 0.6, 
        // SEGITIGA DALEM
        0.0, 0.55,      0.75, 0.85, 0.8,
        -0.33, -0.2,    0.75, 0.85, 0.8,
        0.33, -0.2,     0.75, 0.85, 0.8,
        // TRAPESIUM KIRI
        -0.37, -0.32,   0.75, 0.85, 0.8,
        -0.59, -0.8,    0.75, 0.85, 0.8, 
        0.59, -0.8,     0.75, 0.85, 0.8,
        // TRAPESIUM KANAN 
        0.59, -0.8,     0.75, 0.85, 0.8,
        -0.37, -0.32,   0.75, 0.85, 0.8,
        0.37, -0.32,    0.75, 0.85, 0.8, 
    ];

    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(triangleVertices),
        gl.STATIC_DRAW
    );

    const positionAttribLocation = gl.getAttribLocation(
        program,
        "vertPosition"
    );
    const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
        positionAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 12);
}
