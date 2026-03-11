const canvas = document.getElementById('bg-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert("WebGL non supporté");
}

const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

// SHADER AMÉLIORÉ : Plus de luminosité et couleurs fidèles à l'image
const fragmentShaderSource = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;

    float wave(vec2 uv, float speed, float freq, float amp, float offset) {
        float s = sin(uv.x * freq + u_time * speed + offset);
        // On augmente la valeur (0.04 au lieu de 0.02) pour rendre les vagues plus visibles
        return 0.04 / abs(uv.y - s * amp);
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.y, u_resolution.x);
        
        // Un fond bleu nuit très profond (pas noir pur)
        vec3 color = vec3(0.0, 0.02, 0.1); 

        // Vague 1 : Bleu Cyan (Électrique)
        float v1 = wave(uv, 0.5, 1.5, 0.2, 0.0);
        color += vec3(0.0, 0.5, 1.0) * v1;

        // Vague 2 : Violette (Celle du bas sur ton image)
        float v2 = wave(uv + vec2(0.0, 0.3), 0.3, 1.0, 0.15, 4.0);
        color += vec3(0.5, 0.0, 1.0) * v2;

        // Vague 3 : Cyan clair (Brillance)
        float v3 = wave(uv - vec2(0.0, 0.2), 0.8, 2.0, 0.1, 2.0);
        color += vec3(0.0, 1.0, 1.0) * v3;

        gl_FragColor = vec4(color, 1.0);
    }
`;

// --- Fonctions de compilation ---
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

const program = gl.createProgram();
gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
gl.linkProgram(program);
gl.useProgram(program);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

const pos = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

const timeLoc = gl.getUniformLocation(program, "u_time");
const resLoc = gl.getUniformLocation(program, "u_resolution");

function render(time) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    gl.uniform1f(timeLoc, time * 0.001);
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);