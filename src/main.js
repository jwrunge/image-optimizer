let sharp = require('sharp')
let path = require('path')
let fs = require('fs')

// List all files in a directory in Node.js recursively in a synchronous fashion
function walkSync(dir, filelist, rootDir = dir) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir)
    filelist = filelist || []
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist, rootDir)
        }
        else {
            var shortdir = dir.replace(rootDir, '')
            filelist.push(shortdir + file)
        }
    })
    return filelist
}

//Destination is the folder containing the image source folder
//imageFolder is the name of the image folder inside the source folder
//breakpoints is an array of objects with dirnames and image widths as such:
/*
    [
        { dir: 'images-webp-400', size: 400 },
        { dir: 'images-webp-800', size: 800 },
        { dir: 'images-webp-1600', size: 1600 }
    ]

    creates folders <destination>/images-webp-400 through 1600 and stores images in webp of those sizes
*/
export function createOptimizationFolders(destination, imageFolder, breakpoints) {
    //Error check here! TODO

    if(!breakpoints) {
        breakpoints = [
            {dir: path.join(destination, 'images-webp-400'), size: 400},
            {dir: path.join(destination, 'images-webp-800'), size: 800},
            {dir: path.join(destination, 'images-webp-1600'), size: 1600},
            {dir: path.join(destination, 'images-webp-3200'), size: 3200}
        ]
    }

    //Source folder
    let sourceFolder = path.join(destination, imageFolder)

    let images = walkSync(sourceFolder)

    for(let i = 0; i < images.length; i++) {
        let fileName = path.parse(images[i]).name
        let imgExt = path.parse(images[i]).ext
        let fullName = path.basename(images[i])
        let shortPath = images[i].replace(fullName, "")
    
        if(imgExt != '.svg') {
            //Cycle through output folders
            for(let j = 0; j < directories.length; j++) {
                //Create the new directory if it does not exist
                if(!fs.existsSync(path.join(destination, directories[j].dir, shortPath)))
                    fs.mkdirSync(path.join(destination, directories[j].dir, shortPath), { recursive: true })
    
                sharp(path.join(sourceFolder, images[i]))
                    .resize({ width: directories[j].size, withoutEnlargement: true })
                    .toFile(path.join(destination, directories[j].dir, shortPath, fileName, ".webp"),
                    (err, info)=> {
                        if(err) console.log(err)
                    })
            }
        }
    }
}