import express from 'express';

const getBase64 = function(object) {
    let buff = new  Buffer.from(typeof object == 'string' ? object : JSON.stringify(object));
    return buff.toString('base64');
}
const decodeBase64Value = function(base64data) {
    let buffe = new Buffer.from(base64data, 'base64');
    return buffe.toString('utf8');
}
/**
 * Valida el formato de la fecha.
 * Acepta fechas entre un rango de 1502 hasta 2999.
 * Los formatos permitidos son:
 * yyyy-MM-dd
 * 2020-08-27
 * 2020-08-27T08:51:51
 * 2020-08-27T08:55:59.123Z
 * @param {*} date - fecha evaluada en la expresion regular
 */
const isDate = function (date) {

    if (date) {
        return (/^(1[5-9](0?[2-9]|[1-9][0-9])|2[0-9][0-9][0-9])[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12][0-9]|3[01])(T(0?[0-9]|1[1-9]|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?)?Z?$/
            .test(date));
    }
    return true;
}

const getQueryStringObject = function(object){
    let value = '';
    if(typeof object == 'object' && object != null) {
        value = '?q=' + encodeURIComponent(JSON.stringify(object));
    }
    return value;
}

const Util = function(){
    this.getApp = function() {
        return express();
    }
    this.jsonToQueryStringDB = function (jsonObject) {
        return getQueryStringObject(jsonObject);
    }
    this.encode64 = function(value) {
        return getBase64(value);
    }
    this.decode64 = function(value) {
        return decodeBase64Value(value);
    }
    this.isDate = function (date) {
        return isDate(date);
    }
    this.getIpInfo = function(req) {
        let ip = req.get("ClientInfo");
        if(!ip) {
            ip = req.get("X-Forwarded-For");
            if(!ip) {
                ip = req.get("X-Real-Ip");
                if(!ip) {
                    ip = req.ip;
                }
            }
        } else {
            if(!(/^.{0,}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))) {
                ip = decodeBase64Value(ip);
            }
        }
        return ip;
    }
}
//cambios para que suba
export default Util;
