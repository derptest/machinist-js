var ObjectUtils = function(){

    var _copyAllProperties = function(obj, dest) {
        if(obj && !dest) dest = {};

        for(var property in obj) {
            if(obj.hasOwnProperty(property)) {
                if(typeof obj[property] == "object"){
                    dest[property] = _copyAllProperties(obj[property], dest[property]);
                } else {
                    dest[property] = obj[property];
                }
            }
        }
        return dest;
    };


    return {
        copyAllProperties: _copyAllProperties
    };
}();

module.exports = ObjectUtils;