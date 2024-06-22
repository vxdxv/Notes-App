 async function homepage(req,res){
    const locals={
        title:"NodeJS Notes",
        description:"Full NodeJS Notes App"
    }
    res.render("index",{
        locals,layout:"../views/layouts/front-page.ejs"
    });
};
async function about(req,res){
    const locals={
        title:"About NodeJS Notes",
        description:"Full NodeJS Notes App"
    }
    res.render("about",locals);
};
export {homepage as homepage,about as about};
//export default about;