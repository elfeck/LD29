(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isc=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="c"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bZ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bZ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bZ(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bm=function(){}
var dart=[["","",,D,{
"^":"",
jw:[function(){var z=new D.eN(null,null,null)
z.c=0
if(!z.v()){P.W("could not init GL")
return}z.dV()
J.ca($.b,16384)
z.b.bK(0)
C.j.gbE(window).c2(z.gbS())},"$0","cA",0,0,1],
a3:{
"^":"c;a7:c<,dC:d<",
dl:function(a,b){var z=this.c
if(z.a===a&&z.b===b){if(!this.b){this.b=!0
z=this.a
z.c.L(0,new D.p(50,50,50))
z.e=!1}}else if(this.b){z=this.a
z.c.L(0,new D.p(-50,-50,-50))
z.e=!1
this.b=!1}},
X:function(a){},
bI:function(a){return!1},
bF:function(a){var z,y
z=a.ga7().a
y=this.c.a
if(typeof z!=="number")return z.D()
if(typeof y!=="number")return H.w(y)
if(Math.abs(z-y)<2){z=a.ga7().b
y=this.c.b
if(typeof z!=="number")return z.D()
if(typeof y!=="number")return H.w(y)
z=Math.abs(z-y)<2&&a!==this}else z=!1
return z},
bc:function(a){this.b=!1
this.c=this.a.b
this.d=!1}},
bg:{
"^":"a3;e,f,r,x,a,b,c,d",
X:function(a){var z=this.f
if(typeof a!=="number")return H.w(a)
z-=this.r*a
this.f=z
if(z<=0)this.d=!0
this.e=!1},
aZ:function(a){var z
if(this.e)return 0
this.e=!0
if(typeof a!=="number")return H.w(a)
z=this.x*a
this.f-=z
return z}},
b8:{
"^":"a3;e,f,r,x,a,b,c,d",
X:function(a){var z=this.r
if(typeof a!=="number")return H.w(a)
z-=this.x*a
this.r=z
if(z<=0)this.d=!0
this.e=!1},
aZ:function(a){var z
if(this.e)return 0
this.e=!0
if(typeof a!=="number")return H.w(a)
z=this.f*a
this.r-=z
return z},
cG:function(a){var z=$.$get$bK()
a.c=new D.p(z.a,z.b,z.c)
a.e=!1
this.r=$.$get$q().p(6)+6},
static:{cM:function(a){var z=new D.b8(!1,0.0005,null,0.00005,a,null,null,null)
z.bc(a)
z.cG(a)
return z}}},
av:{
"^":"a3;a,b,c,d",
X:function(a){},
bI:function(a){var z,y,x,w,v,u,t
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.a1)(a),++y){x=a[y]
w=this.c.a
v=x.ga7().a
if(typeof w!=="number")return w.D()
if(typeof v!=="number")return H.w(v)
u=this.c.b
t=x.ga7().b
if(typeof u!=="number")return u.D()
if(typeof t!=="number")return H.w(t)
if(Math.abs(w-v)<2&&Math.abs(u-t)<2)return!0}return!1}},
bP:{
"^":"a3;e,a,b,c,d",
X:function(a){},
cJ:function(a,b){var z
if(this.e){z=$.$get$bQ()[0]
a.c=new D.p(z.a,z.b,z.c)
a.e=!1}else{z=$.$get$bQ()[1]
a.c=new D.p(z.a,z.b,z.c)
a.e=!1}},
static:{d2:function(a,b){var z=new D.bP(b,a,null,null,null)
z.bc(a)
z.cJ(a,b)
return z}}},
cX:{
"^":"a3;a,b,c,d",
X:function(a){}},
et:{
"^":"a3;a,b,c,d",
X:function(a){}},
cu:{
"^":"c;a,b,c,d,e,f,r,x,y,z",
v:function(){var z,y,x,w
z=new D.cW(null,null,null)
this.z=z
z.bO($.i0,$.i_)
this.x=J.aW($.b)
z=J.aW($.b)
this.y=z
J.t($.b,34963,z)
J.t($.b,34962,this.x)
z=J.b_($.b,this.z.a,"vert_position")
this.d=z
J.aX($.b,z)
J.a2($.b,this.d,4,5126,!1,32,0)
z=J.b_($.b,this.z.a,"vert_tex_coord")
this.e=z
J.aX($.b,z)
J.a2($.b,this.e,4,5126,!1,32,16)
J.t($.b,34962,null)
J.t($.b,34963,null)
y=H.e([],[P.X])
x=H.e([],[P.r])
for(w=0;z=this.a,w<z.length;++w)z[w].ae(w*4,y,x)
J.t($.b,34962,this.x)
J.aV($.b,34962,new Float32Array(H.aa(y)),35044)
J.t($.b,34962,null)
J.t($.b,34963,this.y)
J.aV($.b,34963,new Int16Array(H.aa(x)),35044)
J.t($.b,34963,null)},
E:function(){var z,y,x
this.b6()
J.t($.b,34963,this.y)
J.t($.b,34962,this.x)
J.a2($.b,this.d,4,5126,!1,32,0)
J.a2($.b,this.e,4,5126,!1,32,16)
J.cj($.b,0,0,$.u,$.af)
z=this.z
J.b0($.b,z.a)
z=this.z
y=$.$get$c6()
x=$.b
x.uniformMatrix4fv(J.aI(x,z.a,"mvp_matrix"),!1,new Float32Array(H.aa(y)))
y=this.z
z=$.b
z.uniform1i(J.aI(z,y.a,"tex_sampler"),0)
z=this.r
if(z.d)J.br($.b,3553,z.a)
J.cd($.b,4,6*this.a.length,5123,0)
this.z.toString
J.b0($.b,null)
J.t($.b,34963,null)
J.t($.b,34962,null)},
b6:function(){var z,y,x,w,v,u,t,s,r,q
z=this.a
y=z.length
for(x=y,w=-1,v=0;v<z.length;z.length===y||(0,H.a1)(z),++v){u=z[v]
if(u.d!==!0){t=this.a
x=P.c5(x,(t&&C.b).ar(t,u))
t=this.a
w=P.dI(w,(t&&C.b).ar(t,u))}}if(w===-1)return
s=H.e([],[P.X])
r=H.e([],[P.r])
for(q=x;q<=w;++q){z=this.a
if(q<0||q>=z.length)return H.a(z,q)
z[q].ae(q*4,s,r)}J.t($.b,34962,this.x)
J.c9($.b,34962,x*8*4*4,new Float32Array(H.aa(s)))
J.t($.b,34962,null)},
b7:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=this.a
if(y>=x.length)return H.a(x,y)
x=x[y]
x.b=this.ba(a[y])
x.d=!1}},
ba:function(a){var z,y,x,w,v
switch(a){case"a":z=0
break
case"b":z=0.015625
break
case"c":z=0.03125
break
case"d":z=0.046875
break
case"e":z=0.0625
break
case"f":z=0.078125
break
case"g":z=0.09375
break
case"h":z=0.109375
break
case"i":z=0.125
break
case"j":z=0.140625
break
case"k":z=0.15625
break
case"l":z=0.171875
break
case"m":z=0.1875
break
case"n":z=0.203125
break
case"o":z=0.21875
break
case"p":z=0.234375
break
case"q":z=0.25
break
case"r":z=0.265625
break
case"s":z=0.28125
break
case"t":z=0.296875
break
case"u":z=0.3125
break
case"v":z=0.328125
break
case"w":z=0.34375
break
case"x":z=0.359375
break
case"y":z=0.375
break
case"z":z=0.390625
break
case"1":z=0.40625
break
case"2":z=0.421875
break
case"3":z=0.4375
break
case"4":z=0.453125
break
case"5":z=0.46875
break
case"6":z=0.484375
break
case"7":z=0.5
break
case"8":z=0.515625
break
case"9":z=0.53125
break
case"0":z=0.546875
break
case"-":z=0.5625
break
case"+":z=0.578125
break
case" ":z=0.59375
break
case":":z=0.609375
break
case".":z=0.625
break
default:z=0}y=H.e([],[D.k])
x=0+z
w=this.f
y.push(new D.p(x,1,w))
v=0.015625+z
y.push(new D.p(v,1,w))
y.push(new D.p(v,0,w))
y.push(new D.p(x,0,w))
return y},
cD:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=C.o.dv(document,"img")
J.eb(z,"letterMap.png")
this.r=D.ft(z)
this.b=0.125
this.c=0.5
this.a=H.e([],[D.d0])
y=J.O(b)
x=0
while(!0){w=y.gl(b)
if(typeof w!=="number")return H.w(w)
if(!(x<w))break
w=this.a
v=a.a
if(typeof v!=="number")return v.u()
u=$.u
t=a.b
s=$.af
if(typeof t!=="number")return t.D()
w.push(new D.d0(new D.k(v+x*c-u*0.5,t-s*0.5),this.ba(y.h(b,x)),c,null));++x}},
static:{B:function(a,b,c,d){var z=new D.cu(null,null,null,null,null,d,null,null,null,null)
z.cD(a,b,c,d)
return z}}},
eN:{
"^":"c;a,b,c",
v:function(){var z=document.querySelector("#canvas")
this.a=z
z=J.e5(z,"experimental-webgl")
$.b=z
if(z==null){document.querySelector("#footer").textContent="Sorry but you need WebGL Support for your browser"
return!1}J.dT(z,0.7,0.3,0.3,1)
return!0},
dV:function(){J.ec(this.a,$.u)
J.ea(this.a,$.af)
var z=J.dZ(document.querySelector("#canvas"))
H.e(new W.ak(0,z.a,z.b,W.ab(new D.eO()),!1),[H.P(z,0)]).R()
z=J.e1(document.querySelector("#canvas"))
H.e(new W.ak(0,z.a,z.b,W.ab(new D.eP()),!1),[H.P(z,0)]).R()
z=J.e0(document.querySelector("#canvas"))
H.e(new W.ak(0,z.a,z.b,W.ab(new D.eQ()),!1),[H.P(z,0)]).R()
z=J.e2(document.querySelector("#canvas"))
H.e(new W.ak(0,z.a,z.b,W.ab(new D.eR()),!1),[H.P(z,0)]).R()
z=H.e(new W.bi(window,"keyup",!1),[null])
H.e(new W.ak(0,z.a,z.b,W.ab(new D.eS()),!1),[H.P(z,0)]).R()
this.b=D.f_()},
eo:[function(a){var z=J.dQ(a,this.c)
this.c=a
this.b.dD(z)
J.ca($.b,16384)
this.b.bK(z)
C.j.gbE(window).c2(this.gbS())
$.cB=!1
$.bB=!1},"$1","gbS",2,0,7]},
eO:{
"^":"i:3;",
$1:function(a){$.cB=!0}},
eP:{
"^":"i:3;",
$1:function(a){var z=J.j(a)
$.$get$aN().a=J.ar(z.gat(a))
$.$get$aN().b=J.aH(z.gat(a))}},
eQ:{
"^":"i:3;",
$1:function(a){$.bC=!0}},
eR:{
"^":"i:3;",
$1:function(a){$.bC=!1}},
eS:{
"^":"i:8;",
$1:function(a){if(J.dY(a)===13)$.bB=!0}},
eZ:{
"^":"fe;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,bL",
bK:function(a){var z,y,x
this.a.E()
if(this.y2&&!this.fx){this.z.E()
this.Q.E()
this.ch.E()
z=this.cx
if(z!=null)z.E()
z=this.cy
if(z!=null)z.E()
return}if(!this.ry)for(z=this.y,y=0;y<7;++y){x=z[y]
if(x!=null)x.E()}if(this.x1&&!this.x2){this.f.E()
this.r.E()
this.x.E()}},
dD:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.y2)this.dU()
if(!this.ry){if($.bB)this.ry=!0
return}if(!this.x1)this.ci(a)
if(this.x2){z=this.a
y=z.f
x=z.e
if(typeof a!=="number")return H.w(a)
x=y-x*this.bL*2*a
z.f=x
if(x<=0){z.f=0
this.y2=!0}return}if(this.x1){z=$.$get$aN().a
y=$.aj
if(typeof z!=="number")return z.T()
w=C.c.S(Math.floor(z/y))
y=$.$get$aN().b
z=$.aj
if(typeof y!=="number")return y.T()
z=C.c.S(Math.floor(y/z))
y=this.a
v=z+y.f
if($.bC&&this.db>0&&w>=0&&v>=0){z=this.b
if(w<0||w>=z.length)return H.a(z,w)
if(J.G(z[w],v-y.e).bI(this.e)){this.aq(w,v-this.a.e,!0);--this.db}}for(z=this.b,y=z.length,u=0;u<y;++u)for(x=J.aY(z[u]);x.t();){t=x.gw()
t.dl(w,v)
t.X(a)}z=this.dx
if(typeof a!=="number")return H.w(a)
this.dx=z-this.r2*a*Math.sqrt(H.dB(1+this.fr*2))
this.dy=this.dy-this.rx*a*Math.sqrt(H.dB(1+this.fr*2))
if(this.k2>=this.fy){this.k2=0
this.cu()
this.fy=($.$get$q().p(6)+5)*1000}if(this.k3>=this.go){this.k3=0
this.ct()
this.go=($.$get$q().p(6)+8)*1000}this.k2+=a
this.k3+=a
z=this.k4
if(z>=this.id){this.k4=0;++this.db
z=0}this.k4=z+a
this.e9(a)
this.e8(a)
z=this.dx
if(z<=0){this.dx=0
this.x2=!0
z=0}y=this.dy
if(y<=0){this.dy=0
this.x2=!0
y=0}if(z>=10&&y>=10){if(this.r1>=this.k1){this.r1=0
this.cg()}this.r1+=a}for(t=null,s=0;s<this.b.length;++s){r=0
while(!0){z=this.b
if(s>=z.length)return H.a(z,s)
z=J.I(z[s])
if(typeof z!=="number")return H.w(z)
if(!(r<z))break
z=this.b
if(s>=z.length)return H.a(z,s)
t=J.G(z[s],r)
if(t.gdC()){if(!!t.$isbg)C.b.M(this.c,t)
if(!!t.$isb8)C.b.M(this.d,t)
if(!!t.$isbP)C.b.M(this.e,t)
z=this.b
if(s>=z.length)return H.a(z,s)
z=z[s]
y=this.a
x=y.x
y=(r+y.e)*y.a+s
if(y>>>0!==y||y>=x.length)return H.a(x,y)
y=x[y]
x=new D.av(y,null,null,null)
x.b=!1
x.c=y.b
x.d=!1
q=$.$get$q().p(3)
p=$.$get$bu()
if(q>>>0!==q||q>=3)return H.a(p,q)
p=p[q]
y.c=new D.p(p.a,p.b,p.c)
y.e=!1
J.H(z,r,x)}++r}}o=this.aV(this.dx)
this.f.b7("h2o: "+o)
o=this.aV(this.dy)
this.r.b7("n2: "+o)
o=this.aV(this.db)
this.x.b7("root: "+o)}},
dX:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
this.aq(12,0,!1)
this.aq(12,1,!1)
this.aq(12,2,!1)
for(z=0,y=1;y<3;++y)for(x=0;x<this.a.a;++x){if(x>8&&x<16)continue
z=$.$get$q().p(10)
if(z<3){w=this.b
if(x>=w.length)return H.a(w,x)
w=J.G(w[x],y)==null}else w=!1
if(w){w=this.b
if(x>=w.length)return H.a(w,x)
w=w[x]
v=this.a
u=v.x
v=(y+v.e)*v.a+x
if(v>>>0!==v||v>=u.length)return H.a(u,v)
v=u[v]
u=new D.et(v,null,null,null)
u.b=!1
u.c=v.b
u.d=!1
t=$.$get$q().p(2)
s=$.$get$bw()
if(t>>>0!==t||t>=2)return H.a(s,t)
s=s[t]
v.c=new D.p(s.a,s.b,s.c)
v.e=!1
J.H(w,y,u)}}for(y=0;y<2;++y)for(x=0;x<this.a.a;++x){w=this.b
if(x>=w.length)return H.a(w,x)
if(J.G(w[x],y)==null){w=this.b
if(x>=w.length)return H.a(w,x)
w=w[x]
v=this.a
u=v.x
v=(y+v.e)*v.a+x
if(v>>>0!==v||v>=u.length)return H.a(u,v)
v=u[v]
u=new D.cX(v,null,null,null)
u.b=!1
u.c=v.b
u.d=!1
z=$.$get$q().p(2)
s=$.$get$aQ()
if(z>>>0!==z||z>=2)return H.a(s,z)
s=s[z]
v.c=new D.p(s.a,s.b,s.c)
v.e=!1
J.H(w,y,u)}}for(x=0;x<this.a.a;++x){if($.$get$q().p(10)<5){w=this.b
if(x>=w.length)return H.a(w,x)
if(J.G(w[x],2)==null)w=x<10||x>14
else w=!1}else w=!1
if(w){w=this.b
if(x>=w.length)return H.a(w,x)
w=w[x]
v=this.a
u=v.x
v=(2+v.e)*v.a+x
if(v>>>0!==v||v>=u.length)return H.a(u,v)
v=u[v]
u=new D.cX(v,null,null,null)
u.b=!1
u.c=v.b
u.d=!1
z=$.$get$q().p(2)
s=$.$get$aQ()
if(z>>>0!==z||z>=2)return H.a(s,z)
s=s[z]
v.c=new D.p(s.a,s.b,s.c)
v.e=!1
J.H(w,2,u)}}r=$.$get$q().p(9)+8
q=$.$get$q().p(2)+4
for(p=0;p<3;++p){x=r+p
w=this.a
v=w.x
w=(q+w.e)*w.a+x
if(w>>>0!==w||w>=v.length)return H.a(v,w)
w=v[w]
o=new D.bg(!1,null,0.0001,0.00075,w,null,null,null)
o.b=!1
o.c=w.b
o.d=!1
v=$.$get$bR()
w.c=new D.p(v.a,v.b,v.c)
w.e=!1
o.f=$.$get$q().p(15)+5
w=this.b
if(x>>>0!==x||x>=w.length)return H.a(w,x)
J.H(w[x],q,o)
this.c.push(o)}w=this.a.a
r=$.$get$q().p(w-4-4)+4
q=$.$get$q().p(6)+8
n=D.cM(this.a.au(r,q))
w=this.b
if(r>>>0!==r||r>=w.length)return H.a(w,r)
J.H(w[r],q,n)
this.d.push(n)
w=r-1
n=D.cM(this.a.au(w,q))
v=this.b
if(w<0||w>=v.length)return H.a(v,w)
J.H(v[w],q,n)
this.d.push(n)
for(y=0;y<this.a.b;++y)for(x=0;x<this.a.a;++x){w=this.b
if(x>=w.length)return H.a(w,x)
if(J.G(w[x],y)==null){w=this.b
if(x>=w.length)return H.a(w,x)
w=w[x]
v=this.a
u=v.x
v=(y+v.e)*v.a+x
if(v>>>0!==v||v>=u.length)return H.a(u,v)
v=u[v]
u=new D.av(v,null,null,null)
u.b=!1
u.c=v.b
u.d=!1
z=$.$get$q().p(3)
s=$.$get$bu()
if(z>>>0!==z||z>=3)return H.a(s,z)
s=s[z]
v.c=new D.p(s.a,s.b,s.c)
v.e=!1
J.H(w,y,u)}}},
aq:function(a,b,c){var z,y
z=this.b
if(a<0||a>=z.length)return H.a(z,a)
J.H(z[a],b,D.d2(this.a.au(a,b),c))
z=this.e
y=this.b
if(a>=y.length)return H.a(y,a)
z.push(J.G(y[a],b))},
cu:function(){var z,y,x,w,v,u,t
z=$.$get$q().p(6)
P.W("spawn water")
y=this.a.b
x=$.$get$q().p(y-1-4)+4
y=this.a.a
w=$.$get$q().p(y-0)+0
while(!0){y=this.b
if(w>>>0!==w||w>=y.length)return H.a(y,w)
if(!!(J.G(y[w],x) instanceof D.av))break
y=this.a.a
w=$.$get$q().p(y-0)+0
y=this.a.b
x=$.$get$q().p(y-4)+4}for(z=(z+1)/2,v=C.c.S(Math.floor(w-z)),z=w+z;v<C.c.S(Math.floor(z));++v)if(v>0&&v<this.a.a){y=this.b
if(v<0||v>=y.length)return H.a(y,v)
if(J.G(y[v],x) instanceof D.av){y=this.a
u=y.x
y=(x+y.e)*y.a+v
if(y>>>0!==y||y>=u.length)return H.a(u,y)
y=u[y]
t=new D.bg(!1,null,0.0001,0.00075,y,null,null,null)
t.b=!1
t.c=y.b
t.d=!1
u=$.$get$bR()
y.c=new D.p(u.a,u.b,u.c)
y.e=!1
t.f=$.$get$q().p(15)+5
y=this.b
if(v>=y.length)return H.a(y,v)
J.H(y[v],x,t)
this.c.push(t)}}},
ct:function(){var z,y,x,w,v,u,t
z=$.$get$q().p(4)
P.W("spawn nitro")
y=this.a.b
x=$.$get$q().p(y-1-7)+7
y=this.a.a
w=$.$get$q().p(y-0)+0
while(!0){y=this.b
if(w>>>0!==w||w>=y.length)return H.a(y,w)
if(!!(J.G(y[w],x) instanceof D.av))break
y=this.a.a
w=$.$get$q().p(y-0)+0
y=this.a.b
x=$.$get$q().p(y-4)+4}for(z=(z+1)/2,v=C.c.S(Math.floor(w-z)),z=w+z;v<C.c.S(Math.floor(z));++v)if(v>0&&v<this.a.a){y=this.b
if(v<0||v>=y.length)return H.a(y,v)
if(J.G(y[v],x) instanceof D.av){y=this.a
u=y.x
y=(x+y.e)*y.a+v
if(y>>>0!==y||y>=u.length)return H.a(u,y)
y=u[y]
t=new D.b8(!1,0.0005,null,0.00005,y,null,null,null)
t.b=!1
t.c=y.b
t.d=!1
u=$.$get$bK()
y.c=new D.p(u.a,u.b,u.c)
y.e=!1
t.r=$.$get$q().p(6)+6
y=this.b
if(v>=y.length)return H.a(y,v)
J.H(y[v],x,t)
this.d.push(t)}}},
aV:function(a){var z,y,x,w
z=H.d(a)
for(y=z.length,x="",w=0;w<P.c5(y,4);++w){if(w>=y)return H.a(z,w)
x+=z[w]}for(;x.length<4;)x+=" "
return x},
e9:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.a1)(z),++x){w=z[x]
for(v=this.e,u=v.length,t=0;t<v.length;v.length===u||(0,H.a1)(v),++t)if(w.bF(v[t]))this.dx=this.dx+w.aZ(a)}},
e8:function(a){var z,y,x,w,v,u,t
for(z=this.d,y=z.length,x=0;x<z.length;z.length===y||(0,H.a1)(z),++x){w=z[x]
for(v=this.e,u=v.length,t=0;t<v.length;v.length===u||(0,H.a1)(v),++t)if(w.bF(v[t]))this.dy=this.dy+w.aZ(a)}},
cg:[function(){var z,y,x,w
P.W(H.d(this.gcf()))
this.dx-=5
this.dy-=5
z=this.fr
y=$.$get$cF()
if(z<24){x=this.b
w=y[z].a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
w=x[w]
z=y[z]
y=z.b
J.H(w,y,D.d2(this.a.au(z.a,y),!1));++this.fr}else{this.x2=!0
this.y1=!0}},"$0","gcf",0,0,1],
dT:function(){var z,y,x,w,v,u
for(z=null,y=0;x=this.a,y<x.e;++y)for(w=0;w<x.a;++w){z=$.$get$q().p(2)
x=this.a
v=x.x
u=y*x.a+w
if(u>>>0!==u||u>=v.length)return H.a(v,u)
u=v[u]
v=$.$get$aQ()
if(z>>>0!==z||z>=2)return H.a(v,z)
v=v[z]
u.c=new D.p(v.a,v.b,v.c)
u.e=!1}for(w=11;w<13;++w)for(y=x.e-2;y<x.e;++y){z=$.$get$q().p(2)
x=this.a
v=x.x
u=y*x.a+w
if(u>>>0!==u||u>=v.length)return H.a(v,u)
u=v[u]
v=$.$get$bw()
if(z>>>0!==z||z>=2)return H.a(v,z)
v=v[z]
u.c=new D.p(v.a,v.b,v.c)
u.e=!1}},
ci:function(a){var z,y,x,w,v,u
z=this.a
y=z.f
x=z.e
if(typeof a!=="number")return H.w(a)
y+=x*this.bL*a
z.f=y
if(y>=x){z.f=x
this.x1=!0
for(w=11;w<13;++w)for(v=z.e-2;v<z.e;++v){u=$.$get$q().p(2)
z=this.a
y=z.x
x=v*z.a+w
if(x>>>0!==x||x>=y.length)return H.a(y,x)
x=y[x]
y=$.$get$aQ()
if(u>>>0!==u||u>=2)return H.a(y,u)
y=y[u]
x.c=new D.p(y.a,y.b,y.c)
x.e=!1}}},
dU:function(){var z,y,x
if(!this.fx)return
if(this.y1){z=$.u
z=D.B(new D.k(z-220-z/2,300),"here you should see your tree. but 48h were not enough.",8,0)
this.cx=z
z.v()
z=$.u
z=D.B(new D.k(z-40-z/2,290),"i am sorry",8,0)
this.cy=z
z.v()
y="your tree had a fulfilled life"
x="it died happy and in peace"}else{y="your tree lived fast and died young"
x="they say he perished way too soon"}z=$.u
this.z=D.B(new D.k(z-y.length*13/2-z/2,550),y,13,0)
z=$.u
this.ch=D.B(new D.k(z-x.length*13/2-z/2,530),x,13,0)
z=$.u
this.Q=D.B(new D.k(z-196-z/2,490),"thanks for playing. reload the page to play again",8,0)
this.z.v()
this.Q.v()
this.ch.v()
this.fx=!1},
cF:function(){var z,y,x,w,v
z=$.u
y=$.aj
x=$.af
x=new D.f6(z/y,x/y,null,null,26,0,new D.k(-z/2,-x/2),null,null,null,null)
x.x=H.e([],[D.cS])
x.dW()
this.a=x
x.v()
this.c=H.e([],[D.bg])
this.d=H.e([],[D.b8])
this.e=H.e([],[D.bP])
this.f=D.B(new D.k(345,2),"h2o:     ",16,1)
this.r=D.B(new D.k(10,2),"n2:     ",16,2)
this.x=D.B(new D.k(190,2),"root:     ",16,3)
this.f.v()
this.r.v()
this.x.v()
x=new Array(this.a.a)
x.fixed$length=Array
this.b=H.e(x,[[P.l,D.a3]])
for(w=0;z=this.a,w<z.a;++w){y=this.b
z=new Array(z.b)
z.fixed$length=Array
z=H.e(z,[D.a3])
if(w>=y.length)return H.a(y,w)
y[w]=z}this.dX()
this.dT()
z=new Array(7)
z.fixed$length=Array
v=H.e(z,[P.a7])
v[0]="grow little tree. grow"
v[1]="a game for ludum dare 29 by sebastian kreisel"
v[2]="-- connect the roots to water or ammonium --"
v[3]="-- if your tree has was it needs. it grows --"
v[4]="-- if your tree  lacks something. it dies --"
v[5]="give your tree a long and happy life"
v[6]="press enter to start"
z=this.y
z[0]=D.B(new D.k($.u-198-$.u/2,500),v[0],18,0)
y=$.u
x=J.aq(J.I(v[1]),8)
if(typeof x!=="number")return x.T()
z[1]=D.B(new D.k(y-x/2-$.u/2,470),v[1],8,0)
x=$.u
y=J.aq(J.I(v[2]),10)
if(typeof y!=="number")return y.T()
z[2]=D.B(new D.k(x-y/2-$.u/2,420),v[2],10,0)
y=$.u
x=J.aq(J.I(v[3]),10)
if(typeof x!=="number")return x.T()
z[3]=D.B(new D.k(y-x/2-$.u/2,405),v[3],10,0)
x=$.u
y=J.aq(J.I(v[4]),10)
if(typeof y!=="number")return y.T()
z[4]=D.B(new D.k(x-y/2-$.u/2,390),v[4],10,0)
y=$.u
x=J.aq(J.I(v[5]),13)
if(typeof x!=="number")return x.T()
z[5]=D.B(new D.k(y-x/2-$.u/2,350),v[5],13,0)
x=$.u
y=J.aq(J.I(v[6]),20)
if(typeof y!=="number")return y.T()
z[6]=D.B(new D.k(x-y/2-$.u/2,200),v[6],20,0)
z[0].v()
z[1].v()
z[2].v()
z[3].v()
z[4].v()
z[5].v()
z[6].v()},
static:{f_:function(){var z=new D.eZ(null,null,null,null,null,null,null,null,H.e(new Array(7),[D.cu]),null,null,null,null,null,5,20,5,0,!0,5000,1e4,2000,2500,0,0,0,0,0.00045000000000000004,0.0001,!1,!1,!1,!1,!1,5/$.aj*0.001)
z.cF()
return z}}},
cS:{
"^":"c;a,a7:b<,c,d,e,f",
ae:function(a,b,c){var z,y,x,w,v,u,t
z=this.a
y=z.a
z=z.b
x=this.c
w=x.a
v=x.b
x=x.c
u=this.d
if(typeof y!=="number")return y.u()
t=y+u
if(typeof z!=="number")return z.u()
u=z+u
C.b.ap(b,[y,z,1,1,w,v,x,1,t,z,1,1,w,v,x,1,t,u,1,1,w,v,x,1,y,u,1,1,w,v,x,1])
x=2+a
C.b.ap(c,[a,1+a,x,x,3+a,a])
this.e=!0}},
f6:{
"^":"c;a,b,c,d,at:e>,f,r,x,y,z,Q",
dW:function(){var z,y,x,w,v,u
z=$.af
y=$.aj
x=z+y*this.e
w=$.u
for(z=y,v=0;v<x/z;++v)for(u=0;z=$.aj,u<w/z;++u){y=this.x
z=new D.cS(new D.k(u*z,v*z),new D.k(u,v),null,z,null,null)
z.c=new D.p(255,255,255)
z.f=!1
y.push(z)}},
v:function(){var z,y,x,w
z=new D.cW(null,null,null)
this.Q=z
z.bO($.hX,$.hW)
this.y=J.aW($.b)
z=J.aW($.b)
this.z=z
J.t($.b,34963,z)
J.t($.b,34962,this.y)
z=J.b_($.b,this.Q.a,"vert_position")
this.c=z
J.aX($.b,z)
J.a2($.b,this.c,4,5126,!1,32,0)
z=J.b_($.b,this.Q.a,"vert_color")
this.d=z
J.aX($.b,z)
J.a2($.b,this.d,4,5126,!1,32,16)
J.t($.b,34962,null)
J.t($.b,34963,null)
y=H.e([],[P.X])
x=H.e([],[P.r])
for(w=0;z=this.x,w<z.length;++w)z[w].ae(w*4,y,x)
J.t($.b,34962,this.y)
J.aV($.b,34962,new Float32Array(H.aa(y)),35044)
J.t($.b,34962,null)
J.t($.b,34963,this.z)
J.aV($.b,34963,new Int16Array(H.aa(x)),35044)
J.t($.b,34963,null)},
b6:function(){var z,y,x,w,v,u,t,s,r
z=this.x
y=z.length
for(x=y,w=-1,v=0;v<z.length;z.length===y||(0,H.a1)(z),++v){u=z[v]
if(u.e!==!0){x=P.c5(x,C.b.ar(this.x,u))
w=P.dI(w,C.b.ar(this.x,u))}}if(w===-1)return
t=H.e([],[P.X])
s=H.e([],[P.r])
for(r=x;r<=w;++r){z=this.x
if(r<0||r>=z.length)return H.a(z,r)
z[r].ae(r*4,t,s)}J.t($.b,34962,this.y)
J.c9($.b,34962,x*8*4*4,new Float32Array(H.aa(t)))
J.t($.b,34962,null)},
E:function(){var z,y,x,w
this.b6()
J.t($.b,34963,this.z)
J.t($.b,34962,this.y)
J.a2($.b,this.c,4,5126,!1,32,0)
J.a2($.b,this.d,4,5126,!1,32,16)
J.cj($.b,0,0,$.u,$.af)
z=this.Q
J.b0($.b,z.a)
z=this.Q
y=$.$get$c6()
x=$.b
x.uniformMatrix4fv(J.aI(x,z.a,"mvp_matrix"),!1,new Float32Array(H.aa(y)))
y=this.Q
z=this.f
x=$.aj
w=$.b
w.uniform1f(J.aI(w,y.a,"offset"),z*x)
x=this.Q
z=this.r
y=$.b
y.uniform2f(J.aI(y,x.a,"fixed_offs"),z.a,z.b)
J.cd($.b,4,6*this.x.length,5123,0)
this.Q.toString
J.b0($.b,null)
J.t($.b,34963,null)
J.t($.b,34962,null)},
au:function(a,b){var z,y
z=this.x
if(typeof b!=="number")return b.u()
if(typeof a!=="number")return H.w(a)
y=(b+this.e)*this.a+a
if(y>>>0!==y||y>=z.length)return H.a(z,y)
return z[y]}},
fe:{
"^":"c;"},
cW:{
"^":"c;a,b,c",
bO:function(a,b){var z=J.cc($.b,35633)
this.b=z
J.cg($.b,z,a)
J.cb($.b,this.b)
if(J.cf($.b,this.b,35713)!==!0)P.W(C.e.u("Error in compileShader vert: ",J.ce($.b,this.b)))
z=J.cc($.b,35632)
this.c=z
J.cg($.b,z,b)
J.cb($.b,this.c)
if(J.cf($.b,this.c,35713)!==!0)P.W(C.e.u("Error in compileShader frag: ",J.ce($.b,this.c)))
z=J.dU($.b)
this.a=z
J.c8($.b,z,this.b)
J.c8($.b,this.a,this.c)
J.e8($.b,this.a)
if(J.e7($.b,this.a,35714)!==!0)P.W(C.e.u("Error in linkProgram: ",J.e6($.b,this.a)))}},
d0:{
"^":"c;a,b,c,d",
ae:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.a
y=z.a
x=z.b
w=this.b
if(0>=w.length)return H.a(w,0)
w=J.ar(w[0])
v=this.b
if(0>=v.length)return H.a(v,0)
v=J.aH(v[0])
u=this.b
if(0>=u.length)return H.a(u,0)
u=J.aZ(u[0])
t=z.a
s=this.c
if(typeof t!=="number")return t.u()
r=z.b
q=this.b
if(1>=q.length)return H.a(q,1)
q=J.ar(q[1])
p=this.b
if(1>=p.length)return H.a(p,1)
p=J.aH(p[1])
o=this.b
if(1>=o.length)return H.a(o,1)
o=J.aZ(o[1])
n=z.a
if(typeof n!=="number")return n.u()
m=z.b
if(typeof m!=="number")return m.u()
l=this.b
if(2>=l.length)return H.a(l,2)
l=J.ar(l[2])
k=this.b
if(2>=k.length)return H.a(k,2)
k=J.aH(k[2])
j=this.b
if(2>=j.length)return H.a(j,2)
j=J.aZ(j[2])
i=z.a
z=z.b
if(typeof z!=="number")return z.u()
h=this.b
if(3>=h.length)return H.a(h,3)
h=J.ar(h[3])
g=this.b
if(3>=g.length)return H.a(g,3)
g=J.aH(g[3])
f=this.b
if(3>=f.length)return H.a(f,3)
C.b.ap(b,[y,x,1,1,w,v,u,0,t+s,r,1,1,q,p,o,0,n+s,m+s,1,1,l,k,j,0,i,z+s,1,1,h,g,J.aZ(f[3]),0])
f=2+a
C.b.ap(c,[a,1+a,f,f,3+a,a])
this.d=!0}},
fs:{
"^":"c;a,b,c,d",
cH:function(a){var z
this.a=J.dV($.b)
this.d=!1
z=J.e_(a)
H.e(new W.ak(0,z.a,z.b,W.ab(new D.fu(this,a)),!1),[H.P(z,0)]).R()},
static:{ft:function(a){var z=new D.fs(null,null,null,null)
z.cH(a)
return z}}},
fu:{
"^":"i:2;a,b",
$1:function(a){var z,y,x
z=this.a
J.br($.b,3553,z.a)
y=this.b
J.ed($.b,3553,0,6408,6408,5121,y)
J.ch($.b,3553,10241,9728)
J.ch($.b,3553,10240,9728)
J.br($.b,3553,null)
x=J.j(y)
z.b=x.gk(y)
z.c=x.gj(y)
z.d=!0}},
k:{
"^":"c;m:a>,n:b>",
i:function(a){return"["+H.d(this.a)+" "+H.d(this.b)+"]"},
q:function(a,b){var z,y,x
if(b==null)return!1
z=this.a
y=J.j(b)
x=y.gm(b)
if(z==null?x==null:z===x){z=this.b
y=y.gn(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
p:{
"^":"c;m:a>,n:b>,b9:c>",
i:function(a){return"["+H.d(this.a)+" "+this.b+" "+this.c+"]"},
L:function(a,b){this.a=this.a+b.a
this.b=this.b+b.b
this.c=this.c+b.c}}},1],["","",,H,{
"^":"",
iK:{
"^":"c;a"}}],["","",,J,{
"^":"",
n:function(a){return void 0},
bp:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bn:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c3==null){H.hK()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.h(new P.df("Return interceptor for "+H.d(y(a,z))))}w=H.hS(a)
if(w==null){if(typeof a=="function")return C.x
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.y
else return C.z}return w},
f:{
"^":"c;",
q:function(a,b){return a===b},
gA:function(a){return H.a5(a)},
i:["cz",function(a){return H.ba(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eH:{
"^":"f;",
i:function(a){return String(a)},
gA:function(a){return a?519018:218159},
$isbY:1},
eJ:{
"^":"f;",
q:function(a,b){return null==b},
i:function(a){return"null"},
gA:function(a){return 0}},
by:{
"^":"f;",
gA:function(a){return 0},
i:["cA",function(a){return String(a)}],
$iseK:1},
f5:{
"^":"by;"},
bf:{
"^":"by;"},
aM:{
"^":"by;",
i:function(a){var z=a[$.$get$co()]
return z==null?this.cA(a):J.as(z)}},
aK:{
"^":"f;",
bH:function(a,b){if(!!a.immutable$list)throw H.h(new P.U(b))},
aS:function(a,b){if(!!a.fixed$length)throw H.h(new P.U(b))},
M:function(a,b){var z
this.aS(a,"remove")
for(z=0;z<a.length;++z)if(J.Q(a[z],b)){a.splice(z,1)
return!0}return!1},
ap:function(a,b){var z,y
this.aS(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.a1)(b),++y)a.push(b[y])},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.h(new P.J(a))}},
a4:function(a,b){return H.e(new H.bF(a,b),[null,null])},
Y:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
gdL:function(a){if(a.length>0)return a[0]
throw H.h(H.cy())},
bb:function(a,b,c,d,e){var z,y,x
this.bH(a,"set range")
P.cT(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.z(P.aP(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.h(H.eF())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
dS:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.Q(a[z],b))return z
return-1},
ar:function(a,b){return this.dS(a,b,0)},
i:function(a){return P.b3(a,"[","]")},
gB:function(a){return new J.ef(a,a.length,0,null)},
gA:function(a){return H.a5(a)},
gl:function(a){return a.length},
sl:function(a,b){this.aS(a,"set length")
if(b<0)throw H.h(P.aP(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.x(a,b))
if(b>=a.length||b<0)throw H.h(H.x(a,b))
return a[b]},
C:function(a,b,c){this.bH(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.x(a,b))
if(b>=a.length||b<0)throw H.h(H.x(a,b))
a[b]=c},
$isb4:1,
$isl:1,
$asl:null,
$isv:1},
iJ:{
"^":"aK;"},
ef:{
"^":"c;a,b,c,d",
gw:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.h(H.a1(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aL:{
"^":"f;",
aY:function(a,b){return a%b},
S:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.h(new P.U(""+a))},
ai:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.h(new P.U(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
u:function(a,b){if(typeof b!=="number")throw H.h(H.a_(b))
return a+b},
D:function(a,b){if(typeof b!=="number")throw H.h(H.a_(b))
return a-b},
a_:function(a,b){if(typeof b!=="number")throw H.h(H.a_(b))
return a*b},
aa:function(a,b){return(a|0)===a?a/b|0:this.S(a/b)},
bA:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
av:function(a,b){if(typeof b!=="number")throw H.h(H.a_(b))
return a<b},
$isa0:1},
cz:{
"^":"aL;",
$isX:1,
$isa0:1,
$isr:1},
eI:{
"^":"aL;",
$isX:1,
$isa0:1},
b5:{
"^":"f;",
dq:function(a,b){if(b>=a.length)throw H.h(H.x(a,b))
return a.charCodeAt(b)},
u:function(a,b){if(typeof b!=="string")throw H.h(P.ee(b,null,null))
return a+b},
cw:function(a,b,c){H.dA(b)
if(c==null)c=a.length
H.dA(c)
if(b<0)throw H.h(P.bb(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.h(P.bb(b,null,null))
if(c>a.length)throw H.h(P.bb(c,null,null))
return a.substring(b,c)},
cv:function(a,b){return this.cw(a,b,null)},
a_:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.h(C.l)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
gH:function(a){return a.length===0},
i:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.x(a,b))
if(b>=a.length||b<0)throw H.h(H.x(a,b))
return a[b]},
$isb4:1,
$isa7:1}}],["","",,H,{
"^":"",
aS:function(a,b){var z=a.ad(b)
if(!init.globalState.d.cy)init.globalState.f.aj()
return z},
dM:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isl)throw H.h(P.ck("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.hb(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cw()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.fS(P.bE(null,H.aR),0)
y.z=H.e(new H.ai(0,null,null,null,null,null,0),[P.r,H.bU])
y.ch=H.e(new H.ai(0,null,null,null,null,null,0),[P.r,null])
if(y.x===!0){x=new H.ha()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.ey,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hc)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.e(new H.ai(0,null,null,null,null,null,0),[P.r,H.bc])
w=P.ax(null,null,null,P.r)
v=new H.bc(0,null,!1)
u=new H.bU(y,x,w,init.createNewIsolate(),v,new H.ae(H.bq()),new H.ae(H.bq()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
w.L(0,0)
u.bf(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aU()
x=H.ao(y,[y]).V(a)
if(x)u.ad(new H.hY(z,a))
else{y=H.ao(y,[y,y]).V(a)
if(y)u.ad(new H.hZ(z,a))
else u.ad(a)}init.globalState.f.aj()},
eC:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eD()
return},
eD:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.h(new P.U("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.h(new P.U("Cannot extract URI from \""+H.d(z)+"\""))},
ey:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bh(!0,[]).W(b.data)
y=J.O(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bh(!0,[]).W(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bh(!0,[]).W(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.e(new H.ai(0,null,null,null,null,null,0),[P.r,H.bc])
p=P.ax(null,null,null,P.r)
o=new H.bc(0,null,!1)
n=new H.bU(y,q,p,init.createNewIsolate(),o,new H.ae(H.bq()),new H.ae(H.bq()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
p.L(0,0)
n.bf(0,o)
init.globalState.f.a.P(new H.aR(n,new H.ez(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aj()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").U(y.h(z,"msg"))
init.globalState.f.aj()
break
case"close":init.globalState.ch.M(0,$.$get$cx().h(0,a))
a.terminate()
init.globalState.f.aj()
break
case"log":H.ex(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aw(["command","print","msg",z])
q=new H.al(!0,P.aB(null,P.r)).F(q)
y.toString
self.postMessage(q)}else P.W(y.h(z,"msg"))
break
case"error":throw H.h(y.h(z,"msg"))}},
ex:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aw(["command","log","msg",a])
x=new H.al(!0,P.aB(null,P.r)).F(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.F(w)
z=H.D(w)
throw H.h(P.b2(z))}},
eA:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cP=$.cP+("_"+y)
$.cQ=$.cQ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.U(["spawned",new H.bj(y,x),w,z.r])
x=new H.eB(a,b,c,d,z)
if(e===!0){z.bD(w,w)
init.globalState.f.a.P(new H.aR(z,x,"start isolate"))}else x.$0()},
ht:function(a){return new H.bh(!0,[]).W(new H.al(!1,P.aB(null,P.r)).F(a))},
hY:{
"^":"i:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
hZ:{
"^":"i:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hb:{
"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hc:function(a){var z=P.aw(["command","print","msg",a])
return new H.al(!0,P.aB(null,P.r)).F(z)}}},
bU:{
"^":"c;a,b,c,e0:d<,dt:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bD:function(a,b){if(!this.f.q(0,a))return
if(this.Q.L(0,b)&&!this.y)this.y=!0
this.aO()},
e6:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.M(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.bl();++y.d}this.y=!1}this.aO()},
dd:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
e5:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.z(new P.U("removeRange"))
P.cT(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cq:function(a,b){if(!this.r.q(0,a))return
this.db=b},
dO:function(a,b,c){var z=J.n(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){a.U(c)
return}z=this.cx
if(z==null){z=P.bE(null,null)
this.cx=z}z.P(new H.h5(a,c))},
dM:function(a,b){var z
if(!this.r.q(0,a))return
z=J.n(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){this.aU()
return}z=this.cx
if(z==null){z=P.bE(null,null)
this.cx=z}z.P(this.ge2())},
dP:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.W(a)
if(b!=null)P.W(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.as(a)
y[1]=b==null?null:J.as(b)
for(x=new P.cC(z,z.r,null,null),x.c=z.e;x.t();)x.d.U(y)},
ad:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.F(u)
w=t
v=H.D(u)
this.dP(w,v)
if(this.db===!0){this.aU()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ge0()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.bY().$0()}return y},
bR:function(a){return this.b.h(0,a)},
bf:function(a,b){var z=this.b
if(z.bJ(a))throw H.h(P.b2("Registry: ports must be registered only once."))
z.C(0,a,b)},
aO:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.C(0,this.a,this)
else this.aU()},
aU:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a2(0)
for(z=this.b,y=z.gc4(z),y=y.gB(y);y.t();)y.gw().cP()
z.a2(0)
this.c.a2(0)
init.globalState.z.M(0,this.a)
this.dx.a2(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
w.U(z[v])}this.ch=null}},"$0","ge2",0,0,1]},
h5:{
"^":"i:1;a,b",
$0:function(){this.a.U(this.b)}},
fS:{
"^":"c;a,b",
dE:function(){var z=this.a
if(z.b===z.c)return
return z.bY()},
c1:function(){var z,y,x
z=this.dE()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bJ(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.z(P.b2("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aw(["command","close"])
x=new H.al(!0,H.e(new P.dp(0,null,null,null,null,null,0),[null,P.r])).F(x)
y.toString
self.postMessage(x)}return!1}z.e4()
return!0},
bw:function(){if(self.window!=null)new H.fT(this).$0()
else for(;this.c1(););},
aj:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bw()
else try{this.bw()}catch(x){w=H.F(x)
z=w
y=H.D(x)
w=init.globalState.Q
v=P.aw(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.al(!0,P.aB(null,P.r)).F(v)
w.toString
self.postMessage(v)}}},
fT:{
"^":"i:1;a",
$0:function(){if(!this.a.c1())return
P.fz(C.f,this)}},
aR:{
"^":"c;a,b,c",
e4:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ad(this.b)}},
ha:{
"^":"c;"},
ez:{
"^":"i:0;a,b,c,d,e,f",
$0:function(){H.eA(this.a,this.b,this.c,this.d,this.e,this.f)}},
eB:{
"^":"i:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aU()
w=H.ao(x,[x,x]).V(y)
if(w)y.$2(this.b,this.c)
else{x=H.ao(x,[x]).V(y)
if(x)y.$1(this.b)
else y.$0()}}z.aO()}},
dh:{
"^":"c;"},
bj:{
"^":"dh;b,a",
U:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbo())return
x=H.ht(a)
if(z.gdt()===y){y=J.O(x)
switch(y.h(x,0)){case"pause":z.bD(y.h(x,1),y.h(x,2))
break
case"resume":z.e6(y.h(x,1))
break
case"add-ondone":z.dd(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.e5(y.h(x,1))
break
case"set-errors-fatal":z.cq(y.h(x,1),y.h(x,2))
break
case"ping":z.dO(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.dM(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.L(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.M(0,y)
break}return}y=init.globalState.f
w="receive "+H.d(a)
y.a.P(new H.aR(z,new H.he(this,x),w))},
q:function(a,b){if(b==null)return!1
return b instanceof H.bj&&J.Q(this.b,b.b)},
gA:function(a){return this.b.gaJ()}},
he:{
"^":"i:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbo())z.cM(this.b)}},
bV:{
"^":"dh;b,c,a",
U:function(a){var z,y,x
z=P.aw(["command","message","port",this,"msg",a])
y=new H.al(!0,P.aB(null,P.r)).F(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){if(b==null)return!1
return b instanceof H.bV&&J.Q(this.b,b.b)&&J.Q(this.a,b.a)&&J.Q(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cs()
y=this.a
if(typeof y!=="number")return y.cs()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
bc:{
"^":"c;aJ:a<,b,bo:c<",
cP:function(){this.c=!0
this.b=null},
cM:function(a){if(this.c)return
this.d_(a)},
d_:function(a){return this.b.$1(a)},
$isf8:1},
fv:{
"^":"c;a,b,c",
cI:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.P(new H.aR(y,new H.fx(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ap(new H.fy(this,b),0),a)}else throw H.h(new P.U("Timer greater than 0."))},
static:{fw:function(a,b){var z=new H.fv(!0,!1,null)
z.cI(a,b)
return z}}},
fx:{
"^":"i:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fy:{
"^":"i:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ae:{
"^":"c;aJ:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.ei()
z=C.c.bA(z,0)^C.c.aa(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ae){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
al:{
"^":"c;a,b",
F:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.C(0,a,z.gl(z))
z=J.n(a)
if(!!z.$iscH)return["buffer",a]
if(!!z.$isbJ)return["typed",a]
if(!!z.$isb4)return this.cm(a)
if(!!z.$isew){x=this.gcj()
w=a.gbP()
w=H.b7(w,x,H.L(w,"K",0),null)
w=P.b6(w,!0,H.L(w,"K",0))
z=z.gc4(a)
z=H.b7(z,x,H.L(z,"K",0),null)
return["map",w,P.b6(z,!0,H.L(z,"K",0))]}if(!!z.$iseK)return this.cn(a)
if(!!z.$isf)this.c3(a)
if(!!z.$isf8)this.ak(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbj)return this.co(a)
if(!!z.$isbV)return this.cp(a)
if(!!z.$isi){v=a.$static_name
if(v==null)this.ak(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isae)return["capability",a.a]
if(!(a instanceof P.c))this.c3(a)
return["dart",init.classIdExtractor(a),this.cl(init.classFieldsExtractor(a))]},"$1","gcj",2,0,2],
ak:function(a,b){throw H.h(new P.U(H.d(b==null?"Can't transmit:":b)+" "+H.d(a)))},
c3:function(a){return this.ak(a,null)},
cm:function(a){var z=this.ck(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ak(a,"Can't serialize indexable: ")},
ck:function(a){var z,y,x
z=[]
C.b.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.F(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cl:function(a){var z
for(z=0;z<a.length;++z)C.b.C(a,z,this.F(a[z]))
return a},
cn:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ak(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.F(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
cp:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
co:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaJ()]
return["raw sendport",a]}},
bh:{
"^":"c;a,b",
W:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.h(P.ck("Bad serialized message: "+H.d(a)))
switch(C.b.gdL(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.e(this.ab(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.e(this.ab(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.ab(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.e(this.ab(x),[null])
y.fixed$length=Array
return y
case"map":return this.dH(a)
case"sendport":return this.dI(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dG(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.ae(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ab(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.h("couldn't deserialize: "+H.d(a))}},"$1","gdF",2,0,2],
ab:function(a){var z,y,x
z=J.O(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.C(a,y,this.W(z.h(a,y)));++y}return a},
dH:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.eW()
this.b.push(w)
y=J.e9(y,this.gdF()).b3(0)
for(z=J.O(y),v=J.O(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.a(y,u)
w.C(0,y[u],this.W(v.h(x,u)))}return w},
dI:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.Q(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bR(w)
if(u==null)return
t=new H.bj(u,x)}else t=new H.bV(y,w,x)
this.b.push(t)
return t},
dG:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.O(y)
v=J.O(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.h(y,u)]=this.W(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
hF:function(a){return init.types[a]},
dG:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.n(a).$isbx},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.as(a)
if(typeof z!=="string")throw H.h(H.a_(a))
return z},
a5:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cR:function(a){var z,y,x,w,v,u,t
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.p||!!J.n(a).$isbf){v=C.h(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.e.dq(w,0)===36)w=C.e.cv(w,1)
return(w+H.dH(H.c1(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
ba:function(a){return"Instance of '"+H.cR(a)+"'"},
b9:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.h(H.a_(a))
return a[b]},
bL:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.h(H.a_(a))
a[b]=c},
w:function(a){throw H.h(H.a_(a))},
a:function(a,b){if(a==null)J.I(a)
throw H.h(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ac(!0,b,"index",null)
z=J.I(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.cv(b,a,"index",null,z)
return P.bb(b,"index",null)},
a_:function(a){return new P.ac(!0,a,null,null)},
dB:function(a){return a},
dA:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.h(H.a_(a))
return a},
h:function(a){var z
if(a==null)a=new P.cO()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dO})
z.name=""}else z.toString=H.dO
return z},
dO:function(){return J.as(this.dartException)},
z:function(a){throw H.h(a)},
a1:function(a){throw H.h(new P.J(a))},
F:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.i2(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bA(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bz(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.cN(v,null))}}if(a instanceof TypeError){u=$.$get$d3()
t=$.$get$d4()
s=$.$get$d5()
r=$.$get$d6()
q=$.$get$da()
p=$.$get$db()
o=$.$get$d8()
$.$get$d7()
n=$.$get$dd()
m=$.$get$dc()
l=u.J(y)
if(l!=null)return z.$1(H.bz(y,l))
else{l=t.J(y)
if(l!=null){l.method="call"
return z.$1(H.bz(y,l))}else{l=s.J(y)
if(l==null){l=r.J(y)
if(l==null){l=q.J(y)
if(l==null){l=p.J(y)
if(l==null){l=o.J(y)
if(l==null){l=r.J(y)
if(l==null){l=n.J(y)
if(l==null){l=m.J(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cN(y,l==null?null:l.method))}}return z.$1(new H.fB(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cY()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ac(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cY()
return a},
D:function(a){var z
if(a==null)return new H.dq(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dq(a,null)},
hU:function(a){if(a==null||typeof a!='object')return J.C(a)
else return H.a5(a)},
hE:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.C(0,a[y],a[x])}return b},
hM:function(a,b,c,d,e,f,g){var z=J.n(c)
if(z.q(c,0))return H.aS(b,new H.hN(a))
else if(z.q(c,1))return H.aS(b,new H.hO(a,d))
else if(z.q(c,2))return H.aS(b,new H.hP(a,d,e))
else if(z.q(c,3))return H.aS(b,new H.hQ(a,d,e,f))
else if(z.q(c,4))return H.aS(b,new H.hR(a,d,e,f,g))
else throw H.h(P.b2("Unsupported number of arguments for wrapped closure"))},
ap:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hM)
a.$identity=z
return z},
ek:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isl){z.$reflectionInfo=c
x=H.fb(z).r}else x=c
w=d?Object.create(new H.fh().constructor.prototype):Object.create(new H.bs(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.R
$.R=J.aG(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cn(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.hF(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cm:H.bt
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.h("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cn(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
eh:function(a,b,c,d){var z=H.bt
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cn:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ej(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eh(y,!w,z,b)
if(y===0){w=$.at
if(w==null){w=H.b1("self")
$.at=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.R
$.R=J.aG(v,1)
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.at
if(v==null){v=H.b1("self")
$.at=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.R
$.R=J.aG(w,1)
return new Function(v+H.d(w)+"}")()},
ei:function(a,b,c,d){var z,y
z=H.bt
y=H.cm
switch(b?-1:a){case 0:throw H.h(new H.fc("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ej:function(a,b){var z,y,x,w,v,u,t,s
z=H.eg()
y=$.cl
if(y==null){y=H.b1("receiver")
$.cl=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ei(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.R
$.R=J.aG(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.R
$.R=J.aG(u,1)
return new Function(y+H.d(u)+"}")()},
bZ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.ek(a,b,z,!!d,e,f)},
i1:function(a){throw H.h(new P.el("Cyclic initialization for static "+H.d(a)))},
ao:function(a,b,c){return new H.fd(a,b,c,null)},
aU:function(){return C.k},
bq:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
e:function(a,b){a.$builtinTypeInfo=b
return a},
c1:function(a){if(a==null)return
return a.$builtinTypeInfo},
dE:function(a,b){return H.dN(a["$as"+H.d(b)],H.c1(a))},
L:function(a,b,c){var z=H.dE(a,b)
return z==null?null:z[c]},
P:function(a,b){var z=H.c1(a)
return z==null?null:z[b]},
c7:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dH(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dH:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bN("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.d(H.c7(u,c))}return w?"":"<"+H.d(z)+">"},
dN:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
hA:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.E(a[y],b[y]))return!1
return!0},
c_:function(a,b,c){return a.apply(b,H.dE(b,c))},
E:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dF(a,b)
if('func' in a)return b.builtin$cls==="iE"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c7(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.d(H.c7(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hA(H.dN(v,z),x)},
dy:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.E(z,v)||H.E(v,z)))return!1}return!0},
hz:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.E(v,u)||H.E(u,v)))return!1}return!0},
dF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.E(z,y)||H.E(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dy(x,w,!1))return!1
if(!H.dy(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.E(o,n)||H.E(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.E(o,n)||H.E(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.E(o,n)||H.E(n,o)))return!1}}return H.hz(a.named,b.named)},
jx:function(a){var z=$.c2
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jv:function(a){return H.a5(a)},
ju:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hS:function(a){var z,y,x,w,v,u
z=$.c2.$1(a)
y=$.bl[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bo[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dx.$2(a,z)
if(z!=null){y=$.bl[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bo[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c4(x)
$.bl[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bo[z]=x
return x}if(v==="-"){u=H.c4(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dJ(a,x)
if(v==="*")throw H.h(new P.df(z))
if(init.leafTags[z]===true){u=H.c4(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dJ(a,x)},
dJ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bp(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c4:function(a){return J.bp(a,!1,null,!!a.$isbx)},
hT:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bp(z,!1,null,!!z.$isbx)
else return J.bp(z,c,null,null)},
hK:function(){if(!0===$.c3)return
$.c3=!0
H.hL()},
hL:function(){var z,y,x,w,v,u,t,s
$.bl=Object.create(null)
$.bo=Object.create(null)
H.hG()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dK.$1(v)
if(u!=null){t=H.hT(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hG:function(){var z,y,x,w,v,u,t
z=C.u()
z=H.an(C.q,H.an(C.w,H.an(C.i,H.an(C.i,H.an(C.v,H.an(C.r,H.an(C.t(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c2=new H.hH(v)
$.dx=new H.hI(u)
$.dK=new H.hJ(t)},
an:function(a,b){return a(b)||b},
fa:{
"^":"c;a,b,c,d,e,f,r,x",
static:{fb:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fa(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fA:{
"^":"c;a,b,c,d,e,f",
J:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
static:{T:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fA(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},be:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d9:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cN:{
"^":"A;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
eM:{
"^":"A;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.d(z)+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.d(z)+"' on '"+H.d(y)+"' ("+H.d(this.a)+")"},
static:{bz:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eM(a,y,z?null:b.receiver)}}},
fB:{
"^":"A;a",
i:function(a){var z=this.a
return C.e.gH(z)?"Error":"Error: "+z}},
i2:{
"^":"i:2;a",
$1:function(a){if(!!J.n(a).$isA)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dq:{
"^":"c;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
hN:{
"^":"i:0;a",
$0:function(){return this.a.$0()}},
hO:{
"^":"i:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hP:{
"^":"i:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
hQ:{
"^":"i:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hR:{
"^":"i:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
i:{
"^":"c;",
i:function(a){return"Closure '"+H.cR(this)+"'"},
gc5:function(){return this},
gc5:function(){return this}},
d_:{
"^":"i;"},
fh:{
"^":"d_;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bs:{
"^":"d_;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bs))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.a5(this.a)
else y=typeof z!=="object"?J.C(z):H.a5(z)
z=H.a5(this.b)
if(typeof y!=="number")return y.ej()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.ba(z)},
static:{bt:function(a){return a.a},cm:function(a){return a.c},eg:function(){var z=$.at
if(z==null){z=H.b1("self")
$.at=z}return z},b1:function(a){var z,y,x,w,v
z=new H.bs("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fc:{
"^":"A;a",
i:function(a){return"RuntimeError: "+this.a}},
cV:{
"^":"c;"},
fd:{
"^":"cV;a,b,c,d",
V:function(a){var z=this.cW(a)
return z==null?!1:H.dF(z,this.a5())},
cW:function(a){var z=J.n(a)
return"$signature" in z?z.$signature():null},
a5:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.n(y)
if(!!x.$isjf)z.v=true
else if(!x.$iscp)z.ret=y.a5()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cU(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cU(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dC(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a5()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dC(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.d(z[s].a5())+" "+s}x+="}"}}return x+(") -> "+H.d(this.a))},
static:{cU:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a5())
return z}}},
cp:{
"^":"cV;",
i:function(a){return"dynamic"},
a5:function(){return}},
ai:{
"^":"c;a,b,c,d,e,f,r",
gl:function(a){return this.a},
gH:function(a){return this.a===0},
gbP:function(){return H.e(new H.eU(this),[H.P(this,0)])},
gc4:function(a){return H.b7(this.gbP(),new H.eL(this),H.P(this,0),H.P(this,1))},
bJ:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.cT(z,a)}else return this.dY(a)},
dY:function(a){var z=this.d
if(z==null)return!1
return this.ag(this.K(z,this.af(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.K(z,b)
return y==null?null:y.gZ()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.K(x,b)
return y==null?null:y.gZ()}else return this.dZ(b)},
dZ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.K(z,this.af(a))
x=this.ag(y,a)
if(x<0)return
return y[x].gZ()},
C:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.aK()
this.b=z}this.bd(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aK()
this.c=y}this.bd(y,b,c)}else{x=this.d
if(x==null){x=this.aK()
this.d=x}w=this.af(b)
v=this.K(x,w)
if(v==null)this.aM(x,w,[this.ax(b,c)])
else{u=this.ag(v,b)
if(u>=0)v[u].sZ(c)
else v.push(this.ax(b,c))}}},
M:function(a,b){if(typeof b==="string")return this.bv(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bv(this.c,b)
else return this.e_(b)},
e_:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.K(z,this.af(a))
x=this.ag(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bB(w)
return w.gZ()},
a2:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.h(new P.J(this))
z=z.c}},
bd:function(a,b,c){var z=this.K(a,b)
if(z==null)this.aM(a,b,this.ax(b,c))
else z.sZ(c)},
bv:function(a,b){var z
if(a==null)return
z=this.K(a,b)
if(z==null)return
this.bB(z)
this.bi(a,b)
return z.gZ()},
ax:function(a,b){var z,y
z=new H.eT(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bB:function(a){var z,y
z=a.gd4()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
af:function(a){return J.C(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Q(a[y].gbN(),b))return y
return-1},
i:function(a){return P.f1(this)},
K:function(a,b){return a[b]},
aM:function(a,b,c){a[b]=c},
bi:function(a,b){delete a[b]},
cT:function(a,b){return this.K(a,b)!=null},
aK:function(){var z=Object.create(null)
this.aM(z,"<non-identifier-key>",z)
this.bi(z,"<non-identifier-key>")
return z},
$isew:1},
eL:{
"^":"i:2;a",
$1:function(a){return this.a.h(0,a)}},
eT:{
"^":"c;bN:a<,Z:b@,c,d4:d<"},
eU:{
"^":"K;a",
gl:function(a){return this.a.a},
gB:function(a){var z,y
z=this.a
y=new H.eV(z,z.r,null,null)
y.c=z.e
return y},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.h(new P.J(z))
y=y.c}},
$isv:1},
eV:{
"^":"c;a,b,c,d",
gw:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.h(new P.J(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hH:{
"^":"i:2;a",
$1:function(a){return this.a(a)}},
hI:{
"^":"i:9;a",
$2:function(a,b){return this.a(a,b)}},
hJ:{
"^":"i:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
cy:function(){return new P.bd("No element")},
eF:function(){return new P.bd("Too few elements")},
bD:{
"^":"K;",
gB:function(a){return new H.cD(this,this.gl(this),0,null)},
G:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.Y(0,y))
if(z!==this.gl(this))throw H.h(new P.J(this))}},
a4:function(a,b){return H.e(new H.bF(this,b),[null,null])},
b4:function(a,b){var z,y,x
z=H.e([],[H.L(this,"bD",0)])
C.b.sl(z,this.gl(this))
for(y=0;y<this.gl(this);++y){x=this.Y(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
b3:function(a){return this.b4(a,!0)},
$isv:1},
cD:{
"^":"c;a,b,c,d",
gw:function(){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.O(z)
x=y.gl(z)
if(this.b!==x)throw H.h(new P.J(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.Y(z,w);++this.c
return!0}},
cG:{
"^":"K;a,b",
gB:function(a){var z=new H.f0(null,J.aY(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gl:function(a){return J.I(this.a)},
$asK:function(a,b){return[b]},
static:{b7:function(a,b,c,d){if(!!J.n(a).$isv)return H.e(new H.cq(a,b),[c,d])
return H.e(new H.cG(a,b),[c,d])}}},
cq:{
"^":"cG;a,b",
$isv:1},
f0:{
"^":"eG;a,b,c",
t:function(){var z=this.b
if(z.t()){this.a=this.aI(z.gw())
return!0}this.a=null
return!1},
gw:function(){return this.a},
aI:function(a){return this.c.$1(a)}},
bF:{
"^":"bD;a,b",
gl:function(a){return J.I(this.a)},
Y:function(a,b){return this.aI(J.dW(this.a,b))},
aI:function(a){return this.b.$1(a)},
$asbD:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$isv:1},
ct:{
"^":"c;"}}],["","",,H,{
"^":"",
dC:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fE:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hB()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ap(new P.fG(z),1)).observe(y,{childList:true})
return new P.fF(z,y,x)}else if(self.setImmediate!=null)return P.hC()
return P.hD()},
jg:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ap(new P.fH(a),0))},"$1","hB",2,0,4],
jh:[function(a){++init.globalState.f.b
self.setImmediate(H.ap(new P.fI(a),0))},"$1","hC",2,0,4],
ji:[function(a){P.bO(C.f,a)},"$1","hD",2,0,4],
ds:function(a,b){var z=H.aU()
z=H.ao(z,[z,z]).V(a)
if(z){b.toString
return a}else{b.toString
return a}},
hv:function(){var z,y
for(;z=$.am,z!=null;){$.aD=null
y=z.c
$.am=y
if(y==null)$.aC=null
$.m=z.b
z.dk()}},
jt:[function(){$.bW=!0
try{P.hv()}finally{$.m=C.a
$.aD=null
$.bW=!1
if($.am!=null)$.$get$bS().$1(P.dz())}},"$0","dz",0,0,1],
dw:function(a){if($.am==null){$.aC=a
$.am=a
if(!$.bW)$.$get$bS().$1(P.dz())}else{$.aC.c=a
$.aC=a}},
dL:function(a){var z,y
z=$.m
if(C.a===z){P.bk(null,null,C.a,a)
return}z.toString
if(C.a.gaT()===z){P.bk(null,null,z,a)
return}y=$.m
P.bk(null,null,y,y.aP(a,!0))},
hy:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.F(u)
z=t
y=H.D(u)
$.m.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.Y(x)
w=t
v=x.gO()
c.$2(w,v)}}},
hp:function(a,b,c,d){var z=a.aR()
if(!!J.n(z).$isag)z.b8(new P.hs(b,c,d))
else b.a8(c,d)},
hq:function(a,b){return new P.hr(a,b)},
fz:function(a,b){var z=$.m
if(z===C.a){z.toString
return P.bO(a,b)}return P.bO(a,z.aP(b,!0))},
bO:function(a,b){var z=C.d.aa(a.a,1000)
return H.fw(z<0?0:z,b)},
aT:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.dg(new P.hx(z,e),C.a,null)
z=$.am
if(z==null){P.dw(y)
$.aD=$.aC}else{x=$.aD
if(x==null){y.c=z
$.aD=y
$.am=y}else{y.c=x.c
x.c=y
$.aD=y
if(y.c==null)$.aC=y}}},
hw:function(a,b){throw H.h(new P.ad(a,b))},
dt:function(a,b,c,d){var z,y
y=$.m
if(y===c)return d.$0()
$.m=c
z=y
try{y=d.$0()
return y}finally{$.m=z}},
dv:function(a,b,c,d,e){var z,y
y=$.m
if(y===c)return d.$1(e)
$.m=c
z=y
try{y=d.$1(e)
return y}finally{$.m=z}},
du:function(a,b,c,d,e,f){var z,y
y=$.m
if(y===c)return d.$2(e,f)
$.m=c
z=y
try{y=d.$2(e,f)
return y}finally{$.m=z}},
bk:function(a,b,c,d){var z=C.a!==c
if(z){d=c.aP(d,!(!z||C.a.gaT()===c))
c=C.a}P.dw(new P.dg(d,c,null))},
fG:{
"^":"i:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
fF:{
"^":"i:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fH:{
"^":"i:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
fI:{
"^":"i:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ag:{
"^":"c;"},
fM:{
"^":"c;"},
hn:{
"^":"fM;a"},
az:{
"^":"c;bp:a<,e7:b>,c,d,e",
ga1:function(){return this.b.b},
gbM:function(){return(this.c&1)!==0},
gdR:function(){return this.c===6},
gdQ:function(){return this.c===8},
gd3:function(){return this.d},
gdc:function(){return this.d}},
V:{
"^":"c;aN:a?,a1:b<,c",
gd0:function(){return this.a===8},
sd1:function(a){this.a=2},
b2:function(a,b){var z,y
z=$.m
if(z!==C.a){z.toString
if(b!=null)b=P.ds(b,z)}y=H.e(new P.V(0,z,null),[null])
this.az(new P.az(null,y,b==null?1:3,a,b))
return y},
c2:function(a){return this.b2(a,null)},
b8:function(a){var z,y
z=$.m
y=new P.V(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.a)z.toString
this.az(new P.az(null,y,8,a,null))
return y},
gda:function(){return this.c},
ga9:function(){return this.c},
d8:function(a,b){this.a=8
this.c=new P.ad(a,b)},
az:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.bk(null,null,z,new P.fW(this,a))}else{a.a=this.c
this.c=a}},
ao:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbp()
z.a=y}return y},
al:function(a){var z,y
z=J.n(a)
if(!!z.$isag)if(!!z.$isV)P.dk(a,this)
else P.dl(a,this)
else{y=this.ao()
this.a=4
this.c=a
P.a8(this,y)}},
cR:function(a){var z=this.ao()
this.a=4
this.c=a
P.a8(this,z)},
a8:[function(a,b){var z=this.ao()
this.a=8
this.c=new P.ad(a,b)
P.a8(this,z)},function(a){return this.a8(a,null)},"ek","$2","$1","gaE",2,2,12,0],
$isag:1,
static:{dl:function(a,b){var z,y,x,w
b.saN(2)
try{a.b2(new P.fX(b),new P.fY(b))}catch(x){w=H.F(x)
z=w
y=H.D(x)
P.dL(new P.fZ(b,z,y))}},dk:function(a,b){var z
b.a=2
z=new P.az(null,b,0,null,null)
if(a.a>=4)P.a8(a,z)
else a.az(z)},a8:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gd0()
if(b==null){if(w){v=z.a.ga9()
y=z.a.ga1()
x=J.Y(v)
u=v.gO()
y.toString
P.aT(null,null,y,x,u)}return}for(;b.gbp()!=null;b=t){t=b.a
b.a=null
P.a8(z.a,b)}x.a=!0
s=w?null:z.a.gda()
x.b=s
x.c=!1
y=!w
if(!y||b.gbM()||b.c===8){r=b.ga1()
if(w){u=z.a.ga1()
u.toString
if(u==null?r!=null:u!==r){u=u.gaT()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.ga9()
y=z.a.ga1()
x=J.Y(v)
u=v.gO()
y.toString
P.aT(null,null,y,x,u)
return}q=$.m
if(q==null?r!=null:q!==r)$.m=r
else q=null
if(y){if(b.gbM())x.a=new P.h0(x,b,s,r).$0()}else new P.h_(z,x,b,r).$0()
if(b.gdQ())new P.h1(z,x,w,b,r).$0()
if(q!=null)$.m=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.n(y).$isag}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.V)if(p.a>=4){o.a=2
z.a=p
b=new P.az(null,o,0,null,null)
y=p
continue}else P.dk(p,o)
else P.dl(p,o)
return}}o=b.b
b=o.ao()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
fW:{
"^":"i:0;a,b",
$0:function(){P.a8(this.a,this.b)}},
fX:{
"^":"i:2;a",
$1:function(a){this.a.cR(a)}},
fY:{
"^":"i:5;a",
$2:function(a,b){this.a.a8(a,b)},
$1:function(a){return this.$2(a,null)}},
fZ:{
"^":"i:0;a,b,c",
$0:function(){this.a.a8(this.b,this.c)}},
h0:{
"^":"i:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.b0(this.b.gd3(),this.c)
return!0}catch(x){w=H.F(x)
z=w
y=H.D(x)
this.a.b=new P.ad(z,y)
return!1}}},
h_:{
"^":"i:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.ga9()
y=!0
r=this.c
if(r.gdR()){x=r.d
try{y=this.d.b0(x,J.Y(z))}catch(q){r=H.F(q)
w=r
v=H.D(q)
r=J.Y(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ad(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aU()
p=H.ao(p,[p,p]).V(r)
n=this.d
m=this.b
if(p)m.b=n.ea(u,J.Y(z),z.gO())
else m.b=n.b0(u,J.Y(z))}catch(q){r=H.F(q)
t=r
s=H.D(q)
r=J.Y(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ad(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
h1:{
"^":"i:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.c_(this.d.gdc())
z.a=w
v=w}catch(u){z=H.F(u)
y=z
x=H.D(u)
if(this.c){z=J.Y(this.a.a.ga9())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.ga9()
else v.b=new P.ad(y,x)
v.a=!1
return}if(!!J.n(v).$isag){t=this.d
s=t.ge7(t)
s.sd1(!0)
this.b.c=!0
v.b2(new P.h2(this.a,s),new P.h3(z,s))}}},
h2:{
"^":"i:2;a,b",
$1:function(a){P.a8(this.a.a,new P.az(null,this.b,0,null,null))}},
h3:{
"^":"i:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.V)){y=H.e(new P.V(0,$.m,null),[null])
z.a=y
y.d8(a,b)}P.a8(z.a,new P.az(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dg:{
"^":"c;a,b,c",
dk:function(){return this.a.$0()}},
a6:{
"^":"c;",
a4:function(a,b){return H.e(new P.hd(b,this),[H.L(this,"a6",0),null])},
G:function(a,b){var z,y
z={}
y=H.e(new P.V(0,$.m,null),[null])
z.a=null
z.a=this.a3(new P.fl(z,this,b,y),!0,new P.fm(y),y.gaE())
return y},
gl:function(a){var z,y
z={}
y=H.e(new P.V(0,$.m,null),[P.r])
z.a=0
this.a3(new P.fn(z),!0,new P.fo(z,y),y.gaE())
return y},
b3:function(a){var z,y
z=H.e([],[H.L(this,"a6",0)])
y=H.e(new P.V(0,$.m,null),[[P.l,H.L(this,"a6",0)]])
this.a3(new P.fp(this,z),!0,new P.fq(z,y),y.gaE())
return y}},
fl:{
"^":"i;a,b,c,d",
$1:function(a){P.hy(new P.fj(this.c,a),new P.fk(),P.hq(this.a.a,this.d))},
$signature:function(){return H.c_(function(a){return{func:1,args:[a]}},this.b,"a6")}},
fj:{
"^":"i:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fk:{
"^":"i:2;",
$1:function(a){}},
fm:{
"^":"i:0;a",
$0:function(){this.a.al(null)}},
fn:{
"^":"i:2;a",
$1:function(a){++this.a.a}},
fo:{
"^":"i:0;a,b",
$0:function(){this.b.al(this.a.a)}},
fp:{
"^":"i;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.c_(function(a){return{func:1,args:[a]}},this.a,"a6")}},
fq:{
"^":"i:0;a,b",
$0:function(){this.b.al(this.a)}},
fi:{
"^":"c;"},
jm:{
"^":"c;"},
fJ:{
"^":"c;a1:d<,aN:e?",
aW:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bG()
if((z&4)===0&&(this.e&32)===0)this.bm(this.gbr())},
bX:function(a){return this.aW(a,null)},
bZ:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.aw(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bm(this.gbt())}}}},
aR:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aC()
return this.f},
aC:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bG()
if((this.e&32)===0)this.r=null
this.f=this.bq()},
aB:["cB",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bx(a)
else this.aA(new P.fP(a,null))}],
ay:["cC",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bz(a,b)
else this.aA(new P.fR(a,b,null))}],
cO:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.by()
else this.aA(C.m)},
bs:[function(){},"$0","gbr",0,0,1],
bu:[function(){},"$0","gbt",0,0,1],
bq:function(){return},
aA:function(a){var z,y
z=this.r
if(z==null){z=new P.hm(null,null,0)
this.r=z}z.L(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aw(this)}},
bx:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.b1(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aD((z&4)!==0)},
bz:function(a,b){var z,y
z=this.e
y=new P.fL(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aC()
z=this.f
if(!!J.n(z).$isag)z.b8(y)
else y.$0()}else{y.$0()
this.aD((z&4)!==0)}},
by:function(){var z,y
z=new P.fK(this)
this.aC()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isag)y.b8(z)
else z.$0()},
bm:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aD((z&4)!==0)},
aD:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gH(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gH(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bs()
else this.bu()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aw(this)},
cK:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.ds(b,z)
this.c=c}},
fL:{
"^":"i:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aU()
x=H.ao(x,[x,x]).V(y)
w=z.d
v=this.b
u=z.b
if(x)w.eb(u,v,this.c)
else w.b1(u,v)
z.e=(z.e&4294967263)>>>0}},
fK:{
"^":"i:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.c0(z.c)
z.e=(z.e&4294967263)>>>0}},
di:{
"^":"c;as:a@"},
fP:{
"^":"di;b,a",
aX:function(a){a.bx(this.b)}},
fR:{
"^":"di;ac:b>,O:c<,a",
aX:function(a){a.bz(this.b,this.c)}},
fQ:{
"^":"c;",
aX:function(a){a.by()},
gas:function(){return},
sas:function(a){throw H.h(new P.bd("No events after a done."))}},
hf:{
"^":"c;aN:a?",
aw:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dL(new P.hg(this,a))
this.a=1},
bG:function(){if(this.a===1)this.a=3}},
hg:{
"^":"i:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.dN(this.b)}},
hm:{
"^":"hf;b,c,a",
gH:function(a){return this.c==null},
L:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sas(b)
this.c=b}},
dN:function(a){var z,y
z=this.b
y=z.gas()
this.b=y
if(y==null)this.c=null
z.aX(a)}},
hs:{
"^":"i:0;a,b,c",
$0:function(){return this.a.a8(this.b,this.c)}},
hr:{
"^":"i:14;a,b",
$2:function(a,b){return P.hp(this.a,this.b,a,b)}},
bT:{
"^":"a6;",
a3:function(a,b,c,d){return this.cU(a,d,c,!0===b)},
bQ:function(a,b,c){return this.a3(a,null,b,c)},
cU:function(a,b,c,d){return P.fV(this,a,b,c,d,H.L(this,"bT",0),H.L(this,"bT",1))},
bn:function(a,b){b.aB(a)},
$asa6:function(a,b){return[b]}},
dj:{
"^":"fJ;x,y,a,b,c,d,e,f,r",
aB:function(a){if((this.e&2)!==0)return
this.cB(a)},
ay:function(a,b){if((this.e&2)!==0)return
this.cC(a,b)},
bs:[function(){var z=this.y
if(z==null)return
z.bX(0)},"$0","gbr",0,0,1],
bu:[function(){var z=this.y
if(z==null)return
z.bZ()},"$0","gbt",0,0,1],
bq:function(){var z=this.y
if(z!=null){this.y=null
return z.aR()}return},
el:[function(a){this.x.bn(a,this)},"$1","gcX",2,0,function(){return H.c_(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"dj")}],
en:[function(a,b){this.ay(a,b)},"$2","gcZ",4,0,15],
em:[function(){this.cO()},"$0","gcY",0,0,1],
cL:function(a,b,c,d,e,f,g){var z,y
z=this.gcX()
y=this.gcZ()
this.y=this.x.a.bQ(z,this.gcY(),y)},
static:{fV:function(a,b,c,d,e,f,g){var z=$.m
z=H.e(new P.dj(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cK(b,c,d,e)
z.cL(a,b,c,d,e,f,g)
return z}}},
hd:{
"^":"bT;b,a",
bn:function(a,b){var z,y,x,w,v
z=null
try{z=this.d9(a)}catch(w){v=H.F(w)
y=v
x=H.D(w)
$.m.toString
b.ay(y,x)
return}b.aB(z)},
d9:function(a){return this.b.$1(a)}},
ad:{
"^":"c;ac:a>,O:b<",
i:function(a){return H.d(this.a)},
$isA:1},
ho:{
"^":"c;"},
hx:{
"^":"i:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cO()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.h(z)
P.hw(z,y)}},
hi:{
"^":"ho;",
gaT:function(){return this},
c0:function(a){var z,y,x,w
try{if(C.a===$.m){x=a.$0()
return x}x=P.dt(null,null,this,a)
return x}catch(w){x=H.F(w)
z=x
y=H.D(w)
return P.aT(null,null,this,z,y)}},
b1:function(a,b){var z,y,x,w
try{if(C.a===$.m){x=a.$1(b)
return x}x=P.dv(null,null,this,a,b)
return x}catch(w){x=H.F(w)
z=x
y=H.D(w)
return P.aT(null,null,this,z,y)}},
eb:function(a,b,c){var z,y,x,w
try{if(C.a===$.m){x=a.$2(b,c)
return x}x=P.du(null,null,this,a,b,c)
return x}catch(w){x=H.F(w)
z=x
y=H.D(w)
return P.aT(null,null,this,z,y)}},
aP:function(a,b){if(b)return new P.hj(this,a)
else return new P.hk(this,a)},
dh:function(a,b){return new P.hl(this,a)},
h:function(a,b){return},
c_:function(a){if($.m===C.a)return a.$0()
return P.dt(null,null,this,a)},
b0:function(a,b){if($.m===C.a)return a.$1(b)
return P.dv(null,null,this,a,b)},
ea:function(a,b,c){if($.m===C.a)return a.$2(b,c)
return P.du(null,null,this,a,b,c)}},
hj:{
"^":"i:0;a,b",
$0:function(){return this.a.c0(this.b)}},
hk:{
"^":"i:0;a,b",
$0:function(){return this.a.c_(this.b)}},
hl:{
"^":"i:2;a,b",
$1:function(a){return this.a.b1(this.b,a)}}}],["","",,P,{
"^":"",
eW:function(){return H.e(new H.ai(0,null,null,null,null,null,0),[null,null])},
aw:function(a){return H.hE(a,H.e(new H.ai(0,null,null,null,null,null,0),[null,null]))},
eE:function(a,b,c){var z,y
if(P.bX(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aE()
y.push(a)
try{P.hu(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.cZ(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b3:function(a,b,c){var z,y,x
if(P.bX(a))return b+"..."+c
z=new P.bN(b)
y=$.$get$aE()
y.push(a)
try{x=z
x.a=P.cZ(x.ga0(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.ga0()+c
y=z.ga0()
return y.charCodeAt(0)==0?y:y},
bX:function(a){var z,y
for(z=0;y=$.$get$aE(),z<y.length;++z)if(a===y[z])return!0
return!1},
hu:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gB(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.d(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gw();++x
if(!z.t()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.t();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ax:function(a,b,c,d){return H.e(new P.h7(0,null,null,null,null,null,0),[d])},
f1:function(a){var z,y,x
z={}
if(P.bX(a))return"{...}"
y=new P.bN("")
try{$.$get$aE().push(a)
x=y
x.a=x.ga0()+"{"
z.a=!0
J.dX(a,new P.f2(z,y))
z=y
z.a=z.ga0()+"}"}finally{z=$.$get$aE()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.ga0()
return z.charCodeAt(0)==0?z:z},
dp:{
"^":"ai;a,b,c,d,e,f,r",
af:function(a){return H.hU(a)&0x3ffffff},
ag:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbN()
if(x==null?b==null:x===b)return y}return-1},
static:{aB:function(a,b){return H.e(new P.dp(0,null,null,null,null,null,0),[a,b])}}},
h7:{
"^":"h4;a,b,c,d,e,f,r",
gB:function(a){var z=new P.cC(this,this.r,null,null)
z.c=this.e
return z},
gl:function(a){return this.a},
ds:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cS(b)},
cS:function(a){var z=this.d
if(z==null)return!1
return this.an(z[this.am(a)],a)>=0},
bR:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.ds(0,a)?a:null
else return this.d2(a)},
d2:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.am(a)]
x=this.an(y,a)
if(x<0)return
return J.G(y,x).gbj()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.h(new P.J(this))
z=z.b}},
L:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.be(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.be(x,b)}else return this.P(b)},
P:function(a){var z,y,x
z=this.d
if(z==null){z=P.h8()
this.d=z}y=this.am(a)
x=z[y]
if(x==null)z[y]=[this.aL(a)]
else{if(this.an(x,a)>=0)return!1
x.push(this.aL(a))}return!0},
M:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bg(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bg(this.c,b)
else return this.d5(b)},
d5:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.am(a)]
x=this.an(y,a)
if(x<0)return!1
this.bh(y.splice(x,1)[0])
return!0},
a2:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
be:function(a,b){if(a[b]!=null)return!1
a[b]=this.aL(b)
return!0},
bg:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bh(z)
delete a[b]
return!0},
aL:function(a){var z,y
z=new P.eX(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bh:function(a){var z,y
z=a.gcQ()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
am:function(a){return J.C(a)&0x3ffffff},
an:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Q(a[y].gbj(),b))return y
return-1},
$isv:1,
static:{h8:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eX:{
"^":"c;bj:a<,b,cQ:c<"},
cC:{
"^":"c;a,b,c,d",
gw:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.h(new P.J(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
h4:{
"^":"ff;"},
cE:{
"^":"c;",
gB:function(a){return new H.cD(a,this.gl(a),0,null)},
Y:function(a,b){return this.h(a,b)},
G:function(a,b){var z,y,x,w
z=this.gl(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.a(a,w)
b.$1(a[w])
if(x)throw H.h(new P.J(a))}},
a4:function(a,b){return H.e(new H.bF(a,b),[null,null])},
i:function(a){return P.b3(a,"[","]")},
$isl:1,
$asl:null,
$isv:1},
f2:{
"^":"i:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
eY:{
"^":"K;a,b,c,d",
gB:function(a){return new P.h9(this,this.c,this.d,this.b,null)},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.z(new P.J(this))}},
gH:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a2:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.b3(this,"{","}")},
bY:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.h(H.cy());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
P:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bl();++this.d},
bl:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.P(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bb(y,0,w,z,x)
C.b.bb(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cE:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isv:1,
static:{bE:function(a,b){var z=H.e(new P.eY(null,0,0,0),[b])
z.cE(a,b)
return z}}},
h9:{
"^":"c;a,b,c,d,e",
gw:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.z(new P.J(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fg:{
"^":"c;",
a4:function(a,b){return H.e(new H.cq(this,b),[H.P(this,0),null])},
i:function(a){return P.b3(this,"{","}")},
G:function(a,b){var z
for(z=this.gB(this);z.t();)b.$1(z.d)},
$isv:1},
ff:{
"^":"fg;"}}],["","",,P,{
"^":"",
cr:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.as(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eq(a)},
eq:function(a){var z=J.n(a)
if(!!z.$isi)return z.i(a)
return H.ba(a)},
b2:function(a){return new P.fU(a)},
b6:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.aY(a);y.t();)z.push(y.gw())
return z},
W:function(a){var z=H.d(a)
H.hV(z)},
bY:{
"^":"c;"},
"+bool":0,
ic:{
"^":"c;"},
X:{
"^":"a0;"},
"+double":0,
au:{
"^":"c;aF:a<",
u:function(a,b){return new P.au(C.d.u(this.a,b.gaF()))},
D:function(a,b){return new P.au(this.a-b.gaF())},
a_:function(a,b){return new P.au(C.d.ai(this.a*b))},
av:function(a,b){return C.d.av(this.a,b.gaF())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.au))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.ep()
y=this.a
if(y<0)return"-"+new P.au(-y).i(0)
x=z.$1(C.d.aY(C.d.aa(y,6e7),60))
w=z.$1(C.d.aY(C.d.aa(y,1e6),60))
v=new P.eo().$1(C.d.aY(y,1e6))
return""+C.d.aa(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)}},
eo:{
"^":"i:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ep:{
"^":"i:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
A:{
"^":"c;",
gO:function(){return H.D(this.$thrownJsError)}},
cO:{
"^":"A;",
i:function(a){return"Throw of null."}},
ac:{
"^":"A;a,b,c,d",
gaH:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaG:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.d(z)+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gaH()+y+x
if(!this.a)return w
v=this.gaG()
u=P.cr(this.b)
return w+v+": "+H.d(u)},
static:{ck:function(a){return new P.ac(!1,null,null,a)},ee:function(a,b,c){return new P.ac(!0,a,b,c)}}},
bM:{
"^":"ac;e,f,a,b,c,d",
gaH:function(){return"RangeError"},
gaG:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else{if(typeof x!=="number")return x.eh()
if(typeof z!=="number")return H.w(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{f7:function(a){return new P.bM(null,null,!1,null,null,a)},bb:function(a,b,c){return new P.bM(null,null,!0,a,b,"Value not in range")},aP:function(a,b,c,d,e){return new P.bM(b,c,!0,a,d,"Invalid value")},cT:function(a,b,c,d,e,f){if(0>a||a>c)throw H.h(P.aP(a,0,c,"start",f))
if(a>b||b>c)throw H.h(P.aP(b,a,c,"end",f))
return b}}},
ev:{
"^":"ac;e,l:f>,a,b,c,d",
gaH:function(){return"RangeError"},
gaG:function(){if(J.dP(this.b,0))return": index must not be negative"
var z=this.f
if(J.Q(z,0))return": no indices are valid"
return": index should be less than "+H.d(z)},
static:{cv:function(a,b,c,d,e){var z=e!=null?e:J.I(b)
return new P.ev(b,z,!0,a,c,"Index out of range")}}},
U:{
"^":"A;a",
i:function(a){return"Unsupported operation: "+this.a}},
df:{
"^":"A;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
bd:{
"^":"A;a",
i:function(a){return"Bad state: "+this.a}},
J:{
"^":"A;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.cr(z))+"."}},
f4:{
"^":"c;",
i:function(a){return"Out of Memory"},
gO:function(){return},
$isA:1},
cY:{
"^":"c;",
i:function(a){return"Stack Overflow"},
gO:function(){return},
$isA:1},
el:{
"^":"A;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
fU:{
"^":"c;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
er:{
"^":"c;a",
i:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z=H.b9(b,"expando$values")
return z==null?null:H.b9(z,this.bk())},
C:function(a,b,c){var z=H.b9(b,"expando$values")
if(z==null){z=new P.c()
H.bL(b,"expando$values",z)}H.bL(z,this.bk(),c)},
bk:function(){var z,y
z=H.b9(this,"expando$key")
if(z==null){y=$.cs
$.cs=y+1
z="expando$key$"+y
H.bL(this,"expando$key",z)}return z}},
r:{
"^":"a0;"},
"+int":0,
K:{
"^":"c;",
a4:function(a,b){return H.b7(this,b,H.L(this,"K",0),null)},
G:function(a,b){var z
for(z=this.gB(this);z.t();)b.$1(z.gw())},
b4:function(a,b){return P.b6(this,!0,H.L(this,"K",0))},
b3:function(a){return this.b4(a,!0)},
gl:function(a){var z,y
z=this.gB(this)
for(y=0;z.t();)++y
return y},
Y:function(a,b){var z,y,x
if(b<0)H.z(P.aP(b,0,null,"index",null))
for(z=this.gB(this),y=0;z.t();){x=z.gw()
if(b===y)return x;++y}throw H.h(P.cv(b,this,"index",null,y))},
i:function(a){return P.eE(this,"(",")")}},
eG:{
"^":"c;"},
l:{
"^":"c;",
$asl:null,
$isv:1},
"+List":0,
iL:{
"^":"c;"},
iY:{
"^":"c;",
i:function(a){return"null"}},
"+Null":0,
a0:{
"^":"c;"},
"+num":0,
c:{
"^":";",
q:function(a,b){return this===b},
gA:function(a){return H.a5(this)},
i:function(a){return H.ba(this)},
toString:function(){return this.i(this)}},
ay:{
"^":"c;"},
a7:{
"^":"c;"},
"+String":0,
bN:{
"^":"c;a0:a<",
gl:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cZ:function(a,b,c){var z=J.aY(b)
if(!z.t())return a
if(c.length===0){do a+=H.d(z.gw())
while(z.t())}else{a+=H.d(z.gw())
for(;z.t();)a=a+c+H.d(z.gw())}return a}}}}],["","",,W,{
"^":"",
a9:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dn:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dr:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.fO(a)
if(!!J.n(z).$isM)return z
return}else return a},
ab:function(a){var z=$.m
if(z===C.a)return a
return z.dh(a,!0)},
y:{
"^":"aJ;",
$isy:1,
$isc:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
i5:{
"^":"y;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
i7:{
"^":"y;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
i8:{
"^":"y;",
gah:function(a){return H.e(new W.N(a,"load",!1),[null])},
$isM:1,
$isf:1,
"%":"HTMLBodyElement"},
i9:{
"^":"y;j:height%,k:width%",
c9:function(a,b,c){return a.getContext(b)},
c8:function(a,b){return this.c9(a,b,null)},
"%":"HTMLCanvasElement"},
ib:{
"^":"aO;l:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
em:{
"^":"aO;",
gah:function(a){return H.e(new W.bi(a,"load",!1),[null])},
dw:function(a,b,c){return a.createElement(b)},
dv:function(a,b){return this.dw(a,b,null)},
"%":"XMLDocument;Document"},
id:{
"^":"aO;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
ie:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
en:{
"^":"f;aQ:bottom=,j:height=,I:left=,b_:right=,a6:top=,k:width=,m:x=,n:y=",
i:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gk(a))+" x "+H.d(this.gj(a))},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.n(b)
if(!z.$isZ)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga6(b)
if(y==null?x==null:y===x){y=this.gk(a)
x=z.gk(b)
if(y==null?x==null:y===x){y=this.gj(a)
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(this.gk(a))
w=J.C(this.gj(a))
return W.dn(W.a9(W.a9(W.a9(W.a9(0,z),y),x),w))},
gb5:function(a){return H.e(new P.S(a.left,a.top),[null])},
$isZ:1,
$asZ:I.bm,
"%":";DOMRectReadOnly"},
aJ:{
"^":"aO;",
gat:function(a){return P.f9(C.c.ai(a.offsetLeft),C.c.ai(a.offsetTop),C.c.ai(a.offsetWidth),C.c.ai(a.offsetHeight),null)},
i:function(a){return a.localName},
c7:function(a){return a.getBoundingClientRect()},
gbT:function(a){return H.e(new W.N(a,"click",!1),[null])},
gah:function(a){return H.e(new W.N(a,"load",!1),[null])},
gbU:function(a){return H.e(new W.N(a,"mousedown",!1),[null])},
gbV:function(a){return H.e(new W.N(a,"mousemove",!1),[null])},
gbW:function(a){return H.e(new W.N(a,"mouseup",!1),[null])},
$isaJ:1,
$isf:1,
$isM:1,
"%":";Element"},
ig:{
"^":"y;j:height%,N:src},k:width%",
"%":"HTMLEmbedElement"},
ih:{
"^":"bv;ac:error=",
"%":"ErrorEvent"},
bv:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
M:{
"^":"f;",
cN:function(a,b,c,d){return a.addEventListener(b,H.ap(c,1),!1)},
d6:function(a,b,c,d){return a.removeEventListener(b,H.ap(c,1),!1)},
$isM:1,
"%":"MediaStream;EventTarget"},
iD:{
"^":"y;l:length=",
"%":"HTMLFormElement"},
eu:{
"^":"em;",
"%":"HTMLDocument"},
iF:{
"^":"y;j:height%,N:src},k:width%",
"%":"HTMLIFrameElement"},
iG:{
"^":"y;j:height%,N:src},k:width%",
"%":"HTMLImageElement"},
iI:{
"^":"y;j:height%,N:src},k:width%",
$isaJ:1,
$isf:1,
$isM:1,
"%":"HTMLInputElement"},
bA:{
"^":"de;",
ge1:function(a){return a.keyCode},
$isbA:1,
$isc:1,
"%":"KeyboardEvent"},
f3:{
"^":"y;ac:error=,N:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bG:{
"^":"de;",
gat:function(a){var z,y,x
if(!!a.offsetX)return H.e(new P.S(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.n(W.dr(z)).$isaJ)throw H.h(new P.U("offsetX is only supported on elements"))
y=W.dr(z)
x=H.e(new P.S(a.clientX,a.clientY),[null]).D(0,J.e3(J.e4(y)))
return H.e(new P.S(J.ci(x.a),J.ci(x.b)),[null])}},
$isbG:1,
$isc:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
iX:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aO:{
"^":"M;",
i:function(a){var z=a.nodeValue
return z==null?this.cz(a):z},
"%":"Attr;Node"},
iZ:{
"^":"y;j:height%,k:width%",
"%":"HTMLObjectElement"},
j3:{
"^":"y;N:src}",
"%":"HTMLScriptElement"},
j5:{
"^":"y;l:length=",
"%":"HTMLSelectElement"},
j6:{
"^":"y;N:src}",
"%":"HTMLSourceElement"},
j7:{
"^":"bv;ac:error=",
"%":"SpeechRecognitionError"},
jb:{
"^":"y;N:src}",
"%":"HTMLTrackElement"},
de:{
"^":"bv;",
"%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
jd:{
"^":"f3;j:height%,k:width%",
"%":"HTMLVideoElement"},
fC:{
"^":"M;",
gbE:function(a){var z=H.e(new P.hn(H.e(new P.V(0,$.m,null),[P.a0])),[P.a0])
this.cV(a)
this.d7(a,W.ab(new W.fD(z)))
return z.a},
d7:function(a,b){return a.requestAnimationFrame(H.ap(b,1))},
cV:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gah:function(a){return H.e(new W.bi(a,"load",!1),[null])},
$isf:1,
$isM:1,
"%":"DOMWindow|Window"},
fD:{
"^":"i:2;a",
$1:function(a){var z=this.a.a
if(z.a!==0)H.z(new P.bd("Future already completed"))
z.al(a)}},
jj:{
"^":"f;aQ:bottom=,j:height=,I:left=,b_:right=,a6:top=,k:width=",
i:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.n(b)
if(!z.$isZ)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga6(b)
if(y==null?x==null:y===x){y=a.width
x=z.gk(b)
if(y==null?x==null:y===x){y=a.height
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(a.width)
w=J.C(a.height)
return W.dn(W.a9(W.a9(W.a9(W.a9(0,z),y),x),w))},
gb5:function(a){return H.e(new P.S(a.left,a.top),[null])},
$isZ:1,
$asZ:I.bm,
"%":"ClientRect"},
jk:{
"^":"aO;",
$isf:1,
"%":"DocumentType"},
jl:{
"^":"en;",
gj:function(a){return a.height},
gk:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":"DOMRect"},
jo:{
"^":"y;",
$isM:1,
$isf:1,
"%":"HTMLFrameSetElement"},
bi:{
"^":"a6;a,b,c",
a3:function(a,b,c,d){var z=new W.ak(0,this.a,this.b,W.ab(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.R()
return z},
bQ:function(a,b,c){return this.a3(a,null,b,c)}},
N:{
"^":"bi;a,b,c"},
ak:{
"^":"fi;a,b,c,d,e",
aR:function(){if(this.b==null)return
this.bC()
this.b=null
this.d=null
return},
aW:function(a,b){if(this.b==null)return;++this.a
this.bC()},
bX:function(a){return this.aW(a,null)},
bZ:function(){if(this.b==null||this.a<=0)return;--this.a
this.R()},
R:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dR(x,this.c,z,!1)}},
bC:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dS(x,this.c,z,!1)}}},
fN:{
"^":"c;a",
$isM:1,
$isf:1,
static:{fO:function(a){if(a===window)return a
else return new W.fN(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
i3:{
"^":"ah;",
$isf:1,
"%":"SVGAElement"},
i4:{
"^":"fr;",
$isf:1,
"%":"SVGAltGlyphElement"},
i6:{
"^":"o;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
ii:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEBlendElement"},
ij:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
ik:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
il:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFECompositeElement"},
im:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
io:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
ip:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
iq:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEFloodElement"},
ir:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
is:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEImageElement"},
it:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEMergeElement"},
iu:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEMorphologyElement"},
iv:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFEOffsetElement"},
iw:{
"^":"o;m:x=,n:y=,b9:z=",
"%":"SVGFEPointLightElement"},
ix:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
iy:{
"^":"o;m:x=,n:y=,b9:z=",
"%":"SVGFESpotLightElement"},
iz:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFETileElement"},
iA:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFETurbulenceElement"},
iB:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGFilterElement"},
iC:{
"^":"ah;j:height=,k:width=,m:x=,n:y=",
"%":"SVGForeignObjectElement"},
es:{
"^":"ah;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ah:{
"^":"o;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
iH:{
"^":"ah;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGImageElement"},
iM:{
"^":"o;",
$isf:1,
"%":"SVGMarkerElement"},
iN:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGMaskElement"},
j_:{
"^":"o;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGPatternElement"},
j0:{
"^":"f;m:x=,n:y=",
"%":"SVGRect"},
j1:{
"^":"es;j:height=,k:width=,m:x=,n:y=",
"%":"SVGRectElement"},
j4:{
"^":"o;",
$isf:1,
"%":"SVGScriptElement"},
o:{
"^":"aJ;",
gbT:function(a){return H.e(new W.N(a,"click",!1),[null])},
gah:function(a){return H.e(new W.N(a,"load",!1),[null])},
gbU:function(a){return H.e(new W.N(a,"mousedown",!1),[null])},
gbV:function(a){return H.e(new W.N(a,"mousemove",!1),[null])},
gbW:function(a){return H.e(new W.N(a,"mouseup",!1),[null])},
$isM:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
j8:{
"^":"ah;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGSVGElement"},
j9:{
"^":"o;",
$isf:1,
"%":"SVGSymbolElement"},
d1:{
"^":"ah;",
"%":";SVGTextContentElement"},
ja:{
"^":"d1;",
$isf:1,
"%":"SVGTextPathElement"},
fr:{
"^":"d1;m:x=,n:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jc:{
"^":"ah;j:height=,k:width=,m:x=,n:y=",
$isf:1,
"%":"SVGUseElement"},
je:{
"^":"o;",
$isf:1,
"%":"SVGViewElement"},
jn:{
"^":"o;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jp:{
"^":"o;",
$isf:1,
"%":"SVGCursorElement"},
jq:{
"^":"o;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jr:{
"^":"o;",
$isf:1,
"%":"SVGGlyphRefElement"},
js:{
"^":"o;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
j2:{
"^":"f;",
de:function(a,b,c){return a.attachShader(b,c)},
df:function(a,b,c){return a.bindBuffer(b,c)},
dg:function(a,b,c){return a.bindTexture(b,c)},
di:function(a,b,c,d){return a.bufferData(b,c,d)},
dj:function(a,b,c,d){return a.bufferSubData(b,c,d)},
dm:function(a,b){return a.clear(b)},
dn:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dr:function(a,b){return a.compileShader(b)},
du:function(a){return a.createBuffer()},
dz:function(a){return a.createProgram()},
dA:function(a,b){return a.createShader(b)},
dB:function(a){return a.createTexture()},
dJ:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dK:function(a,b){return a.enableVertexAttribArray(b)},
c6:function(a,b,c){return a.getAttribLocation(b,c)},
ca:function(a,b){return a.getProgramInfoLog(b)},
cb:function(a,b,c){return a.getProgramParameter(b,c)},
cc:function(a,b){return a.getShaderInfoLog(b)},
cd:function(a,b,c){return a.getShaderParameter(b,c)},
ce:function(a,b,c){return a.getUniformLocation(b,c)},
e3:function(a,b){return a.linkProgram(b)},
cr:function(a,b,c){return a.shaderSource(b,c)},
ec:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
ed:function(a,b,c,d){return a.texParameteri(b,c,d)},
ee:function(a,b){return a.useProgram(b)},
ef:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
eg:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ia:{
"^":"c;"}}],["","",,P,{
"^":"",
aA:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dm:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
c5:function(a,b){var z
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0)z=b===0?1/b<0:b<0
else z=!1
if(z||isNaN(b))return b
return a}return a},
dI:function(a,b){var z
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a},
h6:{
"^":"c;",
p:function(a){if(a<=0||a>4294967296)throw H.h(P.f7("max must be in range 0 < max \u2264 2^32, was "+H.d(a)))
return Math.random()*a>>>0}},
S:{
"^":"c;m:a>,n:b>",
i:function(a){return"Point("+H.d(this.a)+", "+H.d(this.b)+")"},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.S))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){var z,y
z=J.C(this.a)
y=J.C(this.b)
return P.dm(P.aA(P.aA(0,z),y))},
u:function(a,b){var z,y,x
z=this.a
y=J.j(b)
x=y.gm(b)
if(typeof z!=="number")return z.u()
x=C.c.u(z,x)
z=this.b
y=y.gn(b)
if(typeof z!=="number")return z.u()
y=new P.S(x,C.c.u(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
D:function(a,b){var z,y,x,w
z=this.a
y=J.ar(b)
if(typeof z!=="number")return z.D()
if(typeof y!=="number")return H.w(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.D()
if(typeof w!=="number")return H.w(w)
w=new P.S(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w},
a_:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.a_()
y=this.b
if(typeof y!=="number")return y.a_()
y=new P.S(z*b,y*b)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
hh:{
"^":"c;",
gb_:function(a){return this.gI(this)+this.c},
gaQ:function(a){return this.ga6(this)+this.d},
i:function(a){return"Rectangle ("+this.gI(this)+", "+this.b+") "+this.c+" x "+this.d},
q:function(a,b){var z,y
if(b==null)return!1
z=J.n(b)
if(!z.$isZ)return!1
if(this.gI(this)===z.gI(b)){y=this.b
z=y===z.ga6(b)&&this.a+this.c===z.gb_(b)&&y+this.d===z.gaQ(b)}else z=!1
return z},
gA:function(a){var z=this.b
return P.dm(P.aA(P.aA(P.aA(P.aA(0,this.gI(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gb5:function(a){var z=new P.S(this.gI(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
Z:{
"^":"hh;I:a>,a6:b>,k:c>,j:d>",
$asZ:null,
static:{f9:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.e(new P.Z(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
aa:function(a){var z,y,x
if(!!J.n(a).$isb4)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
cH:{
"^":"f;",
$iscH:1,
"%":"ArrayBuffer"},
bJ:{
"^":"f;",
$isbJ:1,
"%":"DataView;ArrayBufferView;bH|cI|cK|bI|cJ|cL|a4"},
bH:{
"^":"bJ;",
gl:function(a){return a.length},
$isbx:1,
$isb4:1},
bI:{
"^":"cK;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
C:function(a,b,c){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
a[b]=c}},
cI:{
"^":"bH+cE;",
$isl:1,
$asl:function(){return[P.X]},
$isv:1},
cK:{
"^":"cI+ct;"},
a4:{
"^":"cL;",
C:function(a,b,c){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.r]},
$isv:1},
cJ:{
"^":"bH+cE;",
$isl:1,
$asl:function(){return[P.r]},
$isv:1},
cL:{
"^":"cJ+ct;"},
iO:{
"^":"bI;",
$isl:1,
$asl:function(){return[P.X]},
$isv:1,
"%":"Float32Array"},
iP:{
"^":"bI;",
$isl:1,
$asl:function(){return[P.X]},
$isv:1,
"%":"Float64Array"},
iQ:{
"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":"Int16Array"},
iR:{
"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":"Int32Array"},
iS:{
"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":"Int8Array"},
iT:{
"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":"Uint16Array"},
iU:{
"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":"Uint32Array"},
iV:{
"^":"a4;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
iW:{
"^":"a4;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.r]},
$isv:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
hV:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cz.prototype
return J.eI.prototype}if(typeof a=="string")return J.b5.prototype
if(a==null)return J.eJ.prototype
if(typeof a=="boolean")return J.eH.prototype
if(a.constructor==Array)return J.aK.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aM.prototype
return a}if(a instanceof P.c)return a
return J.bn(a)}
J.O=function(a){if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(a.constructor==Array)return J.aK.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aM.prototype
return a}if(a instanceof P.c)return a
return J.bn(a)}
J.aF=function(a){if(a==null)return a
if(a.constructor==Array)return J.aK.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aM.prototype
return a}if(a instanceof P.c)return a
return J.bn(a)}
J.c0=function(a){if(typeof a=="number")return J.aL.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bf.prototype
return a}
J.dD=function(a){if(typeof a=="number")return J.aL.prototype
if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bf.prototype
return a}
J.j=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aM.prototype
return a}if(a instanceof P.c)return a
return J.bn(a)}
J.aG=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.dD(a).u(a,b)}
J.Q=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).q(a,b)}
J.dP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.c0(a).av(a,b)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dD(a).a_(a,b)}
J.dQ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.c0(a).D(a,b)}
J.G=function(a,b){if(a.constructor==Array||typeof a=="string"||H.dG(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.O(a).h(a,b)}
J.H=function(a,b,c){if((a.constructor==Array||H.dG(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aF(a).C(a,b,c)}
J.dR=function(a,b,c,d){return J.j(a).cN(a,b,c,d)}
J.dS=function(a,b,c,d){return J.j(a).d6(a,b,c,d)}
J.c8=function(a,b,c){return J.j(a).de(a,b,c)}
J.t=function(a,b,c){return J.j(a).df(a,b,c)}
J.br=function(a,b,c){return J.j(a).dg(a,b,c)}
J.aV=function(a,b,c,d){return J.j(a).di(a,b,c,d)}
J.c9=function(a,b,c,d){return J.j(a).dj(a,b,c,d)}
J.ca=function(a,b){return J.aF(a).dm(a,b)}
J.dT=function(a,b,c,d,e){return J.j(a).dn(a,b,c,d,e)}
J.cb=function(a,b){return J.j(a).dr(a,b)}
J.aW=function(a){return J.j(a).du(a)}
J.dU=function(a){return J.j(a).dz(a)}
J.cc=function(a,b){return J.j(a).dA(a,b)}
J.dV=function(a){return J.j(a).dB(a)}
J.cd=function(a,b,c,d,e){return J.j(a).dJ(a,b,c,d,e)}
J.dW=function(a,b){return J.aF(a).Y(a,b)}
J.aX=function(a,b){return J.j(a).dK(a,b)}
J.dX=function(a,b){return J.aF(a).G(a,b)}
J.Y=function(a){return J.j(a).gac(a)}
J.C=function(a){return J.n(a).gA(a)}
J.aY=function(a){return J.aF(a).gB(a)}
J.dY=function(a){return J.j(a).ge1(a)}
J.I=function(a){return J.O(a).gl(a)}
J.dZ=function(a){return J.j(a).gbT(a)}
J.e_=function(a){return J.j(a).gah(a)}
J.e0=function(a){return J.j(a).gbU(a)}
J.e1=function(a){return J.j(a).gbV(a)}
J.e2=function(a){return J.j(a).gbW(a)}
J.e3=function(a){return J.j(a).gb5(a)}
J.ar=function(a){return J.j(a).gm(a)}
J.aH=function(a){return J.j(a).gn(a)}
J.aZ=function(a){return J.j(a).gb9(a)}
J.b_=function(a,b,c){return J.j(a).c6(a,b,c)}
J.e4=function(a){return J.j(a).c7(a)}
J.e5=function(a,b){return J.j(a).c8(a,b)}
J.e6=function(a,b){return J.j(a).ca(a,b)}
J.e7=function(a,b,c){return J.j(a).cb(a,b,c)}
J.ce=function(a,b){return J.j(a).cc(a,b)}
J.cf=function(a,b,c){return J.j(a).cd(a,b,c)}
J.aI=function(a,b,c){return J.j(a).ce(a,b,c)}
J.e8=function(a,b){return J.j(a).e3(a,b)}
J.e9=function(a,b){return J.aF(a).a4(a,b)}
J.ea=function(a,b){return J.j(a).sj(a,b)}
J.eb=function(a,b){return J.j(a).sN(a,b)}
J.ec=function(a,b){return J.j(a).sk(a,b)}
J.cg=function(a,b,c){return J.j(a).cr(a,b,c)}
J.ed=function(a,b,c,d,e,f,g){return J.j(a).ec(a,b,c,d,e,f,g)}
J.ch=function(a,b,c,d){return J.j(a).ed(a,b,c,d)}
J.ci=function(a){return J.c0(a).S(a)}
J.as=function(a){return J.n(a).i(a)}
J.b0=function(a,b){return J.j(a).ee(a,b)}
J.a2=function(a,b,c,d,e,f,g){return J.j(a).ef(a,b,c,d,e,f,g)}
J.cj=function(a,b,c,d,e){return J.j(a).eg(a,b,c,d,e)}
var $=I.p
C.o=W.eu.prototype
C.p=J.f.prototype
C.b=J.aK.prototype
C.d=J.cz.prototype
C.c=J.aL.prototype
C.e=J.b5.prototype
C.x=J.aM.prototype
C.y=J.f5.prototype
C.z=J.bf.prototype
C.j=W.fC.prototype
C.k=new H.cp()
C.l=new P.f4()
C.m=new P.fQ()
C.n=new P.h6()
C.a=new P.hi()
C.f=new P.au(0)
C.q=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.r=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.h=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.i=function(hooks) { return hooks; }

C.t=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.v=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.u=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.w=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
$.b=null
$.u=500
$.af=600
$.bB=!1
$.cB=!1
$.bC=!1
$.aj=20
$.hX="precision mediump float;\n\nattribute vec4 vert_position;\nattribute vec4 vert_color;\n\nuniform mat4 mvp_matrix;\nuniform float offset;\nuniform vec2 fixed_offs;\n\nvarying vec4 frag_color;\n\nvoid main() {\n  frag_color = vec4(vert_color);\n  vec4 pos = vec4((vert_position.x + fixed_offs.x),\n                  -(vert_position.y + fixed_offs.y - offset),\n                  vert_position.zw);\n  gl_Position = mvp_matrix * pos;\n}\n"
$.hW="precision mediump float;\n\nvarying vec4 frag_color;\n\nvoid main() {\n  gl_FragColor = vec4(frag_color.xyz / 255.0, 1.0);\n}\n"
$.i0="precision mediump float;\n\nattribute vec4 vert_position;\nattribute vec4 vert_tex_coord;\n\nuniform mat4 mvp_matrix;\n\nvarying vec4 frag_tex_coord;\n\nvoid main() {\n  frag_tex_coord = vec4(vert_tex_coord.xyzw);\n  gl_Position = mvp_matrix * vert_position;\n}\n"
$.i_="precision mediump float;\n\nuniform sampler2D tex_sampler;\n\nconst vec3 color0 = vec3(0.0, 0.0, 0.0);\nconst vec3 color1 = vec3(0.266, 0.329, 0.663) * 0.8;\nconst vec3 color2 = vec3(0.743, 0.763, 0.267) * 0.5;\nconst vec3 color3 = vec3(0.663, 0.267, 0.267) * 0.8;\n\nvarying vec4 frag_tex_coord;\n\nvoid main() {\n  vec3 color;\n  if(frag_tex_coord.z == 0.0) color = vec3(color0);\n  if(frag_tex_coord.z == 1.0) color = vec3(color1);\n  if(frag_tex_coord.z == 2.0) color = vec3(color2);\n  if(frag_tex_coord.z == 3.0) color = vec3(color3);\n  vec3 tex_color = texture2D(tex_sampler, frag_tex_coord.xy).xyz;\n  if(tex_color != vec3(1.0, 0.0, 1.0)) gl_FragColor = vec4(color.xyz, 1.0);\n  else discard;\n}\n"
$.cP="$cachedFunction"
$.cQ="$cachedInvocation"
$.R=0
$.at=null
$.cl=null
$.c2=null
$.dx=null
$.dK=null
$.bl=null
$.bo=null
$.c3=null
$.am=null
$.aC=null
$.aD=null
$.bW=!1
$.m=C.a
$.cs=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bR","$get$bR",function(){return new D.p(68,84,169)},"bK","$get$bK",function(){return new D.p(198,200,81)},"bu","$get$bu",function(){return[new D.p(169,146,68),new D.p(169,129,68),new D.p(169,137,68)]},"bQ","$get$bQ",function(){return[new D.p(169,94,68),new D.p(169,68,68)]},"aQ","$get$aQ",function(){return[new D.p(163,200,204),new D.p(162,193,204)]},"bw","$get$bw",function(){return[new D.p(117,169,68),new D.p(68,169,75)]},"q","$get$q",function(){return C.n},"c6","$get$c6",function(){return P.b6([2/$.u,0,0,0,0,2/$.af,0,0,0,0,1,0,0,0,0,1],!0,null)},"aN","$get$aN",function(){return new D.k(-1,-1)},"cF","$get$cF",function(){return[new D.k(11,2),new D.k(11,1),new D.k(13,2),new D.k(11,0),new D.k(10,2),new D.k(13,1),new D.k(14,2),new D.k(10,1),new D.k(9,2),new D.k(13,0),new D.k(14,1),new D.k(10,0),new D.k(8,2),new D.k(14,0),new D.k(9,1),new D.k(15,2),new D.k(15,1),new D.k(16,2),new D.k(15,0),new D.k(16,1),new D.k(9,0),new D.k(7,2),new D.k(8,1),new D.k(8,0)]},"co","$get$co",function(){return init.getIsolateTag("_$dart_dartClosure")},"cw","$get$cw",function(){return H.eC()},"cx","$get$cx",function(){return new P.er(null)},"d3","$get$d3",function(){return H.T(H.be({toString:function(){return"$receiver$"}}))},"d4","$get$d4",function(){return H.T(H.be({$method$:null,toString:function(){return"$receiver$"}}))},"d5","$get$d5",function(){return H.T(H.be(null))},"d6","$get$d6",function(){return H.T(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"da","$get$da",function(){return H.T(H.be(void 0))},"db","$get$db",function(){return H.T(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d8","$get$d8",function(){return H.T(H.d9(null))},"d7","$get$d7",function(){return H.T(function(){try{null.$method$}catch(z){return z.message}}())},"dd","$get$dd",function(){return H.T(H.d9(void 0))},"dc","$get$dc",function(){return H.T(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bS","$get$bS",function(){return P.fE()},"aE","$get$aE",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[W.bG]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a7,args:[P.r]},{func:1,v:true,args:[P.a0]},{func:1,args:[W.bA]},{func:1,args:[,P.a7]},{func:1,args:[P.a7]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.ay]},{func:1,ret:P.bY},{func:1,args:[,P.ay]},{func:1,v:true,args:[,P.ay]},{func:1,args:[,,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.i1(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bm=a.bm
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dM(D.cA(),b)},[])
else (function(b){H.dM(D.cA(),b)})([])})})()