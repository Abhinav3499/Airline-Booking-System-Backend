// assume we have multiple repositories doing multiple things and when we want to use them in service 
// layer we have to import each one, instead of that we can have a single import by exporting all 
// using key value pair from index.js


module.exports = {
    CityRepository : require("./city-repository")
    // another repo : retuire('')
}
