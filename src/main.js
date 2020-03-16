let sharp = require('sharp')
let path = require('path')
let fs = require('fs')

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist, rootDir = dir) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist, rootDir);
        }
        else {
            var shortdir = dir.replace(rootDir, '')
            filelist.push(shortdir + file);
        }
    });
    return filelist;
};

let directories = [
    {dir: '/../images-webp-400/', size: 400},
    {dir: '/../images-webp-800/', size: 800},
    {dir: '/../images-webp-1600/', size: 1600},
    {dir: '/../images-webp-3200/', size: 3200}
]

let images = walkSync(__dirname + '/../images/')

for(let i = 0; i < images.length; i++) {
    let fileName = path.parse(images[i]).name
    let imgExt = path.parse(images[i]).ext
    let fullName = path.basename(images[i])
    let shortPath = images[i].replace(fullName, "")

    if(imgExt != '.svg') {
        //Cycle through output folders
        for(let j = 0; j < directories.length; j++) {
            //Create the new directory if it does not exist
            if(!fs.existsSync(__dirname + directories[j].dir + shortPath))
                fs.mkdirSync(__dirname + directories[j].dir + shortPath, { recursive: true })

            sharp(__dirname + '/../images/' + images[i])
                .resize({ width: directories[j].size, withoutEnlargement: true })
                .toFile(__dirname + directories[j].dir + shortPath + fileName + ".webp",
                (err, info)=> {
                    if(err) console.log(err)
                })
        }
    }
}