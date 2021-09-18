function main() {
    /**
     * @type {HTMLCanvasElement} canvas
     */
    const canvas = document.getElementById("myCanvas");

    /**
     * @type {WebGLRenderingContext} gl
     */
    const gl = canvas.getContext("webgl");

    //mendefinisikan posisi
    /*
     * A(-0.5, 0.5); B(-0.5, -0.5); C(0.5, -0.5)
     */
    const vertices = [
        //A
        -0.5, 0.5,
        //B
        -0.5, -0.5,
        //C
        0.5, -0.5,
    ];

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //posisi sama ukuran
    const vertexShaderCode = document.querySelector("#vertexShaderCode").text;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //warna
    const fragmentShaderCode = document.querySelector(
        "#fragmentShaderCode"
    ).text;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //jadiin 1 package itu data data fragmen sama vertexnya
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //apus canvas sebelum di gambar lagi (semacam reset sekaligus ngasih warna)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 3);
}
