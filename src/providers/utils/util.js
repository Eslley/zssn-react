export default {
    maskNumber(v) {
        v = v.replace(/\D+/g, '');
        if(v.length > 3)
            return v.substring(0, 3);
        return v;
    }
}