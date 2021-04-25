class EnvironmentMaterial extends Material {

    constructor(precomputeL, vertexShader, fragmentShader) {
        // let lightMVP = light.CalcLightMVP(translate, scale);
        // let lightIntensity = light.mat.GetIntensity();

        super({
            // Phong
            //'uSampler': { type: 'texture', value: color },
            // 'uKs': { type: '3fv', value: specular },
            // 'uLightRadiance': { type: '3fv', value: lightIntensity },
            // // Shadow
            // 'uShadowMap': { type: 'texture', value: light.fbo },
            // 'uLightMVP': { type: 'matrix4fv', value: lightMVP },
            // prt
            'aPrecomputeL' : { type: '3fv', value: precomputeL },
        }, ['aPrecomputeLT'], vertexShader, fragmentShader, null);
    }
}

async function buildEnvironmentMaterial(precomputeL, vertexPath, fragmentPath) {


    let vertexShader = await getShaderString(vertexPath);
    let fragmentShader = await getShaderString(fragmentPath);

    return new EnvironmentMaterial(precomputeL, vertexShader, fragmentShader);

}