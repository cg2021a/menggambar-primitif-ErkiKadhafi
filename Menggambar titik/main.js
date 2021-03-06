function main() {
    //akses kanvas
    const canvas = document.querySelector("#myCanvas");
    //siapin tools buat gambar -> pulpen, pensil, kuas, dsb
    const context = canvas.getContext("webgl");

    //posisi sama ukuran
    const vertexShaderCode = `
    void main(){
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }`;
    const vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode);
    context.compileShader(vertexShader);

    //warna
    const fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`;
    const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragmentShaderCode);
    context.compileShader(fragmentShader);

    //jadiin 1 package itu data data fragmen sama vertexnya
    const shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);

    //apus canvas sebelum di gambar lagi (semacam reset sekaligus ngasih warna)
    context.clearColor(0.0, 0.0, 1.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.POINTS, 0, 1);
}
