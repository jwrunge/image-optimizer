"use strict";let e=require("sharp"),i=require("path"),t=require("fs");let s=process.argv.slice(2);s&&function(s,n,o){o||(o=[{dir:i.join(s,"images-webp-400"),size:400},{dir:i.join(s,"images-webp-800"),size:800},{dir:i.join(s,"images-webp-1600"),size:1600},{dir:i.join(s,"images-webp-3200"),size:3200}]);let r=i.join(s,n),l=function e(s,n,o=s){let r=t.readdirSync(s);n=n||[];for(let l of r){let r=i.join(s,l);if(t.statSync(r).isDirectory())n=e(r,n,o);else{let e=s.replace(o,"");n.push(i.join(e,l))}}return n}(r);for(let s=0;s<l.length;s++){let n=i.parse(l[s]).name,p=i.parse(l[s]).ext,a=i.basename(l[s]),c=l[s].replace(a,"");if([".jpg",".jpeg",".png",".gif",".webp",".tiff"].includes(p.toLowerCase()))for(let p=0;p<o.length;p++){t.existsSync(i.join(o[p].dir,c))||t.mkdirSync(i.join(o[p].dir,c),{recursive:!0});let a=i.join(o[p].dir,c,n+".webp"),g=t.statSync(i.join(r,l[s])).mtime,d=t.statSync(a).mtime;!t.existsSync(a)||g>d?e(i.join(r,l[s])).rotate().resize({width:o[p].size,withoutEnlargement:!0}).webp().toFile(a,(e,i)=>{e&&console.log(l[s]+": "+e)}):console.log("Skipping existing file "+i.join(o[p].dir,c,n+".webp"))}else console.log("Could not process "+image[s]+": filetype not supported.")}}(s[0],s[1],s[2]);
//# sourceMappingURL=shrink.js.map