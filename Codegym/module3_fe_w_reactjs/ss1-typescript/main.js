var City;
(function (City) {
    City[City["HaNoi"] = 0] = "HaNoi";
    City[City["DaNang"] = 1] = "DaNang";
    City[City["HoChiMinh"] = 2] = "HoChiMinh";
})(City || (City = {}));
var city = City.HoChiMinh;
console.log(city);
