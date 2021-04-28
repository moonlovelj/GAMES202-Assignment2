function getRotationPrecomputeL(precompute_L, rotationMatrix){

	let result = [];
	result[0] = precompute_L[0];
	result[1] = precompute_L[1];
	result[2] = precompute_L[2];

	let matrix3X3 = computeSquareMatrix_3by3(rotationMatrix);
	let matrix5X5 = computeSquareMatrix_5by5(rotationMatrix);

	let band1 = math.multiply(matrix3X3, math.matrix([
		[precompute_L[3], precompute_L[4], precompute_L[5]],
		[precompute_L[6], precompute_L[7], precompute_L[8]],
		[precompute_L[9], precompute_L[10], precompute_L[11]],
	]));
	result[3] = band1._data[0][0];
	result[4] = band1._data[0][1];
	result[5] = band1._data[0][2];
	result[6] = band1._data[1][0];
	result[7] = band1._data[1][1];
	result[8] = band1._data[1][2];
	result[9] = band1._data[2][0];
	result[10] = band1._data[2][1];
	result[11] = band1._data[2][2];

	let band2 = math.multiply(matrix5X5, math.matrix([
		[precompute_L[12], precompute_L[13], precompute_L[14]],
		[precompute_L[15], precompute_L[16], precompute_L[17]],
		[precompute_L[18], precompute_L[19], precompute_L[20]],
		[precompute_L[21], precompute_L[22], precompute_L[23]],
		[precompute_L[24], precompute_L[25], precompute_L[26]],
	]));

	result[12] = band2._data[0][0];
	result[13] = band2._data[0][1];
	result[14] = band2._data[0][2];
	result[15] = band2._data[1][0];
	result[16] = band2._data[1][1];
	result[17] = band2._data[1][2];
	result[18] = band2._data[2][0];
	result[19] = band2._data[2][1];
	result[20] = band2._data[2][2];
	result[21] = band2._data[3][0];
	result[22] = band2._data[3][1];
	result[23] = band2._data[3][2];
	result[24] = band2._data[4][0];
	result[25] = band2._data[4][1];
	result[26] = band2._data[4][2];

	return result;
}

function computeSquareMatrix_3by3(rotationMatrix){ // 计算方阵SA(-1) 3*3 
	
	// 1、pick ni - {ni}
	let n1 = [1, 0, 0, 0]; let n2 = [0, 0, 1, 0]; let n3 = [0, 1, 0, 0];

	// 2、{P(ni)} - A  A_inverse
	let p1 = SHEval(n1[0], n1[1], n1[2], 3);
	let p2 = SHEval(n2[0], n2[1], n2[2], 3);
	let p3 = SHEval(n3[0], n3[1], n3[2], 3);
	let A = [
		[p1[1], p1[2], p1[3]],
		[p2[1], p2[2], p2[3]],
		[p3[1], p3[2], p3[3]]
	];
	let A_inverse = math.inv(A);

	// 3、用 R 旋转 ni - {R(ni)}
	let R = mat4Matrix2mathMatrix(rotationMatrix);
	let R_n1 = math.multiply(R, n1);
	let R_n2 = math.multiply(R, n2);
	let R_n3 = math.multiply(R, n3);

	// 4、R(ni) SH投影 - S
	let P_R_n1 = SHEval(R_n1._data[0], R_n1._data[1], R_n1._data[2], 3);
	let P_R_n2 = SHEval(R_n2._data[0], R_n2._data[1], R_n2._data[2], 3);
	let P_R_n3 = SHEval(R_n3._data[0], R_n3._data[1], R_n3._data[2], 3);

	let S = [
		[P_R_n1[1], P_R_n1[2], P_R_n1[3]], 
		[P_R_n2[1], P_R_n2[2], P_R_n2[3]], 
		[P_R_n3[1], P_R_n3[2], P_R_n3[3]]
	];

	// 5、S*A_inverse
	return math.multiply(S, A_inverse);
}

function computeSquareMatrix_5by5(rotationMatrix){ // 计算方阵SA(-1) 5*5
	
	// 1、pick ni - {ni}
	let k = 1 / math.sqrt(2);
	let n1 = [1, 0, 0, 0]; let n2 = [0, 0, 1, 0]; let n3 = [k, k, 0, 0]; 
	let n4 = [k, 0, k, 0]; let n5 = [0, k, k, 0];

	// 2、{P(ni)} - A  A_inverse
	let p1 = SHEval(n1[0], n1[1], n1[2], 3);
	let p2 = SHEval(n2[0], n2[1], n2[2], 3);
	let p3 = SHEval(n3[0], n3[1], n3[2], 3);
	let p4 = SHEval(n4[0], n4[1], n4[2], 3);
	let p5 = SHEval(n5[0], n5[1], n5[2], 3);
	let A = [
		[p1[4], p1[5], p1[6], p1[7], p1[8]],
		[p2[4], p2[5], p2[6], p2[7], p2[8]],
		[p3[4], p3[5], p3[6], p3[7], p3[8]],
		[p4[4], p4[5], p4[6], p4[7], p4[8]],
		[p5[4], p5[5], p5[6], p5[7], p5[8]]
	];
	let A_inverse = math.inv(A);

	// 3、用 R 旋转 ni - {R(ni)}
	let R = mat4Matrix2mathMatrix(rotationMatrix);
	let R_n1 = math.multiply(R, n1);
	let R_n2 = math.multiply(R, n2);
	let R_n3 = math.multiply(R, n3);
	let R_n4 = math.multiply(R, n4);
	let R_n5 = math.multiply(R, n5);

	// 4、R(ni) SH投影 - S
	let P_R_n1 = SHEval(R_n1._data[0], R_n1._data[1], R_n1._data[2], 3);
	let P_R_n2 = SHEval(R_n2._data[0], R_n2._data[1], R_n2._data[2], 3);
	let P_R_n3 = SHEval(R_n3._data[0], R_n3._data[1], R_n3._data[2], 3);
	let P_R_n4 = SHEval(R_n4._data[0], R_n4._data[1], R_n4._data[2], 3);
	let P_R_n5 = SHEval(R_n5._data[0], R_n5._data[1], R_n5._data[2], 3);
	let S = [
		[P_R_n1[4], P_R_n1[5], P_R_n1[6], P_R_n1[7], P_R_n1[8]],
		[P_R_n2[4], P_R_n2[5], P_R_n2[6], P_R_n2[7], P_R_n2[8]],
		[P_R_n3[4], P_R_n3[5], P_R_n3[6], P_R_n3[7], P_R_n3[8]],
		[P_R_n4[4], P_R_n4[5], P_R_n4[6], P_R_n4[7], P_R_n4[8]],
		[P_R_n5[4], P_R_n5[5], P_R_n5[6], P_R_n5[7], P_R_n5[8]]
	];

	// 5、S*A_inverse
	return math.multiply(S, A_inverse);
}

function mat4Matrix2mathMatrix(rotationMatrix){

	let mathMatrix = [];
	for(let i = 0; i < 4; i++){
		let r = [];
		for(let j = 0; j < 4; j++){
			r.push(rotationMatrix[i*4+j]);
		}
		mathMatrix.push(r);
	}
	return math.matrix(mathMatrix)

}

function getMat3ValueFromRGB(precomputeL){

    let colorMat3 = [];
    for(var i = 0; i<3; i++){
        colorMat3[i] = mat3.fromValues( precomputeL[0][i], precomputeL[1][i], precomputeL[2][i],
										precomputeL[3][i], precomputeL[4][i], precomputeL[5][i],
										precomputeL[6][i], precomputeL[7][i], precomputeL[8][i] ); 
	}
    return colorMat3;
}