var operationCookie = {
  setCookie: function (name, value, time) {
    document.cookie = name + "=" + value + ";max-age=" + time;
    return this;
  },
  removeCookie: function (name) {
    return this.setCookie(name, "", "-1");
  },
  getCookie: function (name) {
    var cookie = document.cookie.split(";");
    for (let i = 0; i < cookie.length; i++) {
      var itemCookie = cookie[i].split("=");
      if (itemCookie[0] === name) {
        // callback(itemCookie[1]);
        return itemCookie[1];
      }
    }
    return cookie[0];
  },
};
export default operationCookie;
