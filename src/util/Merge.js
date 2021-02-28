export default class Merge {
    static objects = (...a) => {
        let target = {};
        // Merge the object into the target object
        let merger = (obj) => {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (Object.prototype.toString.call(obj[prop]) === '[object Object]'){
                        // If we're doing a deep merge
                        // and the property is an object
                        target[prop] = Merge.objects(target[prop], obj[prop]);
                    } else {
                        // Otherwise, do a regular merge
                        target[prop] = obj[prop];
                    }
                }
            }
        };
        //Loop through each object and conduct a merge
        for (let i = 0; i < a.length; i++) {
            merger(a[i]);
        }
        return target;
    };
}