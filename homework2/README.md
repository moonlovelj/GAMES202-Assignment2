# WebGL
PRT材质在EnvironmentMaterial.js文件里面实现，对应Shader是environmentVertex.glsl和environmentFragment.glsl.
调整了precomputeL的格式，使其和Shader里面的类型匹配.
加了一个自定义Uniform类型'changeble',以便于支持实时切换cubemap.
SH旋转算法主要在tool.js文件里面实现.

# PRT
实现了预计算环境光照、Diffuse Unshadowed、Diffuse Shadowed、Diffuse Inter-reflection.
Diffuse Inter-reflection的实现位于prt.cpp中的245~317行.
