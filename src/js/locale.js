// https://stackoverflow.com/questions/3304014/how-to-interpolate-variables-in-strings-in-javascript-without-concatenation
// function createStringFromTemplate(template, variables){
//     return template.replace(new RegExp("\{([^\{]+)\}", "g"), function(_unused, varName){
//         return variables[varName]
//     })
// }

// createStringFromTemplate(
//     "I would like to receive email updates from {list_name} {var1} {var2} {var3}.",
//     {
//         list_name : "this store",
//         var1      : "FOO",
//         var2      : "BAR",
//         var3      : "BAZ"
//     }
// )