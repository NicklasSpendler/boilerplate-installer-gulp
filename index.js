// Todo: Make everything work with parameters so I can call all of this as a function.

const fs = require('fs');

var MODE_0666 = parseInt('0755', 8);

let { exec } = require("child_process");

let packageFolder = "./pkg"

// Example on how to call the function,
// Folder-to-copy, target-folder, Name-of-folder-to-copy
copyFolder(packageFolder, "src", "pkg")

function copyFolder(fromDir, toDir, firstFolderName) {

    let content = fs.readdirSync(fromDir)

    // Uses regex to substring the extended path only
    function getExtendedPath(path) {
        let tempRegex = new RegExp(`\/${firstFolderName}\/.*`)
        let extraPathReg = path.match(tempRegex);
        return extraPathReg[0].substring(5, extraPathReg[0].length)
    }


    initRepackFolder()
    function initRepackFolder() {
        if (fs.existsSync(`${__dirname}/${toDir}`)) {
            console.log(`${toDir} mappen findes`)
        } else {
            console.log('Repack mappen findes ikke, laver repack mappen')
            try {
                fs.mkdirSync(`${__dirname}/${toDir}`)
                console.log('Repack mappen er lavet:', `${__dirname}/${toDir}`)
            } catch (err) {
                console.log(`Kunne ikke lave ${toDir} mappen, wtf?`)
            }
        }
    }

    content.forEach(folder => {
        const folderPath = `${fromDir}/${folder}`
        copyFolder(folderPath, toDir, folder)
    });

    // Copies folders and check if theres more folders.

    // 
    function copyFolder(path, targetFolder, folderName) {
        // path = path file/folder its currently foreaching
        if (!fs.lstatSync(path).isDirectory()) {
            fs.copyFileSync(path, `./${targetFolder}/${folderName}`)
        } else {
            let tempDir = fs.readdirSync(path) //Shows content of a folder
            tempDir.forEach(file => {
                if (fs.lstatSync(path).isDirectory()) {
                    let extraPath = getExtendedPath(path)
                    if (fs.existsSync(`${targetFolder}/${extraPath}`)) {
                        // console.log('Findes allerede', )
                    } else {
                        // console.log('findes ikke', )
                        fs.mkdirSync(`${__dirname}/${targetFolder}/${extraPath}`)
                    }
                }
                if (fs.lstatSync(`${path}/${file}`).isDirectory()) {
                    if (fs.existsSync(`${__dirname}/${targetFolder}/${file}`)) {
                        copyFolder(`${path}/${file}`, targetFolder);
                    } else {
                        fs.mkdirSync(`${__dirname}/${targetFolder}/${file}`)
                        copyFolder(`${path}/${file}`, targetFolder);
                    }
                } else {
                    let extraPath = getExtendedPath(path)
                    try {
                        fs.copyFileSync(`${path}/${file}`, `${__dirname}/${targetFolder}/${extraPath}/${file}`)
                    } catch {
                        console.log('Er du sikker på at folderne findes? Err måske start copyFolder function')
                    }
                }
            });
        }
    }

}

exec("npm i -D @babel/core @babel/preset-env gulp gulp-babel gulp-clean-css gulp-concat gulp-connect gulp-imagemin gulp-pug gulp-rename gulp-sass gulp-sourcemaps gulp-uglify imagemin-jpeg-recompress", (err, stdout, stderr)=>{
    if(err){
        console.log('', err)
        process.exit(1);
    }

    stdout.normalize("data", ()=>{
        console.log('', dat.toString())
    })
})