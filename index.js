// Todo: Make everything work with parameters so I can call all of this as a function.

const fs = require('fs');

let packageFolder = `${__dirname}/pkg`

let content = fs.readdirSync(packageFolder)

let targetPath = `${__dirname}`

// Uses regex to substring the extended path only
function getExtendedPath(path){
    let extraPathReg = path.match(/\/pkg\/.*/);
    return extraPathReg[0].substring(5,extraPathReg[0].length)
}


initRepackFolder()
function initRepackFolder(){
    if(fs.existsSync(`${__dirname}/repack`)){
        console.log('repack mappen findes', )
    }else{
        console.log('Repack mappen findes ikke, laver repack mappen', )
        try{
            fs.mkdirSync(`${__dirname}/repack`)
            console.log('Repack mappen er lavet:', `${__dirname}/repack`)
        } catch (err){
            console.log('Kunne ikke lave repack mappen, wtf?', )
        }
    }
}

content.forEach(folder => {
    const folderPath = `${__dirname}/pkg/${folder}`
    copyFolder(folderPath, "repack")
});

// Copies folders and check if theres more folders.
function copyFolder(path, targetFolder){
    // path = path to the dir its currenctly foreaching
    let tempDir = fs.readdirSync(path) //Shows content of a folder
    tempDir.forEach(file => {
        if(fs.lstatSync(path).isDirectory()){
            let extraPathReg = path.match(/\/pkg\/.*/);
            let extraPath = getExtendedPath(path)
            // console.log('dir', path)
            // console.log('', extraPath)
            // console.log(`${targetFolder}/${extraPath}`)
            if(fs.existsSync(`${targetFolder}/${extraPath}`)){
                // console.log('Findes allerede', )
            }else{
                // console.log('', `${__dirname}/${targetFolder}/${extraPath}`)
                // console.log('findes ikke', )
                fs.mkdirSync(`${__dirname}/${targetFolder}/${extraPath}`)
            }
        }
        if(fs.lstatSync(`${path}/${file}`).isDirectory()){
            let extraPathReg = path.match(/\/pkg\/.*/);
            let extraPath = getExtendedPath(path)
            // console.log('', path)
            // console.log('', extraPath)
            // console.log(`/${targetFolder}/${extraPath}/${file}`)
            // console.log('', `${__dirname}/${targetFolder}/${file}`)

            if(fs.existsSync(`${__dirname}/${targetFolder}/${file}`)){
                copyFolder(`${path}/${file}`, targetFolder);
            }else{
                fs.mkdirSync(`${__dirname}/${targetFolder}/${file}`)
                copyFolder(`${path}/${file}`, targetFolder);
            }
            
            
        }else{
            // console.log('', file)
            // console.log('', path)
            let extraPath = getExtendedPath(path)
            // console.log('', extraPath)
            // console.log('', `${__dirname}/${targetFolder}/${extraPath}/${file}`)
            // console.log('', `${path}/${file}`)
            
            try{
                fs.copyFileSync(`${path}/${file}`, `${__dirname}/${targetFolder}/${extraPath}/${file}`)
            } catch {
                console.log('Er du sikker på at folderne findes? Err måske start copyFolder function', )
            }
        }
    });
}