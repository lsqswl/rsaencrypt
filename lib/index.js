"use strict";
/**
 * index.js
 * Created by lsqswl on 2018/8/20.
 */
exports.__esModule = true;
var jsencrypt_1 = require("jsencrypt");
var b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var b64pad = '=';
function hex2b64(h) {
    var i;
    var c;
    var ret = '';
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 === h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2);
    }
    else if (i + 2 === h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad;
    }
    return ret;
}
var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
function int2char(n) {
    return BI_RM.charAt(n);
}
function b64tohex(s) {
    var ret = '';
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) === b64pad) {
            break;
        }
        var v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue;
        }
        if (k === 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k === 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k === 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k === 1) {
        ret += int2char(slop << 2);
    }
    return ret;
}
/**
 * rsa公钥加密长字符串
 * @param str
 * @param publicKey
 * @returns {any}
 */
function encryptPublicLong(text, publicKey) {
    var rsa = new jsencrypt_1["default"]();
    rsa.setPublicKey(publicKey);
    var key = rsa.getKey();
    var ct = "";
    // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    // 1.获取字符串截取点
    var bytes = new Array();
    bytes.push(0);
    var byteNo = 0;
    var len = text.length;
    var c;
    var temp = 0;
    for (var i = 0; i < len; i++) {
        c = text.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) { // 特殊字符，如Ř，Ţ
            byteNo += 4;
        }
        else if (c >= 0x000800 && c <= 0x00FFFF) { // 中文以及标点符号
            byteNo += 3;
        }
        else if (c >= 0x000080 && c <= 0x0007FF) { // 特殊字符，如È，Ò
            byteNo += 2;
        }
        else { // 英文以及标点符号
            byteNo += 1;
        }
        if ((byteNo % 117) >= 114 || (byteNo % 117) === 0) {
            if (byteNo - temp >= 114) {
                bytes.push(i);
                temp = byteNo;
            }
        }
    }
    // 2.截取字符串并分段加密
    if (bytes.length > 1) {
        for (var i = 0; i < bytes.length - 1; i++) {
            var str = void 0;
            if (i === 0) {
                str = text.substring(0, bytes[i + 1] + 1);
            }
            else {
                str = text.substring(bytes[i] + 1, bytes[i + 1] + 1);
            }
            var t1 = key.encrypt(str);
            ct += t1;
        }
        if (bytes[bytes.length - 1] !== text.length - 1) {
            var lastStr = text.substring(bytes[bytes.length - 1] + 1);
            ct += key.encrypt(lastStr);
        }
        return (hex2b64(ct));
    }
    var t = key.encrypt(text);
    return hex2b64(t);
}
exports.encryptPublicLong = encryptPublicLong;
/**
 * rsa私钥解密长字符串
 * @param str
 * @param privateKey
 * @returns {any}
 */
function decryptPrivateLong(text, privateKey) {
    var rsa = new jsencrypt_1["default"]();
    rsa.setPrivateKey(privateKey);
    var key = rsa.getKey();
    text = b64tohex(text);
    var maxLength = ((key.n.bitLength() + 7) >> 3);
    try {
        if (text.length > maxLength) {
            var ct1_1 = "";
            var lt = text.match(/.{1,256}/g);
            if (lt) {
                lt.forEach(function (entry) {
                    var t1 = key.decrypt(entry);
                    ct1_1 += t1;
                });
            }
            return ct1_1;
        }
        var y = key.decrypt(text);
        return y;
    }
    catch (ex) {
        return false;
    }
}
exports.decryptPrivateLong = decryptPrivateLong;
