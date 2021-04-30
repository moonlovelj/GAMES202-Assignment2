# WebGL
PRT材质在EnvironmentMaterial.js文件里面实现，对应Shader是environmentVertex.glsl和environmentFragment.glsl.<br>
调整了precomputeL的格式，使其和Shader里面的类型匹配.<br>
加了一个自定义Uniform类型'changeble',以便于支持实时切换cubemap.<br>
SH旋转算法主要在tool.js文件里面实现.<br>

# PRT
实现了预计算环境光照、Diffuse Unshadowed、Diffuse Shadowed、Diffuse Inter-reflection.<br>
Diffuse Inter-reflection的实现位于prt.cpp中的245~317行.<br>
