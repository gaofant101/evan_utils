//加法运算
var accAdd = function(num1,num2){
    var n1,n2,m;
    try{
        n1 = num1.toString().split(".")[1].length;
    }catch(e){
        n1 = 0;
    }
    try{
        n2 = num2.toString().split(".")[1].length;
    }catch(e){
        n2 = 0;
    }
    m = Math.pow(10,Math.max(n1,n2));
    return (num1*m + num2*m)/m;
}

//减法运算
var suntr = function(num1,num2){
    var n1,n2,m,n;
    try{
        n1 = num1.toString().split(".")[1].length;
    }catch(e){
        n1 = 0;
    }
    try{
        n2 = num2.toString().split(".")[1].length;
    }catch(e){
        n2 = 0;
    }
    m = Math.pow(10,Math.max(n1,n2));
    n = (n1 > n2) ? n1 : n2;
    return ((num1*m - num2*m)/m).toFixed(n);
}

//乘法运算
var accMul = function(num1,num2){
    var m = 0,n1,n2,
        s1 = num1.toString(),
        s2 = num2.toString();
    try{
        m += s1.split(".")[1].length;
    }catch(e){

    }
    try{
        m += s2.split(".")[1].length;
    }catch(e){

    }
    n1 = Number(s1.replace(".",""));
    n2 = Number(s2.replace(".",""));
    return n1 * n2 / Math.pow(10,m);
}

//除法运算
var accDivi = function(num1,num2){
    var s1 = 0,s2 = 0,n1,n2;
    try{
        s1 = num1.toString().split(".")[1].length;
    }catch(e){

    }
    try{
        s2 = num2.toString().split(".")[1].length;
    }catch(e){

    }
    with(Math){
        n1 = Number(num1.toString().replace(".",""));
        n2 = Number(num2.toString().replace(".",""));
        return (n1/n2)*Math.pow(10,s2-s1);
    }
}
