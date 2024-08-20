varying vec2 vUv;
uniform vec2 uScreenResolution;
uniform vec2 uScanLineOpacity;
uniform vec3 uBaseColor;
uniform vec3 uColor;
uniform float uVignetteOpacity;
uniform float uBrightness;
uniform float uVignetteRoundness;
float PI = 3.1415926538;

vec4 scanLineIntensity(float uv, float resolution, float opacity) {
    float intensity = sin(uv * resolution * PI * 2.0);
    intensity = ((0.5 * intensity) + 0.5) * 0.9 + 0.1;
    return vec4(vec3(pow(intensity, opacity)), 1.0);
}

vec4 vignetteIntensity(vec2 uv, vec2 resolution, float opacity, float roundness) {
    float intensity = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    return vec4(vec3(clamp(pow((resolution.x / roundness) * intensity, opacity), 0.0, 1.0)), 1.0);
}

void main(void) {

    vec4 baseColor = vec4(uBaseColor, 1.0); // 使用不透明的基底顏色

    baseColor *= vignetteIntensity(vUv, uScreenResolution, uVignetteOpacity, uVignetteRoundness);
    baseColor *= scanLineIntensity(vUv.x, uScreenResolution.y, uScanLineOpacity.x);
    baseColor *= scanLineIntensity(vUv.y, uScreenResolution.x, uScanLineOpacity.y);

    baseColor *= vec4(vec3(uBrightness), 1.0);

    if (vUv.x < 0.0 || vUv.y < 0.0 || vUv.x > 1.0 || vUv.y > 1.0){
        gl_FragColor = vec4(uColor, 1.0);
    } else {
        gl_FragColor = baseColor;
    }
}
