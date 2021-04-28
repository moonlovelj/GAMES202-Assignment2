class EnvironmentMaterial extends Material {

    constructor(precomputeL, vertexShader, fragmentShader) {
        super({
            // Phong
            //'uSampler': { type: 'texture', value: color },
            // 'uKs': { type: '3fv', value: specular },
            // 'uLightRadiance': { type: '3fv', value: lightIntensity },
            // // Shadow
            // 'uShadowMap': { type: 'texture', value: light.fbo },
            // 'uLightMVP': { type: 'matrix4fv', value: lightMVP },
            // prt
            'aPrecomputeL' : { type: 'changeble', value: 'aPrecomputeL'},
            'uLightScale' : { type : 'changeble', value: 'uLightScale'},
        }, ['aPrecomputeLT'], vertexShader, fragmentShader, null);

        this.precomputeL = precomputeL;
    }

    setChangebleUniform(gl, uniformName, shaderProgramUniform) {
        switch(uniformName)
        {
            // case 'aPrecomputeL':
            //     gl.uniform3fv(
			// 		shaderProgramUniform,
			// 		this.precomputeL[guiParams.envmapId]); 
            //     break;
            case 'uLightScale':
                gl.uniform1f(
					shaderProgramUniform,
					exposureControls.exposureScale);
                break;
        }
    }
}

async function buildEnvironmentMaterial(precomputeL, vertexPath, fragmentPath) {


    let vertexShader = await getShaderString(vertexPath);
    let fragmentShader = await getShaderString(fragmentPath);

    return new EnvironmentMaterial(precomputeL, vertexShader, fragmentShader);

}