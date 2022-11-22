function Stat(sfn='./static'){
    this.STATIC_FOLDER=sfn;
    this.isStatic = (ext, fn)=>{ let reg = new RegExp(`^\/.+\.${ext}$`); return reg.test(fn);}
    let pathStatic=(fn)=>{return `${this.STATIC_FOLDER}${fn}`;}
    this.writeHTTP404=(res)=>{
            res.statusCode = 404;
            res.statusMessage = 'Resourse not found';
            res.end('Resourse not found');
    }
    let fs=require('fs');
    var k=0;
    let pipeFile = (req, res, headers)=>{
        res.writeHead(200, headers);
        console.log(res.statusCode);
        console.log(k++);
        fs.createReadStream(pathStatic(req.url)).pipe(res);
    }
    this.sendFile = (req, res, headers)=>{
        if(fs.access(pathStatic(req.url), fs.constants.R_OK,err=>{
            if(err) 
            {
                this.writeHTTP404(res);
            }
            else pipeFile(req,res,headers);
        }))
        {this.writeHTTP404(res)};
        }
    }
    module.exports= (parm)=>{return new Stat(parm);}